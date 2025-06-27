import fm from "front-matter";
import fs from 'fs';
import fsAsync from "fs/promises"
import path from 'path';
import { FrontMatter, frontMatterSchema } from "./frontmatterTypings";
import { getFileGitTimestamps } from "./getFileGitTimestamps";

export type WriteFileFn = typeof _writeFile; 
export type AppendIndexFileFn = typeof _appendIndexFile; 
export type CreateSubfolderFn = typeof _generateSubfolder; 

async function _writeFile(filePath: string, slug: string, output: unknown) {
  await fsAsync.writeFile(filePath, JSON.stringify({
    slug, 
    frontmatter: output
  }, null, 2));

  console.log(`📝${filePath}`)
}

async function _appendIndexFile(filePath: string, fileName: string) {
  await fsAsync.appendFile(filePath, `export {default as ${fileName}} from './${fileName}.json';\n`);
}

async function _generateSubfolder(subPath: string): Promise<string> {
  const basePath = path.join("src", "generated", "frontmatter", subPath);
  await fsAsync.mkdir(basePath, { recursive: true }); 
  return basePath; 
}

type FileJob = {
  filePath: string;
  subPath: string;
  fileName: string;
  relativePath: string;
};

async function processFile(
  job: FileJob,
  writeFrontmatterFile: WriteFileFn,
  generateSubfolder: CreateSubfolderFn
): Promise<void> {
  const fileContent = await fsAsync.readFile(job.filePath, 'utf-8');
  const { attributes } = fm(fileContent);
  
  const gitTimestamps = await getFileGitTimestamps(job.filePath);
  const frontmatterWithTimestamps = { ...attributes, ...gitTimestamps };
  
  const result = frontMatterSchema.safeParse(frontmatterWithTimestamps);
  
  if (!result.success) {
    console.error(`Error parsing front matter for ${job.relativePath}:`);
    console.error(result.error.format());
    throw new Error(`Invalid front matter in ${job.relativePath}`);
  }

  const validatedOutput = result.data as FrontMatter;
  const basePath = await generateSubfolder(job.subPath);
  const outputPath = path.join(basePath, `${job.fileName}.json`);
  
  await writeFrontmatterFile(outputPath, job.fileName, validatedOutput);
}

async function collectFileJobs(folderPath: string, subPath: string = ''): Promise<FileJob[]> {
  const items = await fsAsync.readdir(folderPath, { withFileTypes: true });
  const jobs: FileJob[] = [];

  for (const item of items) {
    const itemPath = path.join(folderPath, item.name);
    const currentSubPath = subPath ? path.join(subPath, item.name) : item.name;

    if (item.isDirectory()) {
      const subJobs = await collectFileJobs(itemPath, currentSubPath);
      jobs.push(...subJobs);
    } else if (item.isFile() && item.name.endsWith('.mdx')) {
      const fileName = path.parse(item.name).name;
      jobs.push({
        filePath: itemPath,
        subPath: path.dirname(currentSubPath),
        fileName,
        relativePath: currentSubPath
      });
    }
  }

  return jobs;
}

/**
 * Parallel version of extractFrontMatter with configurable concurrency
 */
export async function extractFrontMatterParallel(
  folderPath: string,
  writeFrontmatterFile: WriteFileFn = _writeFile,
  appendIndexFile: AppendIndexFileFn = _appendIndexFile,
  generateSubfolder: CreateSubfolderFn = _generateSubfolder,
  writeFileSync: typeof fs.writeFileSync = fs.writeFileSync,
  maxConcurrency = 10
) {
  // Clean up existing frontmatter directory
  const frontmatterDir = path.join("src", "generated", "frontmatter");
  await fsAsync.rm(frontmatterDir, { recursive: true, force: true });
  await fsAsync.mkdir(frontmatterDir, { recursive: true });

  // Collect all file jobs
  const jobs = await collectFileJobs(folderPath);
  
  // Group jobs by subdirectory for better organization
  const jobsBySubPath = new Map<string, FileJob[]>();
  for (const job of jobs) {
    const key = job.subPath;
    if (!jobsBySubPath.has(key)) {
      jobsBySubPath.set(key, []);
    }
    jobsBySubPath.get(key)!.push(job);
  }

  // Process files in parallel with concurrency limit
  const chunks: FileJob[][] = [];
  for (let i = 0; i < jobs.length; i += maxConcurrency) {
    chunks.push(jobs.slice(i, i + maxConcurrency));
  }

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(job => processFile(job, writeFrontmatterFile, generateSubfolder))
    );
  }

  // Generate index files for each subdirectory
  const indexPromises: Promise<void>[] = [];
  for (const [subPath, subJobs] of jobsBySubPath) {
    const indexPath = path.join("src", "generated", "frontmatter", subPath, "index.ts");
    
    // Clear the index file
    await fsAsync.writeFile(indexPath, '');
    
    // Add all exports
    for (const job of subJobs) {
      indexPromises.push(appendIndexFile(indexPath, job.fileName));
    }
  }
  
  await Promise.all(indexPromises);

  // Generate tags file
  const allTags = new Set<string>();
  for (const job of jobs) {
    try {
      const outputPath = path.join("src", "generated", "frontmatter", job.subPath, `${job.fileName}.json`);
      const content = await fsAsync.readFile(outputPath, 'utf-8');
      const data = JSON.parse(content);
      if (data.frontmatter?.tags) {
        data.frontmatter.tags.forEach((tag: string) => allTags.add(tag));
      }
    } catch (error) {
      // Skip files that couldn't be read
    }
  }

  const tagsPath = path.join("src", "generated", "frontmatter", "tags.json");
  writeFileSync(tagsPath, JSON.stringify(Array.from(allTags).sort(), null, 2));
  console.log('🏷️ Tags written to tags.json');
}

// Re-export the original function name for backward compatibility
export const extractFrontMatter = extractFrontMatterParallel;
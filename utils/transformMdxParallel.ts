import fs from "fs-extra";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { frontMatterSchema } from "./frontmatterTypings";
import rehypeSlug from "rehype-slug";

function extractFrontmatter(str: string) {
  const frontmatterRegex = /export const frontmatter = ({[\s\S]*?});/;
  const match = str.match(frontmatterRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export type WriteFileFn = (path: string, data: string) => Promise<void>;

const defaultWriteFileFn: WriteFileFn = async (path: string, data: string) => {
  fs.writeFile(path, data);
};

type ErrorMessage = {
  file: string;
  message: string;
};

type FileJob = {
  inputFilePath: string;
  outputFilePath: string;
  relativePath: string;
};

async function compileFile(job: FileJob, compile: any): Promise<ErrorMessage | null> {
  try {
    const fileData = await fs.readFile(job.inputFilePath, "utf-8");
    const compiledMdx = await compile(fileData, {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [[rehypeHighlight, { detect: true }], rehypeSlug],
    });

    const frontmatter = extractFrontmatter(String(compiledMdx));

    if (frontmatter) {
      const parsedFrontMatter = frontMatterSchema.safeParse(
        JSON.parse(frontmatter)
      );

      if (!parsedFrontMatter.success) {
        console.error(
          `🔶 Error parsing front matter for ${job.relativePath}:`,
          parsedFrontMatter.error.message
        );
        return {
          file: job.relativePath,
          message: `Error parsing front matter: ${parsedFrontMatter.error.message}`
        };
      }
    }

    await fs.writeFile(job.outputFilePath, String(compiledMdx));
    console.log(`✅ ${job.relativePath}`);
    return null;
  } catch (error) {
    console.error(`❌ Error compiling ${job.relativePath}:`, error);
    return {
      file: job.relativePath,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function collectFileJobs(
  inputPath: string,
  outputPath: string,
  relativePath: string = ""
): Promise<FileJob[]> {
  const entries = await fs.readdir(inputPath, { withFileTypes: true });
  const jobs: FileJob[] = [];

  for (const entry of entries) {
    const inputFilePath = path.join(inputPath, entry.name);
    const currentRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      const outputSubPath = path.join(outputPath, entry.name);
      const subJobs = await collectFileJobs(inputFilePath, outputSubPath, currentRelativePath);
      jobs.push(...subJobs);
    } else if (entry.name.endsWith(".mdx")) {
      const outputFilePath = path.join(
        outputPath,
        entry.name.replace(".mdx", ".mjs")
      );
      jobs.push({
        inputFilePath,
        outputFilePath,
        relativePath: currentRelativePath
      });
    }
  }

  return jobs;
}

export async function compileMDXFilesParallel(
  inputPath: string,
  outputPath: string,
  writeFileFn = defaultWriteFileFn,
  maxConcurrency = 10
): Promise<Array<ErrorMessage>> {
  const { compile } = await import("@mdx-js/mdx");
  
  // Ensure output directory exists
  await fs.ensureDir(outputPath);

  // Collect all file jobs first
  const jobs = await collectFileJobs(inputPath, outputPath);
  
  // Ensure all subdirectories exist
  const uniqueDirs = new Set(jobs.map(job => path.dirname(job.outputFilePath)));
  await Promise.all(Array.from(uniqueDirs).map(dir => fs.ensureDir(dir)));

  // Process files in parallel with concurrency limit
  const errors: Array<ErrorMessage> = [];
  const chunks: FileJob[][] = [];
  
  for (let i = 0; i < jobs.length; i += maxConcurrency) {
    chunks.push(jobs.slice(i, i + maxConcurrency));
  }

  for (const chunk of chunks) {
    const results = await Promise.allSettled(
      chunk.map(job => compileFile(job, compile))
    );
    
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        errors.push(result.value);
      } else if (result.status === 'rejected') {
        errors.push({
          file: 'unknown',
          message: result.reason instanceof Error ? result.reason.message : 'Unknown error'
        });
      }
    }
  }

  return errors;
}

// Re-export the original function name for backward compatibility
export const compileMDXFiles = compileMDXFilesParallel;
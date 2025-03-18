import fm from "front-matter";
import fs from 'fs';
import fsAsync from "fs/promises"
import path from 'path';
import { FrontMatter, frontMatterSchema } from "./frontmatterTypings";
import { getFileGitTimestamps } from "./getFileGitTimestamps";


export type WriteFileFn = typeof _writeFile; 
export type AppendIndexFileFn = typeof _appendIndexFile; 
export type CreateSubfolderFn = typeof _generateSubfolder; 

async function _writeFile(filePath:string, slug: string, output: unknown) {
  await fsAsync.writeFile(filePath, JSON.stringify({
    slug, 
    frontmatter: output
  }, null, 2));

  console.log(`📝${filePath}`)

}

async function _appendIndexFile(filePath:string, fileName: string) {
  await fsAsync.appendFile(filePath, `export {default as ${fileName}} from './${fileName}.json';\n`);
}

async function _generateSubfolder(subPath: string) : Promise<string> {
  const basePath = path.join("src", "generated", "frontmatter", subPath);
  await fsAsync.mkdir(basePath, { recursive: true }); 
  return basePath; 
}


/**
 * folderPath is the only mandatory argument, this is the base path of all the routes. 
 * 
 * The other arguments are there for the purpose of dependency injection - they allow us to write tests for this function, which out having to do any actual file writing. 
 *  
 * @param folderPath 
 * @param writeFrontmatterFile 
 * @param appendIndexFile 
 * @param generateSubfolder 
 */
export async function extractFrontMatter(
  folderPath: string,
  writeFrontmatterFile : WriteFileFn = _writeFile,
  appendIndexFile : AppendIndexFileFn = _appendIndexFile,
  generateSubfolder : CreateSubfolderFn = _generateSubfolder,
  writeFileSync: typeof fs.writeFileSync = fs.writeFileSync
) {

  const tagsMap = {} as Record<string, string[]>;

  const endToken = ".mdx";
  function getParts(inputString: string): [string, string] {
    const startIndex = inputString.indexOf(folderPath);
    const endIndex = inputString.indexOf(endToken);
    if (startIndex !== -1 && endIndex !== -1) {
      const extractedPart = inputString.substring(folderPath.length + 1,  endIndex);
      const segments = extractedPart.split('/');
      if (segments.length !== 2) {
        throw new Error("Expected an array of length 2")
      }

      return segments as [string, string];
    } else {
      throw new Error("String format is not as expected");
    }
  }

  async function processFile(inputString: string) {
    const file = await fsAsync.readFile(inputString);

    const timestamps = await getFileGitTimestamps(inputString);
    const fileText = file.toString();
    const [subPath, fileName] = getParts(inputString);

    const output = fm(fileText);


    const fmContent = output.attributes as FrontMatter; 


    // If a dateCreated exists, use it, otherwise use the one from git
    if(!fmContent.meta.dateCreated){
      fmContent.meta.dateCreated = timestamps.createdAt
    }

    try {
      frontMatterSchema.parse(fmContent);
    }
    catch (e) {
      throw new Error(`
      Error parsing file : '${inputString}'. 
      Failed Zod validation with: ${e instanceof Error && e.message}

      The object was: ${JSON.stringify(output.attributes)}
    `)
    }


    if(!fmContent.tags){
      fmContent.tags = ["untagged"];
    }

    fmContent.tags?.forEach((tag: string) => {
      if(!tagsMap[tag]){
        tagsMap[tag] = [] as Array<string>;
      }

      tagsMap[tag].push( `${subPath}/${fileName}`)
    });

    const basePath = await generateSubfolder(subPath);
    await writeFrontmatterFile(path.join(basePath, fileName + ".json"), `${subPath}/${fileName}`, fmContent);
    await appendIndexFile(path.join(basePath, 'index.js'), fileName);
}



  async function findMdxFiles(folderPath: string) {
    const promises = [] as Array<Promise<unknown>>;
    function traverseDir(currentPath: string) {
      const files = fs.readdirSync(currentPath);

      files.forEach((file) => {
        const filePath = path.join(currentPath, file);
        const fileStats = fs.statSync(filePath);
        if (fileStats.isDirectory()) {
          traverseDir(filePath);
        } else if (file.endsWith('.mdx')) {
          promises.push(processFile(filePath));
        }
      });
    }

    traverseDir(folderPath);
    await Promise.all(promises);
  }

  await findMdxFiles(folderPath)

  writeFileSync(path.join("src", "generated", "tags.json"), JSON.stringify(tagsMap, null, 2));
  console.log("🏷️ Tags written to tags.json")
}


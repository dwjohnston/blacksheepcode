import fm from "front-matter";

import fs from 'fs';
import fsAsync from "fs/promises"
import path from 'path';
import { frontMatterSchema } from "./frontmatterTypings";

async function _writeFile(filePath:string, slug: string, output: unknown) {
  await fsAsync.writeFile(filePath, JSON.stringify({
    slug, 
    frontmatter: output
  }, null, 2));
}

export type WriteFileFn = typeof _writeFile; 
export type AppendIndexFileFn = typeof _appendIndexFile; 
export type CreateSubfolderFn = typeof _generateSubfolder; 

async function _appendIndexFile(filePath:string, fileName: string) {
  await fsAsync.appendFile(filePath, `export {default as ${fileName}} from './${fileName}.json';\n`);
}

async function _generateSubfolder(subPath: string) : Promise<string> {
  const basePath = path.join(process.cwd(), "app", "generated", "frontmatter", subPath);
  await fsAsync.mkdir(basePath, { recursive: true }); 
  return basePath; 
}

export async function extractFrontMatter(folderPath: string, writeFile : WriteFileFn = _writeFile, appendIndexFile : AppendIndexFileFn = _appendIndexFile, generateSubfolder : CreateSubfolderFn = _generateSubfolder) {

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
    const fileText = file.toString();
    const [subPath, fileName] = getParts(inputString);

    const output = fm(fileText);

    const basePath = await generateSubfolder(subPath);

    try {
      frontMatterSchema.parse(output.attributes);
    }
    catch (e) {
      throw new Error(`
      Error parsing file : '${inputString}'. 
      Failed Zod validation with: ${e instanceof Error && e.message}

      The object was: ${JSON.stringify(output.attributes)}
    `)
    }

    await writeFile(path.join(basePath, fileName + ".json"), `${subPath}/${fileName}`, output.attributes);
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
          // If it's an .mdx file, log it
          promises.push(processFile(filePath));
        }
      });


    }

    traverseDir(folderPath);

    await Promise.all(promises);
  }


  await findMdxFiles(folderPath)
}


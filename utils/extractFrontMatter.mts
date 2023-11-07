import { compile } from '@mdx-js/mdx'
import fm from "front-matter";

import fs from 'fs';
import fsAsync from "fs/promises"
import path from 'path';

export const a = "a"
const startToken = "/app/routes/";
const endToken = ".mdx";
function getParts(inputString: string) : [string, string] {


const startIndex = inputString.indexOf(startToken);
const endIndex = inputString.indexOf(endToken);

if (startIndex !== -1 && endIndex !== -1) {
  const extractedPart = inputString.substring(startIndex + startToken.length, endIndex);
  const segments = extractedPart.split('/'); // Split by '/'
  if (segments.length !==2){
    throw new Error("Expected an array of length 2")
  }

  return segments as [string, string]; 
} else {
  throw new Error("String format is not as expected");
}
}

async function processFile(inputString: string) {
    const file = await fsAsync.readFile(inputString); 
    const fileText =  file.toString();
     const [subPath, fileName] = getParts(inputString); 

    const output = fm(fileText);

    console.log(output);

  const basePath = path.join(process.cwd(), "app", "generated", "frontmatter", subPath); 
  await fsAsync.mkdir(basePath, {recursive: true})
  //@ts-ignore
  await fsAsync.writeFile(path.join(basePath, fileName + ".json"), JSON.stringify(output.attributes, null, 2)); 
}

async function findMdxFiles(folderPath: string) {

    const promises = [] as Array<Promise<unknown>>;
  function traverseDir(currentPath: string) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStats = fs.statSync(filePath);

      if (fileStats.isDirectory()) {
        // If it's a directory, recursively traverse it
        traverseDir(filePath);
      } else if (file.endsWith('.mdx')) {
        // If it's an .mdx file, log it
        console.log(filePath);
        promises.push(processFile(filePath));

      }
    });
  }

  traverseDir(folderPath);
}

const folderPath = path.join(process.cwd(), 'app', 'routes'); // Update the path accordingly
findMdxFiles(folderPath);




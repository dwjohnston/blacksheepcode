import fm from "front-matter";
import { FrontMatter, frontMatterSchema } from "./frontmatterTypings";
import { getFileGitTimestamps } from "./getFileGitTimestamps";


export type WriteFileFn = typeof _writeFile; 
export type AppendIndexFileFn = typeof _appendIndexFile; 
export type CreateSubfolderFn = typeof _generateSubfolder; 
export type WriteFileSyncFn = (filePath: string, data: string) => unknown;

async function _writeFile(filePath:string, slug: string, output: unknown) {
  await Bun.write(filePath, JSON.stringify({
    slug, 
    frontmatter: output
  }, null, 2));

  console.log(`📝${filePath}`)

}

// Bun has no append API, so appends to the same file are serialized to avoid lost writes.
const pendingAppends = new Map<string, Promise<unknown>>();

async function _appendIndexFile(filePath:string, fileName: string) {
  const line = `export {default as ${fileName}} from './${fileName}.json';\n`;
  const append = (pendingAppends.get(filePath) ?? Promise.resolve()).then(async () => {
    const file = Bun.file(filePath);
    const existing = await file.exists() ? await file.text() : "";
    await Bun.write(filePath, existing + line);
  });
  pendingAppends.set(filePath, append);
  await append;
}

// Bun.write creates missing parent directories, so no mkdir is needed.
async function _generateSubfolder(subPath: string) : Promise<string> {
  return `src/generated/frontmatter/${subPath}`;
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
  writeTagsFile: WriteFileSyncFn = Bun.write
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
    const fileText = await Bun.file(inputString).text();

    const timestamps = await getFileGitTimestamps(inputString);
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
    await writeFrontmatterFile(`${basePath}/${fileName}.json`, `${subPath}/${fileName}`, fmContent);
    await appendIndexFile(`${basePath}/index.js`, fileName);
}



  async function findMdxFiles(folderPath: string) {
    const promises = [] as Array<Promise<unknown>>;
    for await (const relativePath of new Bun.Glob("**/*.mdx").scan({ cwd: folderPath })) {
      promises.push(processFile(`${folderPath}/${relativePath}`));
    }
    await Promise.all(promises);
  }

  await findMdxFiles(folderPath)

  await writeTagsFile("src/generated/tags.json", JSON.stringify(tagsMap, null, 2));
  console.log("🏷️ Tags written to tags.json")
}


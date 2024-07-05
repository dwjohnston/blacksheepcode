import fs from "fs-extra";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { frontMatterSchema } from "./frontmatterTypings";
import { matter } from "vfile-matter"



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
    return fs.writeFile(path, data);
}

export async function compileMDXFiles(inputPath: string, outputPath: string, writeFileFn = defaultWriteFileFn) {

    console.log(writeFileFn)
    const { compile } = await import("@mdx-js/mdx");
    const entries = await fs.readdir(inputPath, { withFileTypes: true });

    await fs.ensureDir(outputPath);

    let hasErrors = false;

    for (const entry of entries) {
        const inputFilePath = path.join(inputPath, entry.name);
        const outputFilePath = path.join(outputPath, entry.name.replace('.mdx', '.mjs'));

        if (entry.isDirectory()) {
            await compileMDXFiles(inputFilePath, path.join(outputPath, entry.name), writeFileFn);
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
            const mdxContent = await fs.readFile(inputFilePath, 'utf-8');

            const compiledJS = await compile(mdxContent, {
                remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
                rehypePlugins: [rehypeHighlight]
            });

            await writeFileFn(outputFilePath, String(compiledJS));
            console.log(`Compiled: ${inputFilePath} -> ${outputFilePath}`);
            const frontMatterString = extractFrontmatter(String(compiledJS));

            try {
                frontMatterSchema.parse(JSON.parse(frontMatterString ?? 'null'));
                console.log(`${outputFilePath} passes Zod validation`)
            } catch (err) {

                hasErrors = true;
                console.error(`
                Error parsing file : '${inputFilePath}'. 
                Failed Zod validation with: ${err instanceof Error && err.message}
          
                The object was: ${frontMatterString}
              `)
            }



        }
    }

    if (hasErrors) {
        throw new Error("A Zod validation error was encountered - scan the logs above to find it ")
    }
}



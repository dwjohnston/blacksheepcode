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
}

export async function compileMDXFiles(inputPath: string, outputPath: string, writeFileFn = defaultWriteFileFn) : Promise<boolean> {
    const { compile } = await import("@mdx-js/mdx");
    const entries = await fs.readdir(inputPath, { withFileTypes: true });

    await fs.ensureDir(outputPath);

    let hasErrors = false;

    for (const entry of entries) {
        const inputFilePath = path.join(inputPath, entry.name);
        const outputFilePath = path.join(outputPath, entry.name.replace('.mdx', '.mjs'));

        if (entry.isDirectory()) {
            const result = await compileMDXFiles(inputFilePath, path.join(outputPath, entry.name), writeFileFn);
            hasErrors = hasErrors ?? result;
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {

        
            const mdxContent = await fs.readFile(inputFilePath, 'utf-8');

            const compiledJS = await compile(mdxContent, {
                remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
                rehypePlugins: [[rehypeHighlight, {detect: true}], rehypeSlug]
            });

            await writeFileFn(outputFilePath, String(compiledJS));
            const frontMatterString = extractFrontmatter(String(compiledJS));

            try {
                frontMatterSchema.parse(JSON.parse(frontMatterString ?? 'null'));
                console.log(`✅ ${outputFilePath}`)
            } catch (err) {

                hasErrors = true;
                console.log(`${outputFilePath} ❌`)

                console.error(`
                Error parsing file : '${inputFilePath}'. 
                Failed Zod validation with: ${err instanceof Error && err.message}
          
                The object was: ${frontMatterString}
              `)
            }



        }
    }


    return hasErrors;

}



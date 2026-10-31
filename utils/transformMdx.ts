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
  await Bun.write(path, data);
};

type ErrorMessage = {
  file: string;
  message: string;
};

export async function compileMDXFiles(
  inputPath: string,
  outputPath: string,
  writeFileFn = defaultWriteFileFn
): Promise<Array<ErrorMessage>> {
  const { compile } = await import("@mdx-js/mdx");
  const errors: Array<ErrorMessage> = [];

  const relativePaths = await Array.fromAsync(
    new Bun.Glob("**/*.mdx").scan({ cwd: inputPath })
  );

  for (const relativePath of relativePaths.sort()) {
    const inputFilePath = `${inputPath}/${relativePath}`;
    const outputFilePath = `${outputPath}/${relativePath.replace(/\.mdx$/, ".mjs")}`;

    const mdxContent = await Bun.file(inputFilePath).text();

    const compiledJS = await compile(mdxContent, {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [[rehypeHighlight, { detect: true }], rehypeSlug],
    });

    await writeFileFn(outputFilePath, String(compiledJS));
    const frontMatterString = extractFrontmatter(String(compiledJS));

    try {
      frontMatterSchema.parse(JSON.parse(frontMatterString ?? "null"));
      console.log(`✅ ${outputFilePath}`);
    } catch (err) {
      const message = `
              Error parsing file : '${inputFilePath}'. 
              Failed Zod validation with: ${
                err instanceof Error && err.message
              }
        
              The object was: ${frontMatterString}
            `;

      errors.push({
        file: outputFilePath,
        message,
      });
      console.log(`❌ ${outputFilePath}`);
      console.error(message);
    }
  }

  return errors;
}

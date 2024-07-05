import path from "path";
import { compileMDXFiles } from "./transformMdx";
const inputDir = path.join('src', 'routes');
const outputDir = path.join('src', 'generated', 'mdx');

compileMDXFiles(inputDir, outputDir)
    .then(() => console.log('All MDX files compiled successfully!'))
    .catch(error => console.error('Error compiling MDX files:', error));
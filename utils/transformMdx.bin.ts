import path from "path";
import { compileMDXFiles } from "./transformMdx";
const inputDir = path.join('src', 'routes');
const outputDir = path.join('src', 'generated', 'mdx');

compileMDXFiles(inputDir, outputDir)
    .then((v) => {
        if(!v){
            console.log(`
All MDX files compiled successfully!

`)
        }
        else {
            console.error("Compiling MDX enountered errors. Scan logs above for details.")
            process.exit(1); 
        }
    })
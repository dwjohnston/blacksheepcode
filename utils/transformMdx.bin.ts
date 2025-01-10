import path from "path";
import { compileMDXFiles } from "./transformMdx";
const inputDir = path.join('src', 'routes');
const outputDir = path.join('src', 'generated', 'mdx');

compileMDXFiles(inputDir, outputDir)
    .then((v) => {
        if(v.length ===0){
            console.log(`
All MDX files compiled successfully!

`)
        }
        else {
            console.error("Compiling MDX enountered errors. Scan logs above for details.")
            v.forEach((w)=> {
                console.error(`❌ ${w.file}`);
            })
            process.exit(1); 
        }
    })
import path from "path";
import { compileMDXFiles } from "./transformMdxParallel";
const inputDir = path.join('src', 'routes');
const outputDir = path.join('src', 'generated', 'mdx');

console.log('🚀 Starting parallel MDX compilation...');
const startTime = Date.now();

compileMDXFiles(inputDir, outputDir)
    .then((v) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        if(v.length === 0){
            console.log(`
✅ All MDX files compiled successfully in ${duration}ms!

`)
        }
        else {
            console.error("Compiling MDX encountered errors. Scan logs above for details.")
            v.forEach((w)=> {
                console.error(`❌ ${w.file}`);
            })
            process.exit(1); 
        }
    })
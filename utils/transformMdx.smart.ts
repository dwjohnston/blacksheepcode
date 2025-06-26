import path from "path";
import { compileMDXFiles } from "./transformMdxParallel";
import { smartGenerate } from "./incrementalBuild";

const inputDir = path.join('src', 'routes');
const outputDir = path.join('src', 'generated', 'mdx');

async function generateMdx() {
  console.log('🚀 Starting parallel MDX compilation...');
  const startTime = Date.now();

  const errors = await compileMDXFiles(inputDir, outputDir);
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  if(errors.length === 0){
    console.log(`✅ All MDX files compiled successfully in ${duration}ms!`);
  } else {
    console.error("Compiling MDX encountered errors. Scan logs above for details.");
    errors.forEach((w) => {
      console.error(`❌ ${w.file}`);
    });
    process.exit(1); 
  }
}

// Use smart generation
smartGenerate(
  inputDir, 
  outputDir, 
  generateMdx,
  'MDX compilation'
).catch(error => {
  console.error('Error in MDX generation:', error);
  process.exit(1);
});
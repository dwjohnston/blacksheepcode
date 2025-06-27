import path from 'path';
import { extractFrontMatter } from './extractFrontMatterParallel';
import { smartGenerate } from './incrementalBuild';

const folderPath = path.join(process.cwd(), 'src', 'routes');
const outputPath = path.join(process.cwd(), 'src', 'generated', 'frontmatter');

async function generateFrontmatter() {
  console.info("🚀 Begin parallel frontmatter extraction...");
  const startTime = Date.now();

  await extractFrontMatter(folderPath);
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.info(`✅ Front matter extraction complete in ${duration}ms!`);
}

// Use smart generation
smartGenerate(
  folderPath, 
  outputPath, 
  generateFrontmatter,
  'frontmatter extraction'
).catch(error => {
  console.error('Error in frontmatter generation:', error);
  process.exit(1);
});
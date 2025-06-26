import path from 'path';
import { extractFrontMatter } from './extractFrontMatterParallel';

const folderPath = path.join(process.cwd(), 'src', 'routes'); // Update the path accordingly
console.info("🚀 Begin parallel frontmatter extraction...")
const startTime = Date.now();

extractFrontMatter(folderPath).then(() => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.info(`✅ Front matter extraction complete in ${duration}ms!`)
}).catch(err => {
    console.error("Error extracting frontmatter:")
    throw err;
});

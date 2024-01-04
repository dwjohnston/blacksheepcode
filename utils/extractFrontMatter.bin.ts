import path from 'path';
import { extractFrontMatter } from './extractFrontMatter';


const folderPath = path.join(process.cwd(), 'app', 'routes'); // Update the path accordingly
console.info("Being extracting frontmatter...")
extractFrontMatter(folderPath).then(() => {
    console.info("Front matter extraction complete!")
}).catch(err => {
    console.error("Error extracting frontmatter:")
    throw err;
});




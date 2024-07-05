import path from 'path';
import { extractFrontMatter } from './extractFrontMatter';


const folderPath = path.join(process.cwd(), 'src', 'routes'); // Update the path accordingly
console.info("Begin extracting frontmatter...")
extractFrontMatter(folderPath).then(() => {
    console.info("Front matter extraction complete!")
}).catch(err => {
    console.error("Error extracting frontmatter:")
    throw err;
});




import fs from "fs";
import path from "path";

export function generateSitemaps(rootPath: string, xmlPath: string, rootUrl ="https://blacksheepcode.com" ){

    const files= fs.readdirSync(rootPath); 

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    files.forEach((file) => {
        const filePath = path.join(rootPath, file);

  
        if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.json' && path.basename(filePath) !== 'index' ) {
            const buffer = fs.readFileSync(filePath, 'utf8'); 
            const json = JSON.parse(buffer);
            xml += `  <url>\n`;
            xml += `    <loc>${rootUrl}/${json.slug}</loc>\n`;
            xml += `    <lastmod>${new Date(json.frontmatter.meta.dateCreated).toISOString()}</lastmod>\n`;
            xml += `  </url>\n`;
        
        }
    })

    xml += `</urlset>`;


    fs.writeFileSync(xmlPath, xml);
}

generateSitemaps("app/generated/frontmatter/posts", "app/generated/sitemap/sitemap.xml");
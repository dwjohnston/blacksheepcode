import fs from "fs";
import path from "path";

export function generateRss(rootPath: string, xmlPath: string, rootUrl ="https://blacksheepcode.com" ){

    const files= fs.readdirSync(rootPath); 

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss version="2.0">\n`;
    xml+= '<channel>'
    xml+=`<title>Black Sheep Code</title>`
    xml+=`<description>Modern web development - testability, extensibility, declarative APIs, declarative code from open specs and more.</description>`
    xml+=`<language>en-AU</language>`
    xml+=`<link>https://blacksheepcode.com</link>`
    files.forEach((file) => {
        const filePath = path.join(rootPath, file);
          if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.json' && path.basename(filePath) !== 'index' ) {
            const buffer = fs.readFileSync(filePath, 'utf8'); 
            const json = JSON.parse(buffer);
            xml += `  <item>\n`;
            xml += `    <title>${rootUrl}/${json.frontmatter.meta.title}</title>\n`;
            xml += `    <description>${rootUrl}/${json.frontmatter.meta.description}</description>\n`;
            xml += `    <link>${rootUrl}/${json.slug}</link>\n`;
            xml += `    <guid>${rootUrl}/${json.slug}</guid>\n`;
            xml += `    <pubDate>${new Date(json.frontmatter.meta.dateCreated).toUTCString()}</pubDate>\n`;
            xml += `  </item>\n`;        
        }
    })
    xml+= '</channel>'
    xml += `</rss>`;
    fs.writeFileSync(xmlPath, xml);
}

generateRss("app/generated/frontmatter/posts", "app/generated/sitemap/rss.xml");
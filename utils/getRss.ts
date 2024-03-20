import * as allMetadata from "../app/generated/frontmatter/posts/index";
export function getRss(rootUrl ="https://blacksheepcode.com") {

const metadataArray = Object.values(allMetadata);
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss version="2.0">\n`;
    xml+= '<channel>'
    xml+=`<title>Black Sheep Code</title>`
    xml+=`<description>Modern web development - testability, extensibility, declarative APIs, declarative code from open specs and more.</description>`
    xml+=`<language>en-AU</language>`
    xml+=`<link>https://blacksheepcode.com</link>`
    xml+=`<image>
    <url>https://blacksheepcode.com/blacksheep_fb_wide.webp</url>
  </image>
    `
    metadataArray.forEach((json) => {

            xml += `  <item>\n`;
            xml += `    <title>${json.frontmatter.meta.title}</title>\n`;
            xml += `    <description>${json.frontmatter.meta.description}</description>\n`;
            xml += `    <link>${rootUrl}/${json.slug}</link>\n`;
            xml += `    <guid>${rootUrl}/${json.slug}</guid>\n`;
            xml += `    <pubDate>${new Date(json.frontmatter.meta.dateCreated).toUTCString()}</pubDate>\n`;
            xml += `  </item>\n`;        
    })
    xml+= '</channel>'
    xml += `</rss>`;

    return xml;
}

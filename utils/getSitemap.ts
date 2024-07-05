import * as allMetadata from "../src/generated/frontmatter/posts/index"; 

export function getSitemaps(rootUrl = "https://blacksheepcode.com") : string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const metadataArray = Object.values(allMetadata);
    metadataArray.forEach((json : any) => {
            xml += `  <url>\n`;
            xml += `    <loc>${rootUrl}/${json.slug}</loc>\n`;
            xml += `    <lastmod>${new Date(json.frontmatter.meta.dateCreated).toISOString()}</lastmod>\n`;
            xml += `  </url>\n`     
    
    })
    xml += `</urlset>`;
    return xml;
}


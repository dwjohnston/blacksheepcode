export function loader() {
    return new Response(`Sitemap: https://blacksheepcode.com/sitemap.xml`, {
        headers: {
            "Content-Type": "text/plain"
        }
    }); 
}
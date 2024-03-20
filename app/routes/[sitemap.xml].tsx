
import { LoaderArgs } from "@remix-run/node";
import fsAsync from "fs/promises";

export async function loader({request} : LoaderArgs) {
    const sitemap = await fsAsync.readFile(`app/generated/sitemap/sitemap.xml`); 
    

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml", 
            "Cache-Control": `public, max-age=${60*60}`
        }
    })
}
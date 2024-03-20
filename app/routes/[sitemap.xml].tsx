
import { LoaderArgs } from "@remix-run/node";
import fsAsync from "fs/promises";
import { getSitemaps } from "utils/generateSitemaps";

export async function loader({request} : LoaderArgs) {
    const sitemap = getSitemaps();
    

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml", 
            "Cache-Control": `public, max-age=${60*60}`
        }
    })
}
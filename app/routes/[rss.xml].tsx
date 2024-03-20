
import { LoaderArgs } from "@remix-run/node";
import fsAsync from "fs/promises";
import { getRss } from "utils/generateRss";

export async function loader({request} : LoaderArgs)  {
    const sitemap = getRss();
        return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml", 
            "Cache-Control": `public, max-age=${60*60}`
        }
    })
}
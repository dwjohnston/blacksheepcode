import fs from "fs"; 
import { getSitemaps } from "./getSitemap";
const xml = getSitemaps()


fs.writeFileSync("public/sitemap.xml", xml);


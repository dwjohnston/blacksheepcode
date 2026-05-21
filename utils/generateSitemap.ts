import fs from "node:fs";
import { getSitemaps } from "./getSitemap";
const xml = getSitemaps();

fs.writeFileSync("public/sitemap.xml", xml);

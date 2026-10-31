import { getSitemaps } from "./getSitemap";
const xml = getSitemaps()


await Bun.write("public/sitemap.xml", xml);

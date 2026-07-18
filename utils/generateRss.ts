import fs from "node:fs";
import { getRss } from "./getRss";
const xml = getRss();

fs.writeFileSync("public/rss.xml", xml);

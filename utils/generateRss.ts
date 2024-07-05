import {getRss} from "./getRss"; 
import fs from "fs"; 
const xml = getRss()


fs.writeFileSync("public/rss.xml", xml);


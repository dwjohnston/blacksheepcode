import {getRss} from "./getRss"; 
const xml = getRss()


await Bun.write("public/rss.xml", xml);

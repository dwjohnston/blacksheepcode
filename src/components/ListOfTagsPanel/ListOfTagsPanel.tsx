import Link from "next/link";
import tags from "../../generated/tags.json";


console.log(Object.entries(tags))
// Sort by the number of posts in each tag
const uniqueTags = Object.entries(tags).toSorted((a,b) => {


    // This is a bit hacky, but basically because all the test/draft posts are untagged, they increase the count.
    if(a[0] === "untagged"){
        return 1;
    }
    if(b[0] === "untagged"){    
        return -1;
    }
    return b[1].length - a[1].length;
}).map((v) => {
    return v[0];
});

const tagToLabelMap = {
    "react": "React",
    "nextjs": "Next.js",
    "testing": "Testing",
    "typescript": "TypeScript",
    "javascript_nitty_gritty": "JavaScript",
    "developer_experience": "Developer Experience",
    "openapi": "OpenAPI",
    "software_engineering": "Software Engineering",
    "infrastructure": "Infrastructure",
    "untagged": "Untagged"
} as Record<string, string | undefined>;

export function ListOfTagsPanel(){
    return <nav className="tags-panel">
        <p>Jump right in!</p>
        <p>Explore the following topics:</p>
        <ul>
            {uniqueTags.map((tag) => {
                return <li key={tag}><Link href ={`/posts?tag=${tag}`}>{tagToLabelMap[tag] ?? tag}</Link></li>
            })}
        </ul>
    </nav>
}
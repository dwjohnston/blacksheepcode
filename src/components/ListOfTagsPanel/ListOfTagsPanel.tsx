import Link from "next/link";
import tags from "../../generated/tags.json";

// Sort by the number of posts in each tag
const uniqueTags = Object.entries(tags).toSorted((v) => {
    return v[1].length;
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
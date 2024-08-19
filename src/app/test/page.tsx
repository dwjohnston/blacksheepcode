import { getAllPostFrontmatter, mergeFrontmatterAndDefaultMetadata } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";
import { notFound } from "next/navigation";
import {GithubPermalinkRsc} from "react-github-permalink/dist/rsc";

async function getAllArticles() {
    return getAllPostFrontmatter("test")
}

export default async function PageLayout() {
    if(process.env.SHOW_TEST_PAGES !== "true") {
        notFound();
    }
    const articles = await getAllArticles();
    return <div>

        Test Posts
<GithubPermalinkRsc className="clear-right" permalink="https://github.com/dwjohnston/my-private-repo/blob/main/file.md?plain=1#L1-L3"/>

        <ListOfArticles allFrontmatter={articles} />
    </div>
}
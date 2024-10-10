import { getAllPostFrontmatter } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";
import { notFound } from "next/navigation";

async function getAllArticles() {
    return getAllPostFrontmatter("drafts")
}

export default async function PageLayout() {

    if(process.env.SHOW_DRAFT_PAGES !== "true") {
        notFound();
    }

    const articles = await getAllArticles();
    return <div>

        <ListOfArticles allFrontmatter={articles} />
    </div>
}
import { getAllPostFrontmatter, mergeFrontmatterAndDefaultMetadata } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";
import { notFound } from "next/navigation";

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

        <ListOfArticles allFrontmatter={articles} />
    </div>
}
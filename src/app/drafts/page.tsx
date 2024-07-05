import { getAllPostFrontmatter } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";
import { notFound } from "next/navigation";

export const metadata = {
    title: "hello"
}

async function getAllArticles() {
    return getAllPostFrontmatter("drafts")
}





export default async function PageLayout() {

    if(process.env.NODE_ENV === "production") {
        notFound();
    }

    const articles = await getAllArticles();
    return <div>

        <ListOfArticles allFrontmatter={articles} />
    </div>
}
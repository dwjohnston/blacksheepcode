import { getAllPostFrontmatter, mergeFrontmatterAndDefaultMetadata } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";


async function getAllArticles() {
    return getAllPostFrontmatter()
}


export default async function PageLayout() {

    const articles = await getAllArticles();
    return <div>
        <ListOfArticles allFrontmatter={articles} />
    </div>
}
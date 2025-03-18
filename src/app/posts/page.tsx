import { getAllPostFrontmatter } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";


type Options = {
    tagFilter?: string; 
}
async function getAllArticles(options?: Options) : Promise<{
    options?: Options,
    didFindArticles: boolean;
    articles: Array<{slug: string, frontmatter: any}>}> {


    const result = await getAllPostFrontmatter(); 

    if(!options || !options.tagFilter) {
        return {
            articles: result, 
            didFindArticles: true,
            options: options
        };
    }

    const filteredResults = result.filter((v) => {
        return v.frontmatter.tags?.includes(options.tagFilter as string);
    });

    return {
        options: options, 
        didFindArticles: filteredResults.length > 0,
        articles: filteredResults.length > 0 ? filteredResults : result
    }
}


export default async function PageLayout({
    searchParams
} : {
    searchParams: Promise<Partial<{ tag: string }>>
}) {

    const params = await searchParams;
    const articlesResult = await getAllArticles({
        tagFilter: params?.tag
    });
    return <div>
        <ListOfArticles allFrontmatter={articlesResult.articles} filterInformation={{
            didFindArticles: articlesResult.didFindArticles,
            tagFilter: params.tag ?? null
        }} />
    </div>
}
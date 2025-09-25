import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getMetadata, getAllPostFrontmatter, getBlogContent } from "@/utils/blogPosts";
import { PropsWithChildren } from "react";

export async function generateStaticParams() {

    const allFrontMatter = await getAllPostFrontmatter();
    return allFrontMatter.map((v) => {

        return { slug: v.slug.replace("posts/", "") }
    })
}

export async function generateMetadata(props: {
    params: Promise<{
        slug: string
    }>
}) {
    const params = await props.params;
    return getMetadata(`/posts/${params.slug}`);
}

export default async function PageLayout(props: PropsWithChildren<{
    params: Promise<{
        slug: string
    }>
}>) {

    const params = await props.params;
    const content = await getBlogContent( params.slug,"posts");
    return <BlogPostFrame pathname={`/posts/${params.slug}`}>
        {content}
    </BlogPostFrame>

}
import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getAllPostFrontmatter, getBlogContent, getMetadata } from "@/utils/blogPosts";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export async function generateStaticParams() {

    const allFrontMatter = await getAllPostFrontmatter("drafts");
    return allFrontMatter.map((v) => {

        return { slug: v.slug.replace("drafts/", "") }
    })
}

export async function generateMetadata(props: { params: Promise<{
    slug: string
}> }) {

    const params = await props.params;
    return getMetadata(`/drafts/${params.slug}`);
}

export default async function PageLayout(props: PropsWithChildren<{
    params: Promise<{
        slug: string
    }>
}>) {
    if(process.env.SHOW_DRAFT_PAGES !== "true") {
        notFound();
    }

    const params = await props.params;
    const content = await getBlogContent( params.slug,"drafts");
    return <BlogPostFrame pathname={`/drafts/${params.slug}`}>
        {content}
    </BlogPostFrame>

}
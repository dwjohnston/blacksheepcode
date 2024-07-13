import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getAllPostFrontmatter, getMetadata } from "@/utils/blogPosts";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export async function generateStaticParams() {

    const allFrontMatter = await getAllPostFrontmatter("drafts");
    return allFrontMatter.map((v) => {

        return { slug: v.slug.replace("drafts/", "") }
    })
}

export async function generateMetadata({ params }: { params: {
    slug: string
} }) {
    return getMetadata(`/drafts/${params.slug}`);
}

export default async function PageLayout(props: PropsWithChildren<{
    params: {
        slug: string
    }
}>) {
    if(process.env.SHOW_DRAFT_PAGES !== "true") {
        notFound();
    }

    const data = await import(`../../../generated/mdx/drafts/${props.params.slug}`)
    return <BlogPostFrame pathname={`/drafts/${props.params.slug}`}>
        {data.default()}
    </BlogPostFrame>

}
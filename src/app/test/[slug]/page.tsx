import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getAllPostFrontmatter, getMetadata } from "@/utils/blogPosts";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export async function generateStaticParams() {

    const allFrontMatter = await getAllPostFrontmatter("test");
    return allFrontMatter.map((v) => {

        return { slug: v.slug.replace("test/", "") }
    })
}

export async function generateMetadata({ params }: { params: {
    slug: string
} }) {
    return getMetadata(`/test/${params.slug}`);
}

export default async function PageLayout(props: PropsWithChildren<{
    params: {
        slug: string
    }
}>) {

    if(process.env.SHOW_TEST_PAGES !== "true") {
        notFound();
    }
    const data = await import(`../../../generated/mdx/test/${props.params.slug}`)
    return <BlogPostFrame pathname={`/test/${props.params.slug}`}>
        {data.default()}
    </BlogPostFrame>

}
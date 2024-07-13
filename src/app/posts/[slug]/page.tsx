import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getMetadata, getAllPostFrontmatter } from "@/utils/blogPosts";
import { PropsWithChildren } from "react";

export async function generateStaticParams() {

    const allFrontMatter = await getAllPostFrontmatter();
    return allFrontMatter.map((v) => {

        return { slug: v.slug.replace("posts/", "") }
    })
}

export async function generateMetadata({ params }: {
    params: {
        slug: string
    }
}) {
    return getMetadata(`/posts/${params.slug}`);
}

export default async function PageLayout(props: PropsWithChildren<{
    params: {
        slug: string
    }
}>) {

    const data = await import(`../../../generated/mdx/posts/${props.params.slug}`)
    return <BlogPostFrame pathname={`/posts/${props.params.slug}`}>
        {data.default()}
    </BlogPostFrame>

}
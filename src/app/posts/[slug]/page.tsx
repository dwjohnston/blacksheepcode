import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getMetadata } from "@/utils/blogPosts";
import { PropsWithChildren } from "react";


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
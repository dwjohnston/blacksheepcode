import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { PropsWithChildren } from "react";

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
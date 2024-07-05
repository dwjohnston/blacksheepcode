import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function PageLayout(props: PropsWithChildren<{
    params: {
        slug: string
    }
}>) {
    if(process.env.NODE_ENV === "production") {
        notFound();
    }

    const data = await import(`../../../generated/mdx/drafts/${props.params.slug}`)
    return <BlogPostFrame pathname={`/drafts/${props.params.slug}`}>
        {data.default()}
    </BlogPostFrame>

}
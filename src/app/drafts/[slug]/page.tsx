import { BlogPostFrame } from "@/components/BlogPostFrame/BlogPostFrame";
import { getMetadata } from "@/utils/blogPosts";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

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
    if(process.env.NODE_ENV === "production") {
        notFound();
    }

    const data = await import(`../../../generated/mdx/drafts/${props.params.slug}`)
    return <BlogPostFrame pathname={`/drafts/${props.params.slug}`}>
        {data.default()}
    </BlogPostFrame>

}
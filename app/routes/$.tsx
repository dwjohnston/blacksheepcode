import {  useLoaderData, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import PostComments from "~/components/PostComments/PostComments";
import { DataFunctionArgs, LoaderFunction, json } from "@remix-run/server-runtime";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { Frontmatter, getPost } from "~/utils/post";



type LoaderData = {
    frontmatter: any;
    code: string;
};

export const loader: LoaderFunction = async ({ params, request }: DataFunctionArgs) => {
    const slug = params["*"];
    if (!slug) throw new Response("Not found", { status: 404 });

    const post = await getPost(slug);
    if (post) {
        const { frontmatter, code } = post;
        return json({ frontmatter, code });
    } else {
        throw new Response("Not found", { status: 404 });
    }
};


function PostHeader(props: {
    frontmatter: Frontmatter;
}) {

    const { frontmatter } = props;
    // My header is empty but this is potentially where we can add tags
    // Make the h1 come from the post frontmatter, etc. 
    return <>
    </>
}

export default function Post() {
    const { code, frontmatter } = useLoaderData<LoaderData>();
    const Component = useMemo(() => getMDXComponent(code), [code]);
    const params = useLocation();

    return (
        <>
            <PostHeader frontmatter={frontmatter} />
            <Component />

            <EditWithGithub postName={params.pathname} />
            <PostComments />
        </>
    );
}



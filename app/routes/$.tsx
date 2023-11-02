import React from "react";

import {  useLoaderData, useLocation } from "@remix-run/react"

import { DataFunctionArgs, LoaderFunction, json } from "@remix-run/server-runtime";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import { useMemo } from "react";
import { Frontmatter, getPost } from "../utils/post.server";

import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

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

        console.log(post)
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
    const codeString = '(num) => num + 1';

    console.log(SyntaxHighlighter)

    return (
        <>

        hello
        <SyntaxHighlighter language="javascript">
      {codeString}
    </SyntaxHighlighter>
            {/* <PostHeader frontmatter={frontmatter} /> */}
            <Component />

   
        </>
    );
}



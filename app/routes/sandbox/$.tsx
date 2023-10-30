import { useLoaderData } from "@remix-run/react";
import { DataFunctionArgs, LoaderFunction, json } from "@remix-run/server-runtime";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { Frontmatter, getPost } from "~/utils/post";


type LoaderData = {
  frontmatter: any;
  code: string;
};

export const loader: LoaderFunction = async ({ params, request } : DataFunctionArgs) => {
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

  const {frontmatter} = props; 

  return <>

    <h1>{frontmatter.meta?.title}</h1>
  </>
}

export default function Post() {
  const { code, frontmatter } = useLoaderData<LoaderData>();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <> 
      <PostHeader frontmatter={frontmatter}/>
      <Component />
    </>
  );
}

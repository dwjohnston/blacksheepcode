import { useLoaderData, useLocation } from "@remix-run/react";
// import React, { useEffect, useMemo, useState } from "react";
// import { PostWrapper } from "~/utils/Post.server";




// function PostHeader(props: {
//     frontmatter: Frontmatter;
// }) {

//     const { frontmatter } = props;
//     // My header is empty but this is potentially where we can add tags
//     // Make the h1 come from the post frontmatter, etc. 
//     return <>
//     </>



// }


export async function loader(args) {



    const slug = args.params["*"]; 
    
    console.log(slug)
    const result = await import(`../../app/generated/frontmatter/${slug}.json`, { assert: {type: "json"}}); 
    console.log(result)

    console.log(result)



    return slug; 
}

// type MdxAndFrontMatter = {Component: React.Component<{}>, frontmatter: Record<string, unknown>}; 
// function useMdxAndFrontMatter(slug: string) :  MdxAndFrontMatter | null {


//     const [isLoading, setIsLoading] = useState(false);
//     const [mdxAndFrontmatter, setMdxAndFrontmatter] = useState(null as null | MdxAndFrontMatter); 

//     useEffect(() => {
//         if(!isLoading){
//             setIsLoading(true); 

//             import(`../app/generated/frontmatter/${slug}.json`).then((v) => {
//                 console.log(v)

//                 setMdxAndFrontmatter(v.default);
//             });     
//         }
//     }, [isLoading, slug]); 

//     return mdxAndFrontmatter; 
// }

export default function Post() {

    const location = useLocation(); 
    console.log(location);

    const mdxAndFrontmatter = useLoaderData();
    return (
        <> {JSON.stringify(mdxAndFrontmatter)}
                {/* <PostWrapper slug={location.pathname}/> */}
        </>
    );
}



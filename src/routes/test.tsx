import { Outlet, useLocation,  } from "@remix-run/react"
import { BlogPostFrame } from "src/components/BlogPostFrame/BlogPostFrame";
import { IndexRoute } from "src/components/IndexRoute";
import { createLoaderFunction, createMetaFunction } from "src/utils/blogPosts";


export const loader = createLoaderFunction("test");
export const meta = createMetaFunction("test");

export default () => {
    const params = useLocation();

    const isIndexRoute = params.pathname.slice(1) === "test";

    if (isIndexRoute){
        return <IndexRoute folder ="test"/>
    }

    return <>
        <BlogPostFrame pathname={params.pathname}>
            <Outlet />
        </BlogPostFrame>
    </>
}
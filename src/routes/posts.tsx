import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "src/components/EditWithGithub/EditWithGithub"
import PostComments from "src/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "src/utils/blogPosts";
import { FrontmatterBox } from "src/components/FrontmatterBox/FrontmatterBox";
import { IndexRoute } from "src/components/IndexRoute";
import { BlogPostFrame } from "src/components/BlogPostFrame/BlogPostFrame";



export const loader = createLoaderFunction("posts");
export const meta = createMetaFunction("posts");



export default () => {
    const params = useLocation();
    const isIndexRoute = params.pathname.slice(1) === "posts";

    if (isIndexRoute) {
        return <IndexRoute folder="posts" />
    }
    return <>
        <BlogPostFrame pathname={params.pathname}>
            <Outlet />
        </BlogPostFrame>
    </>
}
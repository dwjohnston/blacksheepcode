import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import PostComments from "~/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "~/utils/blogPosts";
import { FrontmatterBox } from "~/components/FrontmatterBox/FrontmatterBox";
import { IndexRoute } from "~/components/IndexRoute";
import { BlogPostFrame } from "~/components/BlogPostFrame/BlogPostFrame";



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
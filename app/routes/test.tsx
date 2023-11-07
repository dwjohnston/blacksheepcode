import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import { FrontmatterBox } from "~/components/FrontmatterBox/FrontmatterBox";
import PostComments from "~/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "~/utils/blogPosts";


export const loader = createLoaderFunction("test");
export const meta = createMetaFunction("test");

export default () => {
    const params = useLocation();
    return <>
        <FrontmatterBox/>
        <Outlet />
        <EditWithGithub postName={params.pathname} />
        <PostComments />
    </>
}
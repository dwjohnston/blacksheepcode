import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import PostComments from "~/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "~/utils/blogPosts";
import { FrontmatterBox } from "~/components/FrontmatterBox/FrontmatterBox";



export const loader = createLoaderFunction("posts");
export const meta = createMetaFunction("posts");

export default () => {
    const params = useLocation();
    return <>
        <FrontmatterBox>
            <Outlet />
        </FrontmatterBox>


        <EditWithGithub postName={params.pathname} />
        <PostComments />
    </>
}
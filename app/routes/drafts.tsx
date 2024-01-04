import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import { FrontmatterBox } from "~/components/FrontmatterBox/FrontmatterBox";
import PostComments from "~/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "~/utils/blogPosts";


export const loader = createLoaderFunction("drafts");
export const meta = createMetaFunction("drafts");

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
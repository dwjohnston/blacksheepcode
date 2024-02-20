import { Outlet, useLocation, useNavigate } from "@remix-run/react"
import { useEffect } from "react";
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import { FrontmatterBox } from "~/components/FrontmatterBox/FrontmatterBox";
import { IndexRoute } from "~/components/IndexRoute";
import PostComments from "~/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "~/utils/blogPosts";


export const loader = createLoaderFunction("drafts");
export const meta = createMetaFunction("drafts");

export default () => {
    const params = useLocation();
    const isIndexRoute = params.pathname.slice(1) === "drafts";

    if (isIndexRoute){
        return <IndexRoute folder ="drafts"/>
    }

    return <>
        <FrontmatterBox>
            <Outlet />
        </FrontmatterBox>
        <EditWithGithub postName={params.pathname} />
        <PostComments />
    </>
}
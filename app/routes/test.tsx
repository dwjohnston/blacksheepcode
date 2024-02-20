import { Outlet, useLocation, useNavigate } from "@remix-run/react"
import { useEffect } from "react";
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import { FrontmatterBox } from "~/components/FrontmatterBox/FrontmatterBox";
import { IndexRoute } from "~/components/IndexRoute";
import PostComments from "~/components/PostComments/PostComments";
import { createLoaderFunction, createMetaFunction } from "~/utils/blogPosts";


export const loader = createLoaderFunction("test");
export const meta = createMetaFunction("test");

export default () => {
    const params = useLocation();

    const isIndexRoute = params.pathname.slice(1) === "test";

    if (isIndexRoute){
        return <IndexRoute folder ="test"/>
    }

    return <>
        <FrontmatterBox>
            <Outlet />
        </FrontmatterBox>
        <EditWithGithub postName={params.pathname} />
        <PostComments />
    </>
}
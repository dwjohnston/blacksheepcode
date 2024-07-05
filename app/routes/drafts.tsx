import { Outlet, useLocation, useNavigate } from "@remix-run/react"
import { BlogPostFrame } from "~/components/BlogPostFrame/BlogPostFrame";
import { IndexRoute } from "~/components/IndexRoute";
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
        <BlogPostFrame pathname={params.pathname}>
            <Outlet />
        </BlogPostFrame>
    </>
}
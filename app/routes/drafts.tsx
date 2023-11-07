import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import PostComments from "~/components/PostComments/PostComments";

export default () => {

    const params = useLocation();
    return <>

    POSTS.TSX
        <Outlet />
        <EditWithGithub postName={params.pathname} />
        <PostComments />
    </>
}
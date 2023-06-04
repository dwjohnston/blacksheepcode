import { Outlet, useLocation } from "@remix-run/react"
import { EditWithGithub } from "~/components/EditWithGithub/EditWithGithub"
import PostComments from "~/components/PostComments/PostComments";
import {getMDXComponent} from 'mdx-bundler/client'

export default () => {

    const params = useLocation();
    console.log(params);

    return <>
        <Outlet />
        <EditWithGithub postName={params.pathname} />
        <PostComments />
    </>
}
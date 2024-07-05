import type { PropsWithChildren } from "react";
import { FrontmatterBox } from "../FrontmatterBox/FrontmatterBox";
import { EditWithGithub } from "../EditWithGithub/EditWithGithub";
import PostComments from "../PostComments/PostComments";

export function BlogPostFrame(props: PropsWithChildren<{ pathname: string }>) {
    return <>
        <FrontmatterBox slug={props.pathname}>
            {props.children}
        </FrontmatterBox>
        <EditWithGithub postName={props.pathname} />
        <PostComments />
    </>
}
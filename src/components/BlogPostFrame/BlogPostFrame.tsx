import { type PropsWithChildren, Suspense } from "react";
import { EditWithGithub } from "../EditWithGithub/EditWithGithub";
import { FrontmatterBox } from "../FrontmatterBox/FrontmatterBox";
import PostComments from "../PostComments/PostComments";
// Removed unused import

export function BlogPostFrame(props: PropsWithChildren<{ pathname: string }>) {
  return (
    <>
      <FrontmatterBox slug={props.pathname}>{props.children}</FrontmatterBox>
      <EditWithGithub postName={props.pathname} />

      <Suspense>
        <PostComments />
      </Suspense>
    </>
  );
}

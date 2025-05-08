import { getAllPostFrontmatter } from "@/utils/blogPosts";
import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";
import { notFound } from "next/navigation";
import { GithubPermalinkRsc } from "react-github-permalink/dist/rsc";
import { CodeExampleLink } from "@/components/CodeExampleLink/CodeExampleLink";
import { MyForm } from "@/demos/imperative_confirmation_modal/components/MyForm";
import { MyRenderTrackerDemo } from "@/app/demos/react-renders/ReactRenders";
import { MyRenderTrackerDemo as MyRenderTrackerDemo2 } from "@/app/demos/react-renders/ReactRenders2";

async function getAllArticles() {
    return getAllPostFrontmatter("test")
}

export default async function PageLayout() {
    if (process.env.SHOW_TEST_PAGES !== "true") {
        notFound();
    }
    const articles = await getAllArticles();
    return <div>

        Test Posts
        <MyRenderTrackerDemo />
        <MyRenderTrackerDemo2 />

        <ListOfArticles allFrontmatter={articles} />
        <MyForm />
        <CodeExampleLink link="foo" />
        <GithubPermalinkRsc permalink="https://github.com/dwjohnston/bundle-size-investigation/blob/37f8511bb56a556b1abd2c87226847e2ef30e07f/scenario-1-images-only/index.html#L1-L31"

            excludeLines={[[4, 5]]} />
    </div>
}
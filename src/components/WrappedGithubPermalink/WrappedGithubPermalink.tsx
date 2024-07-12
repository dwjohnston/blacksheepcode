import { Suspense } from "react";
import { GithubPermalink, GithubIssueLink } from "react-github-permalink";


export function WrappedGithubPermalink(props: {permalink: string}) {
    return <Suspense>
        <GithubPermalink {...props}/>
    </Suspense>
}

export function WrappedGithubIssueLink(props: {issueLink: string}) {
    return <Suspense>
        <GithubIssueLink {...props}/>
    </Suspense>
}
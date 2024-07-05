import { GithubPermalink, GithubPermalinkProvider, GithubIssueLink} from "react-github-permalink"

export default function() {
    return <div>I am a .tsx file

<GithubPermalinkProvider githubToken="foo">
<GithubPermalink permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"/>
<GithubIssueLink issueLink='https://github.com/dwjohnston/react-github-permalink/issues/2' />
</GithubPermalinkProvider>
    </div>
}

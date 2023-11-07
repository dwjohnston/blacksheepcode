import React, { useEffect } from 'react'
import Comment from './Comment';
const PostComments = () => {
    const commentBox = React.createRef<HTMLDivElement>();

    useEffect(() => {

        const containingEl = commentBox.current; 

        const commentScript = document.createElement('script')
        commentScript.async = true
        commentScript.src = 'https://utteranc.es/client.js'
        // define the name of the repository you created here as 'owner/repo'
        // or import it from your config file if you have one.
        commentScript.setAttribute('repo', "dwjohnston/blacksheepcode")
        // define the blog post -> issue mapping (e.g. page pathname, page url).
        // here the issues will be created with the page pathname as the issue title.
        commentScript.setAttribute('issue-term', 'pathname')
        // define a custom label that you want added to your posts.
        commentScript.setAttribute('label', 'blog-comment')
        // define if you want to use dark or light theme.
        commentScript.setAttribute('theme', 'github-light')
        commentScript.setAttribute('crossorigin', 'anonymous')
        // we will append this script as a child to the ref element we have created above


        if (containingEl) {
            containingEl.appendChild(commentScript)
        } else {
            console.log(`Error adding utterances comments on: ${commentBox}`)
        }

        return () => {
            if (containingEl && containingEl.contains(commentScript)) {
                containingEl.removeChild(commentScript);
            }
        }
    }, [commentBox])

    return (
        <>
            <Comment ref={commentBox} />
        </>
    )
}
export default PostComments;

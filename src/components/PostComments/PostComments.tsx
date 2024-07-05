"use client"
import React, { useEffect, useRef } from 'react'
import Comment from './Comment';


const PostComments = () => {
    const commentBox = useRef<HTMLDivElement>(null);

    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {


        if(!scriptRef.current){
            const commentScript = document.createElement('script')
            scriptRef.current = commentScript; 

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
            commentScript.setAttribute('theme', 'preferred-color-scheme')
            commentScript.setAttribute('crossorigin', 'anonymous')
            // we will append this script as a child to the ref element we have created above
        }

        const containingEl = commentBox.current;
        if (containingEl) {
            if(!scriptRef.current){
                throw new Error("Something has gone wrong - have got the containing el, but no script");
            }
            containingEl.appendChild(scriptRef.current)
        } 

        return () => {
            if (containingEl && scriptRef.current &&  containingEl.contains(scriptRef.current)) {
                containingEl.removeChild(scriptRef.current);
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

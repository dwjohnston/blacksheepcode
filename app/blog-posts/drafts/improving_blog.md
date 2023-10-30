import {GithubPermalink} from "react-github-permalink";


This post outlines a process I took to improve this blog. 


## Starting Point

Initially I had followed [Remix's MDX guide](https://remix.run/docs/en/main/guides/mdx). 

We declare `.mdx` files in our Remix routing structure. Remix's out-of-the-box tooling can handle the the MDX content and at build time converts it to JavaScript where it is treated just like any other ordinary React route component. 

Conveniently, [YAML frontmatter](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter) headers are also supported. 

Some configuration was required - to add codeblock syntax highlighting, for example. 

<GithubPermalink permalink="https://github.com/dwjohnston/blacksheepcode/blob/69005aa52d9b80ba81904fc6012d5afcc1889bc6/remix.config.js#L13-L23"/>


## The Problem

The problem I had is mostly around the usage of frontmatter - I had no control of how the frontmatter behaved with my application; I could only use the functionality as provided with the out-of-the-box tooling - adding titles, social meta tags etc. 

One annoying issue I had was that twitter's social meta tags required their own `twitter` prefix (eg. `og:twitter:title`), even though this was going to be the exact same as the other socials, [I had to go through and specially add frontmatter items for twitter on every post](https://github.com/dwjohnston/blacksheepcode/pull/60/files).

Additional items: 

- The list of blog posts on the homepage are currently based on file name, I want them to be based on title and description instead. 
- Potentially add tags to posts and allow the tags to be clicked to see other posts with that tag. 
- Be able to create a series of topics on a post. When in a post is in a series the posts include links to other items in the series. '
- Not relevant for me - but potentially add a 'post author' property, if there were multiple people working on the blog. 
- Add a 'date created' and 'last modfified' indicator to the posts. 


## The Solution 

I've essentially looked how [Kent C. Dodds' builds his blog](https://github.com/kentcdodds/kentcdodds.com), and copied that. 


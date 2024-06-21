import { getAllPostFrontmatter } from "~/utils/blogPosts";
import { Link, useLoaderData } from "@remix-run/react";
import type { FrontMatterPlusSlug } from "utils/frontmatterTypings";
import { SheepImage } from "~/components/SheepImage/SheepImage";
import { ListOfArticles } from "~/components/ListOfArticles/ListOfArticles";


export async function loader() {
  return await getAllPostFrontmatter();
}

export default function Index() {

  const allArticles = useLoaderData<Array<FrontMatterPlusSlug>>();

  return (<>
    <div className="main">

      <div className="headline">
       <SheepImage />
        <div>
          <h1>Black Sheep Code</h1>
          <p>Tech writings from David Johnston.</p>
        </div>
      </div>
      <div>
        <h2>Work</h2>
        <ul>
          <li><a href="https://github.com/dwjohnston" target="_blank" rel="noreferrer">Github</a></li>
          <li><a href="https://stackoverflow.com/users/1068446/dwjohnston" target="_blank" rel="noreferrer">Stack Overflow</a> </li>
        </ul>

        <h2>Open Source Projects</h2>
        <ul>
          <li> <a href="https://www.npmjs.com/package/react-github-permalink" target="_blank" rel="noreferrer">react-github-permalink</a> - Provide a Github permalink and this React component will display the codeblock. I use this component regularly in my blog.</li>
          <li> <a href="https://github.com/dwjohnston/ts-tutorial-series" target="_blank" rel="noreferrer">TypeScript Tutorial Series</a> - A TypeScript tutorial series, complete with interactive exercises, starting from the very basics and going up to generics and mapped and index types.</li>

          <li> <a href="https://github.com/dwjohnston/javascript-101" target="_blank" rel="noreferrer">Javascript 101</a> - A JavaScript tutorial series for people who know nothing about coding. Complete with interactive exercises.</li>


        </ul>

      </div>

      <div>
        <h2>Just For Fun</h2>
        <ul>
          <li><a href="/game-of-life">Conway's Game of Life</a>
          </li>
        </ul>
      </div>


    </div>

    <div className="main">

      <h2>Blog</h2>
      <ListOfArticles allFrontmatter={allArticles} />
    </div>

    <p className="open-source">I support open source: <a href="https://opencollective.com/blacksheepcode" target="_blank" rel="noreferrer">Open Collective</a>
    </p>
  </>
  );
}

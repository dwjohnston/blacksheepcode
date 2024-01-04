import mainIcon from "../assets/blacksheep_100x100.webp";
import { getAllPostFrontmatter } from "~/utils/blogPosts";
import { Link, useLoaderData } from "@remix-run/react";
import type { FrontMatterPlusSlug } from "utils/frontmatterTypings";
import { useEffect } from "react";
import { DatePublished } from "~/components/DatePublished/DatePublished";



export function ListOfArticles(props: {
  allFrontmatter: Array<FrontMatterPlusSlug>
}) {
  return <div>
    {props.allFrontmatter.map((v) => {
      return <Link to={v.slug} key={v.slug} className="homepage-article-link">
        <div>
          <p className="homepage-article-link-title">{v.frontmatter.meta?.title ?? v.slug}</p>
          {v.frontmatter.meta?.dateCreated && <DatePublished date={v.frontmatter.meta.dateCreated}/>}
          <p className="homepage-article-link-description">{v.frontmatter.meta?.description ?? ''}</p>
        </div>
      </Link>
    })}

  </div>
}


export async function loader() {
  return await getAllPostFrontmatter();
}

export default function Index() {

  const allArticles = useLoaderData<Array<FrontMatterPlusSlug>>();

  return (<>
    <div className="main">

      <div className="headline">
        <div className="logo-container">
          <img src={mainIcon} alt="A nerdy looking sheep" />
        </div>
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
      </div>

      <div>
        <h2>Just For Fun</h2>
        <ul>
          <li><a href="/game-of-life">Conway's Game of Life</a>
          </li>
          <li><a href="http://new.geoplanets.io/" target="_blank" rel="noreferrer">GeoPlanets</a> - A foray in to geometric art.
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

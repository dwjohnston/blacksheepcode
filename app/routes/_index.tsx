import { DataFunctionArgs } from "@remix-run/server-runtime";
import mainIcon from "../assets/blacksheep_100x100.webp";
import { Frontmatter, getPosts } from "~/utils/post.server";
import { useLoaderData } from "@remix-run/react";


export async function loader(data: DataFunctionArgs) {
  const posts = await getPosts();
  return posts;
}


function BlogItem(props: {
  item: {
    slug: string; 
    frontmatter?: Frontmatter;
  }
}) {

  const {item} = props
  return <div className= "blog-item">
    <a href={`/posts/${item.slug}`}> <h3>{item.frontmatter?.meta?.title ?? item.slug} </h3></a>
    <p>{item.frontmatter?.meta?.description}</p>

  </div>
}

function ListOfBlogPosts() {
  const data = useLoaderData<Array<{
    slug: string; 
    frontmatter: Frontmatter;
  }>>(); 
  return <>
      {data.map((v) => {
          return <BlogItem item={v} key={v.slug}/>
        })}
  </>
}

export default function Index() {
  return (<>
      <div className="main">

        <div className="headline">
          <div className="logo-container">
            <img src={mainIcon} alt="A nerdy looking sheep" />
          </div>
          <div>
            <h1>Black Sheep Code</h1>
            <p>Personal Website of David Johnston</p>
          </div>
        </div>
        <div>
          <h2>Work</h2>
          <ul>
            <li><a href="https://github.com/dwjohnston" target="_blank">Github</a></li>
            <li><a href="https://stackoverflow.com/users/1068446/dwjohnston" target="_blank">Stack Overflow</a> </li>
          </ul>
        </div>

        <div>
          <h2>Just For Fun</h2>
          <ul>
            <li><a href="/game-of-life">Conway's Game of Life</a>
            </li>
            <li><a href="http://new.geoplanets.io/" target="_blank">GeoPlanets</a> - My first foray in to geometric art.
            </li>
          </ul>
        </div>


      </div>

      <div className="main">

        <h2>Blog</h2>

        <ListOfBlogPosts/>
      </div>

      <p className="open-source">I support open source: <a href="https://opencollective.com/blacksheepcode" target="_blank">Open Collective</a>
      </p>
    </>
  );
}
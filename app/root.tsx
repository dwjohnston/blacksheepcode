import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction,  type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import githubPermalinkStyle from "react-github-permalink/dist/github-permalink.css";

import styles from 'highlight.js/styles/vs2015.css';
import ourStyles from "~/styles/styles.css";
import bscImage from "./assets/blacksheep_fb_wide.webp";
import { GithubPermalinkProvider } from "react-github-permalink";

declare global {
  interface Window { ENV: {
    GITHUB_TOKEN?: string; 
  }}
}



export const meta: MetaFunction = (...args) => {
  return {
    charset: "utf-8",
    title: "Black Sheep Code - The Personal Blog of David Johnston",
    description: "A nice blog",
    viewport: "width=device-width,initial-scale=1",
    "og:type": "website",
    'og:image': `https://blacksheepcode.com${bscImage}`,
    'og:image:width': '409',
    'og:image:height': '214',
    'twitter:image': `https://blacksheepcode.com${bscImage}`,
    'twitter:image:width': '409',
    'twitter:image:height': '214',
    'twitter:card': "summary_large_image",
    'twitter:domain': "blacksheepcode.com",


  }
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),

  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet", href: ourStyles,
  },
  {rel: "stylesheet", href: githubPermalinkStyle},
  {
    rel: "stylesheet",
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
  }, 
  {rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"}
];

export async function loader() {

  console.log(process.env.NODE_ENV);
  return json({
    ENV: {
      GITHUB_TOKEN: process.env.NODE_ENV === 'development' ? process.env.GITHUB_TOKEN : null
    },
  });
}


export default function App() {

  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0NB66YHJYM"></script>
        <script
                      dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                      
                        gtag('config', 'G-0NB66YHJYM');
                        `
                      }}
        >

        </script>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <div>
            <a href="/">Black Sheep Code</a>
          </div>
        </header>
        <div className="main-column">
          <GithubPermalinkProvider githubToken={data.ENV.GITHUB_TOKEN ?? undefined}>
            <Outlet />
          </GithubPermalinkProvider>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

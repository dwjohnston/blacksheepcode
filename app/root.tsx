import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from 'highlight.js/styles/vs2015.css';
import ourStyles from "~/styles/styles.css";
import bscImage from "./assets/blacksheep_fb_wide.webp";
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

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles },
  {
    rel: "stylesheet", href: ourStyles,
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Open Sans"
  }
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}

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
import bscImage from "./assets/bsc3.png";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Black Sheep Code - The Personal Blog of David Johnston",
  viewport: "width=device-width,initial-scale=1",
  'og:image': `https://blacksheepcode.com/${bscImage}`,
  'og:image:width': '841',
  'og:image:height': '842',
});

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
            <a href = "/">Black Sheep Code</a>
          </div>
        </header>
        <div className ="main-column">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </div>
      </body>
    </html>
  );
}

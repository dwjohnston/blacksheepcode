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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Black Sheep Code - The Personal Blog of David Johnston",
  viewport: "width=device-width,initial-scale=1",
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

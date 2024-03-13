import { captureRemixErrorBoundaryError, captureException} from "@sentry/remix";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction, type MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import githubPermalinkStyle from "react-github-permalink/dist/github-permalink.css";

import styles from 'highlight.js/styles/vs2015.css';
import ourStyles from "~/styles/styles.css";
import bscImage from "./assets/blacksheep_fb_wide.webp";
import { GithubPermalinkProvider } from "react-github-permalink";
import { Page404 } from "./error_pages/Page404";
import { Page500 } from "./error_pages/Page500";

declare global {
  interface Window {
    ENV: {
      GITHUB_TOKEN?: string;
    }
  }
}



export const meta: MetaFunction = (...args) => {
  return {
    charset: "utf-8",
    title: "Black Sheep Code - Tech writings from David Johnston",
    description: "Modern web development - testability, extensibility, declarative APIs, declarative code from open specs and more.",
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
  { rel: "stylesheet", href: githubPermalinkStyle },
  {
    rel: "stylesheet",
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  }
];

export async function loader() {
  return json({
    ENV: {
      GITHUB_TOKEN: process.env.NODE_ENV === 'development' ? process.env.GITHUB_TOKEN : null
    },
  });
}


export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);


  return <>

    <html>

      <head>
        <title>Error!</title>
        <Links />
      </head>
      <body>
        {(() => {
          try {
            if (isRouteErrorResponse(error)) {
              if (error.status === 404) {
                return <Page404 />
              }
            }


            return <Page500 />
          } catch (err) {
            return <div>Something went wrong</div>
          }
        })()}
      </body>
    </html>
  </>






};



export default function App() {

  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        {/* https://webmasters.stackexchange.com/questions/126661/pagespeed-insights-reports-that-google-analytics-is-blocking-main-thread-in-page */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

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
          <GithubPermalinkProvider githubToken={data.ENV.GITHUB_TOKEN ?? undefined} onError={(err) => {
            if (err instanceof Response) {
              captureException(new Error(`Github API error`));
            } else {
              captureException({
                message: "unknown exception",
                err: err
              });
            }

          }}>
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
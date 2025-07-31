import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-github-permalink/dist/github-permalink.css";
import { mergeFrontmatterAndDefaultMetadata } from "@/utils/blogPosts";
import * as Sentry from "@sentry/nextjs";

import { githubPermalinkRscConfig } from "react-github-permalink/dist/rsc";
import { Nav } from "@/components/Nav/Nav";
const inter = Inter({ subsets: ["latin"] });
import React from "react";
import { MyTextHighlightProvider } from "@/components/BlogPostFrame/TextHighlightProvider";
githubPermalinkRscConfig.setConfig({
  // Can't use the prefix GITHUB in github actions so just have a second token just for github actions
  githubToken: process.env.GITHUB_TOKEN ?? process.env.PERMALINK_READ_TOKEN,
  onError: ((err) => {
    Sentry.captureException(err);
  })
})

export const metadata: Metadata = mergeFrontmatterAndDefaultMetadata({
  title: "Black Sheep Code",
  description: "A blog about modern web development"
}
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* https://webmasters.stackexchange.com/questions/126661/pagespeed-insights-reports-that-google-analytics-is-blocking-main-thread-in-page */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" media="(prefers-color-scheme: dark)" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css" media="(prefers-color-scheme: light)" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0NB66YHJYM"></script>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wdth,wght@0,18..144,87..112,300..900;1,18..144,87..112,300..900&display=swap" rel="stylesheet"/>
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
      </head>

      <body className={inter.className}>

        <header>
          <div className="header-flex-container">
            <div>
              <a className="title" href="/">Black Sheep Code</a>
            </div>


            <div className="icon-links">

              <a href="https://www.linkedin.com/in/davidjohnstonwebdeveloper/" className="rss-link" aria-label="Linked In">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
              </a>
              <a href="https://github.com/dwjohnston" className="rss-link" aria-label="Github">
                <svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" /></svg>
              </a>
              <a href="/rss.xml" className="rss-link" aria-label="rss feed">
                <span className="icon material-symbols-outlined">
                  rss_feed
                </span></a>
            </div>
            <Nav />
          </div>



        </header>

        <MyTextHighlightProvider >
          {children}
        </MyTextHighlightProvider>
      </body>
    </html>
  );
}

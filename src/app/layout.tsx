import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-github-permalink/dist/github-permalink.css";
import { mergeFrontmatterAndDefaultMetadata } from "@/utils/blogPosts";

import {githubPermalinkRscConfig} from "react-github-permalink/dist/rsc";
const inter = Inter({ subsets: ["latin"] });

githubPermalinkRscConfig.setConfig({
  // Can't use the prefix GITHUB in github actions so just have a second token just for github actions
  githubToken: process.env.GITHUB_TOKEN ?? process.env.PERMALINK_READ_TOKEN
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

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" media="(prefers-color-scheme: dark)" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css" media="(prefers-color-scheme: light)" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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
      </head>

      <body className={inter.className}>

        <header>
          <div>
            <a href="/">Black Sheep Code</a>
          </div>

          <div>
            <a href="/rss.xml" className="rss-link" aria-label="rss feed">
              <span className="icon material-symbols-outlined">
                rss_feed
              </span></a>
          </div>
        </header>
        <div className="main-column">
          {children}
        </div>
      </body>
    </html>
  );
}

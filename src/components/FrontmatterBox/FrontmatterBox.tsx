import type { PropsWithChildren } from "react";
import React, { useEffect, useState } from "react";
import { getFrontmatterFromSlug } from "@/utils/blogPosts";
import type { EnrichedFrontMatterPlusSlug } from "../../../utils/frontmatterTypings";
import Link from "next/link";

type FrontmatterBoxProps = {
    frontmatter: EnrichedFrontMatterPlusSlug | null;
}


function SeriesBox(props: FrontmatterBoxProps) {

    if (!props.frontmatter?.seriesFrontmatter) {
        return null;
    }

    if (!props.frontmatter.frontmatter.series) {
        return null;
    }

    const firstSeriesItem = props.frontmatter?.seriesFrontmatter[0];

    return <div className="series-box">
        <p>
            This article is a part of the series &quot;<i className="series-description-text">{firstSeriesItem.frontmatter.series?.description ?? firstSeriesItem.frontmatter.series?.name}</i>&quot;        </p>
        <ul>
            {props.frontmatter?.seriesFrontmatter?.map((v) => {
                return <li key={v.slug}>
                    <Link href={`/${v.slug}`} className={v.slug === props.frontmatter?.slug ? "current" : ""} >
                        {v.frontmatter.meta?.title ?? v.slug}
                    </Link>
                </li>
            })}
        </ul>
    </div>

}


function partIsNumber(part: number | undefined): part is number {
    return typeof part === 'number';
}

function NextBox(props: FrontmatterBoxProps) {
    const part = props.frontmatter?.frontmatter.series?.part;
    if (!partIsNumber(part)) {
        return null;
    }

    const nextInSeries = part; // nb. the series are 1 indexed, but the array here is 0 indexed.

    if (props.frontmatter?.seriesFrontmatter && props.frontmatter.seriesFrontmatter[nextInSeries]) {

        const nextPost = props.frontmatter.seriesFrontmatter[nextInSeries];

        return <div className="next-post">
            <Link href={`/${nextPost.slug}`}><strong>Next:</strong> {nextPost.frontmatter.meta.title}</Link>
        </div>
    }
    return null;
}


export async function FrontmatterBox(props: PropsWithChildren<{
    slug: string
}>) {

    const frontmatter = await getFrontmatterFromSlug(props.slug);

    if (!frontmatter) {
        return <>{props.children}</>;
    }
    return <><div>
        <SeriesBox frontmatter={frontmatter} />
    </div>
        {props.children}

        <NextBox frontmatter={frontmatter} />

        <>
            <br />
            <br />
            Questions? Comments? Criticisms? <a href="#comments">Get in the comments! 👇</a>
        </>
    </>
}
import React, { useEffect, useState } from "react";
import {  Link,useLocation } from "@remix-run/react";

import type { EnrichedFrontMatter} from "~/utils/blogPosts";
import { getFrontmatterFromSlug } from "~/utils/blogPosts";

type FrontmatterBoxProps = {
    frontmatter: EnrichedFrontMatter | null; 
}


function SeriesBox(props: FrontmatterBoxProps) {

    if(!props.frontmatter?.seriesFrontmatter){
        throw new Error("Expected seriesFrontmatter to exist");
    }

    const firstSeriesItem = props.frontmatter?.seriesFrontmatter[0]; 
    
    return <div className="series-box">
        <p>
            {/* @ts-expect-error */}
            This article is a part of the series "<i className="series-description-text">{firstSeriesItem.frontmatter.series.description ?? firstSeriesItem.frontmatter.series.name}</i>"
        </p>
        <ul>
            {props.frontmatter?.seriesFrontmatter?.map((v) => {
                return <li key={v.slug}>
                    <Link to={`/${v.slug}`} className={v.slug === props.frontmatter?.slug ? "current" : ""} >
                        {v.frontmatter.meta?.title ?? v.slug}
                    </Link>
                </li>
            })}
        </ul>
    </div>

}

export function FrontmatterBox() {
   
    const location = useLocation();
    const [pathName, setPathname] = useState(null as null | string); 
    const [value, setValue] = useState<null | EnrichedFrontMatter>(null);

    useEffect(() => {
        if(pathName !== location.pathname){
            setPathname(location.pathname);
            getFrontmatterFromSlug(location.pathname).then((v) => {
                setValue(v);
            }); 
        }
    }, [pathName, location.pathname]); 

    if(!value){
        return null; 
    }
    return <div>
        {value.seriesFrontmatter && <SeriesBox frontmatter={value}/>}
    </div>
}
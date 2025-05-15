"use client"
import "./react-text-highlight.css";


import { useRef } from "react";
import { TextHighlightProvider } from "@blacksheepcode/react-text-highlight";
export function MyTextHighlightProvider(props: React.PropsWithChildren<{}>) {


    const ref = useRef<HTMLDivElement>(null);
    return <div className="page-with-margins">

        <div className="left-gutter">

        </div>
        <TextHighlightProvider gutterRef={ref}>
            <div className="main-column">
                {props.children}
            </div>
        </TextHighlightProvider>
        <div ref={ref} className="right-gutter">

        </div>
    </div>
}

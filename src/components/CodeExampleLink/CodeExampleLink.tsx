import React from "react";

export function CodeExampleLink(props: {link: string, text?: string}) {
    const {link, text} = props;
    return <a className="code-example-link" href ={link}>Code Example: {text ?? link}</a>
}
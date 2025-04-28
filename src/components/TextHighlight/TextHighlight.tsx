import { PropsWithChildren } from "react";

type TextHighlightProps = {
    commentContent: React.ReactNode;
}

export function TextHighlight(props: PropsWithChildren<TextHighlightProps>){

    return <span className="text-highlight">
        {props.children}
    </span>

}
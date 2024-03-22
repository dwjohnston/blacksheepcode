import { PropsWithChildren } from "react";

type AsideProps = PropsWithChildren<{
    
}>
export function Aside(props: AsideProps) {


    return <figure className="aside">
        <div className="triangle"></div>
        <div className="triangle-drop-shadow"></div>

        {props.children}
    </figure>
}
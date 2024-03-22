import { PropsWithChildren } from "react";

type AsideProps = PropsWithChildren<{
    
}>
export function Aside(props: AsideProps) {


    return <figure className="aside">
        {props.children}
    </figure>
}
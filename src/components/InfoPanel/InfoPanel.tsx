import type { PropsWithChildren } from "react";

type InfoPanelProps = PropsWithChildren<{
    level: "warning" | "info"; 
    className?: string; 
}>

export function InfoPanel(props: InfoPanelProps){

    const {level, className ='', children} = props; 

    return <div className ={`infopanel infopanel-${level} ${className}`}> 
        {level === "warning" && <span className="icon material-symbols-outlined">warning</span>}
        {level === "info" && <span className ="icon material-symbols-outlined">info</span>}
        {children}
    </div>

}
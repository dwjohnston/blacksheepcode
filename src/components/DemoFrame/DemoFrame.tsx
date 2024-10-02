import { PropsWithChildren, ReactNode } from "react";

export type DemoFrameProps = PropsWithChildren<{
    description?: string | ReactNode; 
}>;

export function DemoFrame(props: DemoFrameProps) {
  

    return <figure className="demo-frame">
        <p className="demo-frame-title">☝️ Interactive demo</p>
        <div className ="demo-frame-content">
        {props.children}
        </div>
        <figcaption className="demo-frame-description">{props.description}</figcaption>
    </figure>
} 
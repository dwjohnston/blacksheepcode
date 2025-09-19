"use client"
import React, { useContext } from "react";
import "./style.css";
import { RenderTracker } from "./common";



 function ChildrenStyleOne() {
    const [isLeft, setIsLeft] = React.useState(true)
    return <div className="some-parent-component double-wide">
        <strong>ChildrenStyleOne</strong>
        <button onClick={() => {
            setIsLeft((prev) => !prev);;
        }}>Move to {isLeft ?"right": "left"}</button>

        <div className="left-right">
            <div>
                {isLeft && <RenderTracker/>}
            </div>
            <div>
                {!isLeft && <RenderTracker/>}
            </div>
        </div>
 
    </div >
}

 function ChildrenStyleTwo(props: React.PropsWithChildren) {
    const {children} = props;
    const [isLeft, setIsLeft] = React.useState(true)
    return <div className="some-parent-component double-wide">
        <strong>ChildrenStyleOne</strong>
        <button onClick={() => {
            setIsLeft((prev) => !prev);;
        }}>Move to {isLeft ?"right": "left"}</button>

        <div className="left-right">
            <div>
                {isLeft && children}
            </div>
            <div>
                {!isLeft && children}
            </div>
        </div>
 
    </div >
    
}

export function ReactRenders5() {
    return <div className="render-tracker-demo">
        <ChildrenStyleOne />
        <ChildrenStyleTwo>
            <RenderTracker />
        </ChildrenStyleTwo>
    </div >
}
"use client"
import React, { useContext } from "react";
import "./style.css";
import { RenderTracker } from "./common";



export function ChildrenStyleOne() {
    const [value, setValue] = React.useState(0)
    return <div className="some-parent-component">
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        <RenderTracker />
    </div >
}

export function ChildrenStyleTwo(props: React.PropsWithChildren) {
    const [value, setValue] = React.useState(0)
    return <div className="some-parent-component">
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        {props.children}
    </div >
}

export function ReactRenders3() {
    return <div className="render-tracker-demo">
        <ChildrenStyleOne />
        <ChildrenStyleTwo>
            <RenderTracker />
        </ChildrenStyleTwo>
    </div >
}
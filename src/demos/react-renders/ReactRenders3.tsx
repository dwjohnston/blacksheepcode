
"use client"
import React from "react";
import "./style.css";
import { RenderTracker } from "./common";


export function ChildrenStyleOne() {
    const [value, setValue] = React.useState(0)
    return <div className="some-parent-component">
        <strong>ChildrenStyleOne</strong>
        <p>RenderTracker is directly rendered</p>
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        {/* 👇 Here we declare the RenderTracker directly in the component */}
        <RenderTracker />
    </div >
}

export function ChildrenStyleTwo(props: React.PropsWithChildren) {
    const [value, setValue] = React.useState(0)
    return <div className="some-parent-component">
        <strong>ChildrenStyleTwo</strong>
        <p>RenderTracker is rendered as props.children</p>
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        {/* 👇 Here, it is passed from the parent via the `children` prop */}
        {props.children}
    </div >
}


export function ReactRenders3() {
    return <div className="demo side-by-side">
        <ChildrenStyleOne />
        <ChildrenStyleTwo>
            <RenderTracker />
        </ChildrenStyleTwo>
    </div >
}
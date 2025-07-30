"use client"
import React, { useContext, useEffect, useState } from "react";
import "./style.css";

export function RenderTracker() {
    console.log("C")

    let randX = Math.floor(Math.random() * 100);
    let randY = Math.floor(Math.random() * 100);

    const [mountValue, setMountValue] = useState("0")
    useEffect(() => {
        setMountValue(Math.random().toFixed(4))
    },[])


    return <div className="render-tracker">
        <strong>Render Tracker</strong>
        <div>Mount value: {mountValue}</div>
        <div className="render-tracking-dot" style={{ top: `${randY}%`, left: `${randX}%` }}>
        </div>
    </div >
}



export function PingPongElement(props: React.PropsWithChildren) {
    const [value, setValue] = React.useState(0)

    const [isLeft, setIsLeft] = useState(true);
    console.log("B")

    console.log(props.children)
    return <div >
        <strong>ChildrenStyleTwo</strong>
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>

        <button onClick={() => {
            setIsLeft((prev) => !prev);;
        }}>{isLeft ? "Ping" : "Pong"}  {value}</button>


        <div className="ping-pong-container">
            <div className="ping-pong-left">{isLeft && props.children}</div>
            <div className="ping-pong-right">{!isLeft && props.children}</div>
        </div>

    </div >
}

export function ReactRendersPingPong() {
    console.log("A")
    return <div className="render-tracker-demo">
        <PingPongElement>
            <RenderTracker/>
        </PingPongElement>
    </div >
}



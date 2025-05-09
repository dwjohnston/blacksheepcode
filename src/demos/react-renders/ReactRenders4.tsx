"use client"
import React, { useContext, useState } from "react";
import "./style.css";
import { RenderTracker } from "./common";




export function ReactRenders4() {
    const [value, setValue] = useState('')
    return <div className="render-tracker-demo">
        <div className="some-parent-component">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="type here" />
            <RenderTracker />
        </div>
    </div >
}
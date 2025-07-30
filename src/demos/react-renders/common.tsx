import { useState } from "react";

export function RenderTracker() {

    let randX = Math.floor(Math.random() * 100);
    let randY = Math.floor(Math.random() * 100);

    const [mountValue] = useState(Math.random().toFixed(4))


    return <div className="render-tracker">
        <strong>Render Tracker</strong>
        <div>Mount value: {mountValue}</div>
        <div className="render-tracking-dot" style={{ top: `${randY}%`, left: `${randX}%` }}>
        </div>
    </div >
}


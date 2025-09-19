import { useEffect, useState } from "react";

export function RenderTracker() {

    let randX = Math.floor(Math.random() * 100);
    let randY = Math.floor(Math.random() * 100);


    const [mountValue, setMountValue] = useState(0);
    useEffect(() => {
        setMountValue(Math.random())
    },[])


    return <div className="render-tracker">
        <strong>Render Tracker</strong>
        <p className="mount-value">{mountValue ===0? <>&#8203;</>: <>Mount value: {mountValue.toFixed(4)}</>}</p>
        <div className="tracking-dot-container">
            <div className="render-tracking-dot" style={{ top: `${randY}%`, left: `${randX}%` }}>
        </div>
        </div>
    </div >
}


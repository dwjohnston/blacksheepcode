
export function RenderTracker() {

    let randX = Math.floor(Math.random() * 100);
    let randY = Math.floor(Math.random() * 100);


    return <div className="render-tracker">
        <strong>Render Tracker</strong>
        <div className="render-tracking-dot" style={{ top: `${randY}%`, left: `${randX}%` }}>
        </div>
    </div >
}



export function RenderTracker() {

    let randX = Math.floor(Math.random() * 100);
    let randY = Math.floor(Math.random() * 100);


    return <div className="render-tracker">
        <strong>Render Tracker</strong>
        <div className="render-tracking-dot" style={{ top: `${randY}%`, left: `${randX}%` }}>
        </div>
    </div >
}

export function StateChanger() {
    const { setValue } = useContext(MyContext);
    return <div className="state-changer">
        <strong>State Changer</strong>

        <button onClick={() => setValue(`${Math.random()}`)}>Change State</button>
        <RenderTracker />
    </div >
}

export function StateDisplayer() {
    const { value } = useContext(MyContext);
    return <div className="state-displayer">
        <strong>State Displayer</strong>
        <div>{value}</div>
        <RenderTracker />
    </div>
}

function SomeUnrelatedComponent() {
    return <div className="some-unrelated-component">
        <strong>Some unrelated component</strong>
        <RenderTracker />
    </div>
}
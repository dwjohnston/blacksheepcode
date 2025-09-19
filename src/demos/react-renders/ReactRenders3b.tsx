//@ts-nocheck

"use client"
import React, { PropsWithChildren, useContext, useState, useEffect} from "react";
import "./style.css";

const style1 = {
    renderCount: 0,
    props: [], 
    propsDotChildren: [],

    theChildren: [],
}

const style2 = {
    renderCount: 0,
    props: [], 
    propsDotChildren: [],
    theChildren: [],

}


const propsTrackers = [];



export function RenderTracker(props) {

    let randX = Math.floor(Math.random() * 100);
    let randY = Math.floor(Math.random() * 100);


    const [mountValue, setMountValue] = useState(0);
    useEffect(() => {
        setMountValue(Math.random())
        propsTrackers.push(() => {

        }); 
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



export function ChildrenStyleOne(props) {


    style1.renderCount++;
    style1.props.push(props);
    style1.propsDotChildren.push(props.children);


    style1.theChildren.push(<RenderTracker />)
    const [value, setValue] = React.useState(0)
    return <div className="some-parent-component">
        <strong>ChildrenStyleOne</strong>
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        {/* 👇 Here we declare the RenderTracker directly in the component */}
        <RenderTracker />
    </div >
}

export function ChildrenStyleTwo(props: React.PropsWithChildren) {

    style2.renderCount++;
    style2.props.push(props);
    style2.propsDotChildren.push(props.children);
    style2.theChildren.push(props.children)

    const [value, setValue] = React.useState(0)
    return <div className="some-parent-component">
        <strong>ChildrenStyleTwo</strong>
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        {/* 👇 Here, it is passed from the parent via the `children` prop */}
        {props.children}
    </div >
}


function Shell(props: PropsWithChildren) {
    const [value, setValue] = React.useState(0)

    return <div>
        <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        {props.children}
    </div>
}

export function ReactRenders3() {
        const [value, setValue] = React.useState(0)

    return <div className="render-tracker-demo">

      <button onClick={() => {
            setValue((prev) => prev + 1);;
        }}>Increase count: {value}</button>
        <button onClick ={() =>{
            console.log(style1,style2);

            const i = style1.renderCount - 2; 
            const j = style1.renderCount - 1; 
            console.log(style1.props[i] === style1.props[j])
            console.log(style1.propsDotChildren[i] === style1.propsDotChildren[j])
            console.log(style1.theChildren[i] === style1.theChildren[j])


            const x = style2.renderCount - 2; 
            const y = style2.renderCount - 1; 
            console.log(style2.props[x] === style2.props[y])
            console.log(style2.propsDotChildren[x] === style2.propsDotChildren[y])
            console.log(style2.theChildren[x] === style2.theChildren[y])
        }}>Print</button>
        <Shell>
        <ChildrenStyleOne />
        <ChildrenStyleTwo>
            <RenderTracker />
        </ChildrenStyleTwo>

        </Shell>
    </div >
}
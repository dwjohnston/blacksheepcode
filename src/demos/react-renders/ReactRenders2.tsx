"use client"
import React, { useContext } from "react";
import "./style.css";
import { RenderTracker } from "./common";

type MyContextType = {
    value: string;
    setValue: (value: string) => void;
    color: string;
    setColor: (color: string) => void;
}

const MyContext = React.createContext<MyContextType>({
    value: "foo",
    setValue: () => {
        throw new Error("setValue not implemented");
    },

    color: "red",
    setColor: () => {
        throw new Error("setColor not implemented");
    }

});


const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = React.useState("foo");
    const [color, setColor] = React.useState("red");
    const contextValue: MyContextType = { value, setValue, color, setColor };

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};


export function ReactRenders2() {
    const [value, setValue] = React.useState("foo");

    return <MyProvider>

        <button
            className="global-render-button"

            onClick={() => {
                setValue(`${Math.random()}`);
            }}> Render all</button>

        <div className="render-tracker-demo">

            <StateChanger />
            <StateDisplayer />
            <FooComponent />

            <SomeUnrelatedComponent />
            <SomeUnrelatedComponent />
            <SomeUnrelatedComponent />
        </div>
    </MyProvider >
}




function StateChanger() {
    const { setValue } = useContext(MyContext);
    return <div className="state-changer">
        <strong>State Changer</strong>

        <button onClick={() => setValue(`${Math.random()}`)}>Change state</button>
        <RenderTracker />
    </div >
}

function StateDisplayer() {
    const { value } = useContext(MyContext);
    return <div className="state-displayer">
        <strong>State Displayer</strong>
        <div>{value}</div>
        <RenderTracker />
    </div>
}

function FooComponent() {
    const { color, setColor } = useContext(MyContext);
    return <div className="foo-component">
        <strong>Foo Component</strong>
        <button onClick={() => {
            // This is Copilots suggestion lol
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            setColor(randomColor);
        }}>Randomize color</button>
        <div className="color-display" style={{ backgroundColor: color }}></div>
        <RenderTracker />
    </div>
}

function SomeUnrelatedComponent() {
    return <div className="some-unrelated-component">
        <strong>Some unrelated component</strong>
        <RenderTracker />
    </div>
}
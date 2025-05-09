"use client"
import React, { useContext } from "react";
import "./style.css";
import { RenderTracker } from "./common";

type MyContextType = {
    value: string;
    setValue: (value: string) => void;
}

const MyContext = React.createContext<MyContextType>({
    value: "foo",
    setValue: () => {
        throw new Error("setValue not implemented");
    }
});


const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = React.useState("foo");
    const contextValue: MyContextType = { value, setValue };
    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};


export function ReactRenders1() {
    const [value, setValue] = React.useState("foo");

    return <MyProvider>

        <button onClick={() => {
            setValue(`${Math.random()}`);
        }}
            className="global-render-button"
        > Cause a render of the whole application</button>

        <div className="render-tracker-demo">

            <StateChanger />
            <StateDisplayer />

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

        <button onClick={() => setValue(`${Math.random()}`)}>Change State</button>
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

function SomeUnrelatedComponent() {
    return <div className="some-unrelated-component">
        <strong>Some unrelated component</strong>
        <RenderTracker />
    </div>
}
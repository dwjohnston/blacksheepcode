"use client"
import { useState } from "react";

export function RequestRequiresValidation(props: {endpoint: "requires-validation" | "immutable"}) {


    const [data, setData] = useState("(not set)");


    return <div>
        <div>data: {data}</div>


        <button onClick={() => {
            fetch(`/demos/cache/${props.endpoint}`, {
                cache: "no-cache"
            }).then(v => v.json()).then((v) => {
                setData(v.data);
            })
        }}>
            Force Fresh Response
        </button>

        <button onClick={() => {
            fetch(`/demos/cache/${props.endpoint}`).then(v => v.json()).then((v) => {
                setData(v.data);
            })
        }}>
            Click me!
        </button>
    </div>
}
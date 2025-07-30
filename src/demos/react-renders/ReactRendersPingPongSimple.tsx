"use client"
import React, { useContext, useState } from "react";


export function PingPongElement(props: React.PropsWithChildren) {
    const [isLeft, setIsLeft] = useState(true);
    return <div >
        <button onClick={() => {
            setIsLeft((prev) => !prev);;
        }}>Click Me</button>
            <div className="ping-pong-left">{isLeft && props.children}</div>
            <div className="ping-pong-right">{!isLeft && props.children}</div>
    </div >
}

export function ReactRendersPingPong() {
    return <div className="ping-pong-demo">
        <PingPongElement>
            <div> The child element </div>
        </PingPongElement>
    </div>
}



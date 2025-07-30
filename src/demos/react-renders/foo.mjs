"use client";

import React, { useContext, useState } from "react";

export function PingPongElement(props) {
    const [isLeft, setIsLeft] = useState(true);
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: () => {
                    setIsLeft(prev => !prev);;
                } },
            "Click Me"
        ),
        React.createElement(
            "div",
            { className: "ping-pong-left" },
            isLeft && props.children
        ),
        React.createElement(
            "div",
            { className: "ping-pong-right" },
            !isLeft && props.children
        )
    );
}

export function ReactRendersPingPong() {
    return React.createElement(
        "div",
        { className: "ping-pong-demo" },
        React.createElement(
            PingPongElement,
            null,
            React.createElement(
                "div",
                null,
                " The child element "
            )
        )
    );
}


ReactDOM.render(document.getElementById("root"));

console.log(JSON.stringify(React.createElement(
        "div",
        { className: "ping-pong-demo" },
        React.createElement(
            PingPongElement,
            null,
            React.createElement(
                "div",
                null,
                " The child element "
            )
        )
    ), null, 2))
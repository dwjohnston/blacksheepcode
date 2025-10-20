"use client"

import './special-button.css';

type SpecialButtonProps = {
    onClick: () => void;
    state: "loading" | "error" | "success" | "pending";
};

export function SpecialButton(props: SpecialButtonProps) {
    return <button onClick={props.onClick} disabled={props.state === "loading"} className={`special-button ${props.state}`}>
        {props.state === "loading" && <span>Loading...</span>}
        {props.state === "error" && <span >Error!</span>}
        {props.state === "success" && <span >Success!</span>}
        {props.state === "pending" && <span>Click Me</span>}
    </button>
}
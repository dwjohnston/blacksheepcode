
"use client"

import './special-button.css';
import { useState } from 'react';

type SpecialButtonProps = {
    onClick: () => Promise<{ success: boolean }>;
};

export function SpecialButton2(props: SpecialButtonProps) {
    const [state, setState] = useState<"loading" | "error" | "success" | "pending">("pending");

    const handleClick = async () => {
        setState("loading");
        try {
            const result = await props.onClick();
            setState(result.success ? "success" : "error");
        } catch (error) {
            setState("error");
        }
    };

    return <button onClick={handleClick} disabled={state === "loading"} className={`special-button ${state}`}>
        {state === "loading" && <span>Loading...</span>}
        {state === "error" && <span>Error!</span>}
        {state === "success" && <span>Success!</span>}
        {state === "pending" && <span>Click Me</span>}
    </button>
}
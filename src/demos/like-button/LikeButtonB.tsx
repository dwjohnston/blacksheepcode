import { useState } from "react";

type LikeStates = "liked" | "not-liked";


type LikeButtonProps = {
    isLoading: true; 
    onClick: () => void; 
    state: LikeStates;

}


export function LikeButtonB(props: LikeButtonProps) {

    return <button 
    disabled={props.isLoading}
    onClick={props.onClick}
>
    {props.state === "liked" ? "Liked" : "Like"}
    </button>
} 
import { useState } from "react";
import { isNullOrUndefined } from "util";


type LikeStates = "liked" | "not-liked";

export type LikeButtonProps = {

    initialState: LikeStates;
    onClick: (state: LikeStates) => Promise<{ newState: LikeStates }>;

}

export function LikeButtonA(props: LikeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [likeState, setLikeState] = useState(props.initialState);

    return <button 
    disabled={isLoading}
    onClick={async () => {
        try {
            setIsLoading(true); 
            const result = await props.onClick(likeState);
            setLikeState(result.newState);
        }
        finally{
            setIsLoading(false);
        }

    }}>
        {likeState === "liked" ? "Liked" : "Like"}
    </button>
} 
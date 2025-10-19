"use client";
import { SpecialButton2 } from "./SpecialButton2";

export function EncapsulateStateDemo() {
    return <SpecialButton2 onClick={async () => {
        await new Promise((res) => setTimeout(res, 1000));
        return { success: true };
    }} />
}
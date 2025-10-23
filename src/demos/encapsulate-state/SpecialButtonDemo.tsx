"use client";
import { SpecialButton2 } from "@blacksheepcode/example-react-autocomplete";

export function SpecialButtonDemo() {
    return <SpecialButton2 onClick={async () => {
        await new Promise((res) => setTimeout(res, 1000));
        return { success: true };
    }} />
}
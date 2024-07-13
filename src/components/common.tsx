import Link from "next/link";
import React from "react";

export function Common() {
    return <div> 
        <Link href="/foo">Foo</Link>
        <Link href= "/bar">bar</Link>
    </div>
}
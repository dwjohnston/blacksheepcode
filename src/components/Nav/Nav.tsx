"use client";
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from "react";


const PATHS = {
    "/posts": "Blog",
    "/about": "About",
}

export function Nav() {

    const pathName = usePathname();

    return <nav>
        {Object.entries(PATHS).map((v) => {
            const [key, value] = v;
            return <a href={key} key={key} className={key === pathName ? "active" : "not-active"}>{value}</a>
        })}
    </nav>
}
"use client"
import Image from "next/image";
import dark from "../../assets/bsc_dark.webp";
import light from "../../assets/bsc_light.webp";

export function SheepImage(props: { mode?: "dark" | "light" }) {


    // If we have passed light/dark mode, then we force show that image without the className that will show/hide it
    if (props.mode === "dark") {
        return <div className={`sheep-image-wrapper force-dark`}>
            <Image src={dark} alt="A black sheep typing at a computer" />
        </div>
    }

    if (props.mode === "light") {
        return <div className={`sheep-image-wrapper force-light`}>
            <Image src={light} alt="A black sheep typing at a computer" />
        </div>
    }

    return <div className={`sheep-image-wrapper`}>
        <Image src={dark} className="dark" alt="A black sheep typing at a computer" />
        <Image src={light} className="light" alt="A black sheep typing at a computer"  />
    </div>
}
"use client"
import dark from "../../assets/bsc_dark.webp";
import light from "../../assets/bsc_light.webp";

export function SheepImage(props: { mode?: "dark" | "light" }) {


    // If we have passed light/dark mode, then we force show that image without the className that will show/hide it
    if (props.mode === "dark") {
        return <div className={`sheep-image-wrapper force-dark`}>
            <img src={dark.src} alt="A black sheep typing at a computer" />
        </div>
    }

    if (props.mode === "light") {
        return <div className={`sheep-image-wrapper force-light`}>
            <img src={light.src} alt="A black sheep typing at a computer" />
        </div>
    }

    return <div className={`sheep-image-wrapper`}>
        <img src={dark.src} className="dark" alt="A black sheep typing at a computer" />
        <img src={light.src} className="light" alt="A black sheep typing at a computer" />
    </div>
}
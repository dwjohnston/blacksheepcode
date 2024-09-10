"use client"
import dark from "../../assets/bsc_dark.webp";
import light from "../../assets/bsc_light.webp";

export function SheepImage() {
    return <div className="sheep-image-wrapper">
       <img src={dark.src} className="dark" alt="A black sheep typing at a computer" />
       <img src={light.src} className="light" alt="A black sheep typing at a computer" />
    </div>
}
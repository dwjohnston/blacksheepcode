import dark from "../../assets/bsc_dark.webp";
import light from "../../assets/bsc_light.webp";


import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export function SheepImage(props: { mode?: "dark" | "light" }) {

    const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" }) 


    let imageToUse = isDarkMode ? dark : light; 

    // Allow override via prop
    if(props.mode){
        if (props.mode === "dark") {
            imageToUse = dark; 
        }
        if (props.mode === "light") {
            imageToUse = light; 
        }
    }

    // Because SSR doesn't know what the preferred theme is 
    // We hide the image at first so you don't get the wrong one
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, [])

    return <div className="sheep-image-wrapper">
        {ready && <img src={imageToUse} alt="A black sheep typing at a computer" />}
    </div>
}
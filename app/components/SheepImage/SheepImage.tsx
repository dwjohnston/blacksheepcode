import dark from "../../assets/bsc-dark.webp";
import light from "../../assets/bsc-light.webp";


import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export function SheepImage() {

    const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" }) 

    // Because SSR doesn't know what the preferred theme is 
    // We hide the image at first so you don't get the wrong one
    const [ready, setReady] = useState(false); 

    useEffect(() => {
        setReady(true);
    }, [])

    return <div className="sheep-image-wrapper">
        {ready && <img src={isDarkMode ? dark : light} alt="A black sheep typing at a computer" />}
    </div>


}
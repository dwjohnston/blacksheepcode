import dark from "../../assets/bsc-dark.webp";
import light from "../../assets/bsc-light.webp";


import { useMediaQuery } from "react-responsive";

export function SheepImage() {

    const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" })

    return <div className="sheep-image-wrapper"><img src={isDarkMode ? dark : light} alt="A black sheep typing at a computer" /></div>


}
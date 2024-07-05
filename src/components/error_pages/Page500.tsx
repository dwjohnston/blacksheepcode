import { Link } from "@remix-run/react";
import image500 from "./500.png"; 

export function Page500() {
    return <div  className ="error-page"> 
        <h1>500 - Something went wrong</h1>
        <Link to="/">Home</Link>


        <img src ={image500} alt ="AI generated: a confused looking sheep"/>


        </div>   
}
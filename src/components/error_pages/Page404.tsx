import Link from "next/link";
import image404 from "./404.png";

export function Page404() {
    return <div className="error-page">
        <h1>404 - Page Not Found</h1>
        <Link href="/">Home</Link>
        <img src={image404.src} alt="AI generated: a confused looking sheep" />
    </div>
}
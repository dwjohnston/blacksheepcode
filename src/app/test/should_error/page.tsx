import { notFound } from "next/navigation";

export default function Page () {

    if(process.env.SHOW_TEST_PAGES !== "true") {
        notFound();
    }
    throw new Error ("I am a runtime error"); 

    return <div>CONTENT </div>
}
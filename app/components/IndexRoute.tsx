import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";


/**
 * The routes /posts, /test etc will otherwise throw a 500 error. 
 * 
 * 
 * @returns 
 */
export function IndexRoute(props: {folder: string}) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
    }, [navigate])
    return null;
}

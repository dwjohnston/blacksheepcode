import { DataFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";


export async function loader(args : DataFunctionArgs) {


    console.log(args);

    return args; 
}


export default () => {

    const data = useLoaderData();
    return <><div>
        {JSON.stringify(data, null,2)}

        <Outlet/>
    </div></>
}
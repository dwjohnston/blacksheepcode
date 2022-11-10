import React from "react";
import { Todo } from "./services/TodosService";


type Services = {
    fetchTodos: () => Promise<Array<Todo>>

}
const ServicesContext = React.createContext<Services>({

    fetchTodos: () => { // nb. It's important to make this a synchronous function - because RTL doesn't appear to have a wait to catch async errors
        throw new Error("Service not initialised");
    }
});

export const ServicesProvider = (props: React.PropsWithChildren<Services>) => {
    const { children, ...rest } = props;
    return <ServicesContext.Provider value={rest}>{children}</ServicesContext.Provider>
}


export const useServices = () => {
    return React.useContext(ServicesContext);
}
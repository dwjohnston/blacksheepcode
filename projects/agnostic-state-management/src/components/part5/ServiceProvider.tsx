import React from "react";
import { Todo } from "./TodoListComponent";


type Services = {

    fetchTodos: () => Promise<Array<Todo>>;
}
const ServicesContext = React.createContext<Services>({

    fetchTodos: async () => [] // This is the service that will be used if no services provider is used. 
    // Perhaps instead of returning empty objects, you want to throw errors instead. 
})

export const ServicesProvider = (props: React.PropsWithChildren<Services>) => {

    const { children, ...rest } = props;
    return <ServicesContext.Provider value={rest}>{children}</ServicesContext.Provider>
}


export const useServices = () => {
    return React.useContext(ServicesContext); 
}
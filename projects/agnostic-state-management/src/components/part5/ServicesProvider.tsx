import React from "react";
import { Todo } from "./services/TodosService";


type Services = {
    fetchTodos: () => Promise<Array<Todo>>

}

const UNINITIALISED_SERVICE = async () => {
    throw new Error("Service not initialised");
};

const ServicesContext = React.createContext<Services>({

    fetchTodos: undefined
});

export const ServicesProvider = (props: React.PropsWithChildren<Services>) => {
    const { children, ...rest } = props;
    return <ServicesContext.Provider value={rest}>{children}</ServicesContext.Provider>
}


export const useServices = () => {
    return React.useContext(ServicesContext);
}
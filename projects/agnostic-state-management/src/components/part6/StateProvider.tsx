import React, { useState } from "react";
import { Todo } from "./services/TodosService";


type ApplicationState = {
    todosState: [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>];
}
const ServicesContext = React.createContext<ApplicationState>({
    todosState: [[], () => {
        throw new Error("Application state not instantiated!");
    }]
});

export const ApplicationStateProvider = (props: React.PropsWithChildren<{
    initialTodos?: Array<Todo>;
}>) => {
    const { children, } = props;

    const todosState = useState([] as Array<Todo>);

    return <ServicesContext.Provider value={{
        todosState,
    }}>{children}</ServicesContext.Provider>
}


export const useApplicationState = () => {
    return React.useContext(ServicesContext);
}
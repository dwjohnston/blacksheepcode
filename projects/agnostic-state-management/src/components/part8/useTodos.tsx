import React, { ReactInstance, useState } from "react";
import { Todo } from "./services/TodosService";

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { useServices } from "./ServicesProvider";

type TodosHook = {
    todos: Array<Todo>;
    isLoading: boolean;

}
const TodosHookContext = React.createContext<TodosHook>({
    todos: [],
    isLoading: false,
});

export const GenericTodosHookContextProvider = (props: React.PropsWithChildren<TodosHook>) => {
    const { children, ...rest } = props;
    return <TodosHookContext.Provider value={rest}>{children}</TodosHookContext.Provider>
}

const queryClient = new QueryClient()


const RQInner = (props: React.PropsWithChildren<{}>) => {

    const { fetchTodos } = useServices();
    const query = useQuery(['todos'], fetchTodos)

    return <GenericTodosHookContextProvider todos={query.data || []} isLoading={query.isLoading}>
        {props.children}
    </GenericTodosHookContextProvider>

}

export const ReactQueryTodosContextProvider = (props: React.PropsWithChildren<{}>) => {


    return <QueryClientProvider client={queryClient}>
        <RQInner>
            {props.children}
        </RQInner>
    </QueryClientProvider>
}


export const useTodos = () => {
    return React.useContext(TodosHookContext);
}
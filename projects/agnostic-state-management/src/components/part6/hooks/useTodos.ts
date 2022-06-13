import { useEffect, useState } from "react";
import { useServices } from "../ServicesProvider";
import { useApplicationState } from "../StateProvider";

export function useTodos() {
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useApplicationState().todosState;
    const { fetchTodos } = useServices();

    useEffect(() => {
        setIsLoading(true);
        fetchTodos().then((data) => {
            setTodos(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [])


    return {
        isLoading,
        todos
    }
}
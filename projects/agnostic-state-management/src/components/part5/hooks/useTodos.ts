import { useEffect, useState } from "react";
import {  Todo } from "../services/TodosService";
import { useServices } from "../ServicesProvider";

export function useTodos() {
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([] as Todo[]);

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
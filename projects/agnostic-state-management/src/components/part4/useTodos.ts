import { useEffect, useState } from "react";
import { fetchAllTodos } from "./services/TodosService";
import { Todo } from "./TodoListComponent";

export function useTodos(): {
    todos: Array<Todo>; 
    isLoading: boolean; 
} {
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([] as Todo[]);

    useEffect(() => {

        setIsLoading(true);
        fetchAllTodos().then((todos) => {
            setTodos(todos); 
            
        }).finally(() => {
            setIsLoading(false); 
        })

    }, [])   


    return {
        isLoading, todos
    }
}
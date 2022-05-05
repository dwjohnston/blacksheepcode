import { useEffect, useState } from "react";
import { useServices } from "./ServiceProvider";
import { Todo } from "./TodoListComponent";

export function useTodos(): {
    todos: Array<Todo>; 
    isLoading: boolean; 
} {
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([] as Todo[]);

    const {fetchTodos} = useServices(); 

    useEffect(() => {

        setIsLoading(true);
        fetchTodos().then((todos) => {
            setTodos(todos); 
            
        }).finally(() => {
            setIsLoading(false); 
        })

    }, [])   



    return {
        isLoading, todos
    }
}
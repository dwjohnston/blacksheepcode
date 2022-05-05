import { useEffect, useState } from "react";
import { Todo } from "./TodoListComponent";

export function useTodos(): {
    todos: Array<Todo>; 
    isLoading: boolean; 
} {
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([] as Todo[]);

    useEffect(() => {

        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setTodos(json as Todo[]))
            .finally(() => {
                setIsLoading(false);
            })
    }, [])   


    return {
        isLoading, todos
    }
}
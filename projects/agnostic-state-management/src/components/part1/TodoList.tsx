
import React, { useEffect, useState } from 'react';

export type TodoListProps = {
};

type Todo = {
    userId: string;
    id: number;
    title: string;
    completed: boolean;
}

export const TodoList = () => {

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

    return (
        <div><ul>

            {isLoading && "Loading..."}
            {todos.map((v) => {
                return <li key={v.id}>
                    {v.title} <strong>Completed:</strong> {`${v.completed}`}
                </li>
            })}
        </ul>
        </div>
    );
};

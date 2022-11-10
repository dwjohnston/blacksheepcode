
import React, { useEffect, useState } from 'react';

export type TodoListProps = {
};

type Todo = {
    userId: string;
    id: number;
    title: string;
    completed: boolean;
}




export const TodoListPresentational = (props: {
    isLoading: boolean;
    todos: Array<Todo>;
}) => {


    const { isLoading, todos } = props;

    return (
        <div><ul>

            {isLoading && "Loading..."}
            {todos.map((v) => {
                return <li key={v.id}>
                    <span>{v.title}</span> <strong>Completed:</strong> {`${v.completed}`}
                </li>
            })}
        </ul>
        </div>
    );
};

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

    return <TodoListPresentational isLoading={isLoading} todos={todos} />
}

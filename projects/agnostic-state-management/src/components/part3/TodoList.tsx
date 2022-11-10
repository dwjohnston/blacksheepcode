
import React, { useEffect, useState } from 'react';
import { useServices } from './ServicesProvider';
import { Todo } from './services/TodosService';

export type TodoListProps = {
};



export const TodoList = () => {

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

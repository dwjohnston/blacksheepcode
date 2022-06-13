
import React, { useEffect, useState } from 'react';
import { fetchAllTodos } from './services/TodosService';

import { Todo } from './services/TodosService';

export type TodoListProps = {
};



export const TodoList = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([] as Todo[]);



    useEffect(() => {

        setIsLoading(true);
        fetchAllTodos().then((data) => {
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

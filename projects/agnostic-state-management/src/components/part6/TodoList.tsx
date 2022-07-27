
import React  from 'react';
import { useTodos } from './hooks/useTodos';

export type TodoListProps = {
};



export const TodoList = () => {

   const {
        isLoading,
        todos
    } = useTodos();

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

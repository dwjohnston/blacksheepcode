
import React, { useEffect, useState } from 'react';
import { useTodos } from './hooks/useTodos';
import {  Todo } from './services/TodosService';

export const StateHookedTodoList = () => {
    const {
        isLoading,
        todos
    } = useTodos();

    return <TodoList isLoading={isLoading} todos={todos} />
}

type TodoListProps = {
    todos: Array<Todo>;
    isLoading: boolean;
}

export const TodoList = (props: TodoListProps) => {

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

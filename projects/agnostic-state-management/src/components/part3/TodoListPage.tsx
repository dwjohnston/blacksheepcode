
import React, { useEffect, useState } from 'react';
import { Todo, TodoListComponent } from './TodoListComponent';
import { useTodos } from './useTodos';

export type TodoListPageProps = {
};



export const TodoListPage = (props: TodoListPageProps) => {
    const { } = props;

    const {isLoading, todos} = useTodos();


    return (
        <div>
            <TodoListComponent todos={todos} isLoading={isLoading} />
        </div>
    );
};

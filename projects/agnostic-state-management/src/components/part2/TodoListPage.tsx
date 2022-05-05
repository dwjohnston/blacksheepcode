
import React, { useEffect, useState } from 'react';
import { Todo, TodoListComponent } from './TodoListComponent';

export type TodoListPageProps = {
};



export const TodoListPage = (props: TodoListPageProps) => {
    const { } = props;

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
        <div>
            <TodoListComponent todos={todos} isLoading={isLoading} />
        </div>
    );
};

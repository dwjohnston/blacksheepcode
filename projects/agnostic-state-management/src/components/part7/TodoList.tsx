
import React  from 'react';
import { TodoListPresentational } from '../part1b/TodoList';
import { useTodos } from './hooks/useTodos';



export type TodoListProps = {
};



export const TodoList = () => {

   const {
        isLoading,
        todos
    } = useTodos();

    return (
        <TodoListPresentational isLoading={isLoading} todos={todos}/>
    ); 
};

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';
import {  GenericTodosHookContextProvider } from './useTodos';

describe(TodoList, () => {


    it("If there is no context, it throws an error", async () => {
        expect(() => render(<TodoList />)).toThrow();
    });

    it("Displays a list of todos", () => {


        render(
            <GenericTodosHookContextProvider
                todos={[{
                    userId: "1",
                    id: 99,
                    title: "foobar",
                    completed: false,
                }]}
                isLoading={false}
            >
                <TodoList />
            </GenericTodosHookContextProvider>);
        expect(screen.getByText("foobar")).toBeInTheDocument();

    });


    
});

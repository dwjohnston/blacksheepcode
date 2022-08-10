import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';
import { ServicesProvider } from './ServicesProvider';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
describe(TodoList, () => {


    it("If there is no context, it throws an error", async () => {
        expect(() => render(<TodoList />)).toThrow();
    });

    it("Displays a list of todos", async () => {

        const queryClient = new QueryClient()

        render(
            <QueryClientProvider client={queryClient}>
                <ServicesProvider fetchTodos={async () => ([
                    {
                        userId: "1",
                        id: 99,
                        title: "foobar",
                        completed: false,
                    }
                ])
                }>
                    <TodoList />
                </ServicesProvider >
            </QueryClientProvider >

        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            return expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });

        expect(screen.getByText("foobar")).toBeInTheDocument();

    });
});

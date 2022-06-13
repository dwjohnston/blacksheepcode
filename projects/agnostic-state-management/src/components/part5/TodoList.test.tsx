import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { StateHookedTodoList, TodoList } from './TodoList';
import { ServicesProvider } from './ServicesProvider';

describe(StateHookedTodoList, () => {

    it("If there is no context, it throws an error", () => {
        expect(() => render(<StateHookedTodoList />)).toThrow();
    });

    it("Displays a list of todos", async () => {

        render(
            <ServicesProvider fetchTodos={async () => ([
                {
                    userId: "1",
                    id: 99,
                    title: "foobar",
                    completed: false,
                }
            ])
            }>
                <StateHookedTodoList />
            </ServicesProvider >);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            return expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });
        expect(screen.getByText("foobar")).toBeInTheDocument();
    });
});


describe(TodoList, () => {

    it("if loading, it will still display todos", () => {
        render(<TodoList isLoading={true} todos={[
            {
                userId: "1",
                id: 99,
                title: "foobar",
                completed: false,
            }
        ]} />)

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(screen.getByText("foobar")).toBeInTheDocument();

    });
}); 
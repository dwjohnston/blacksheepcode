import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';

describe(TodoList, () => {
    it("Displays a list of todos", async () => {
        render(<TodoList />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            return expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });

        expect(screen.getByText("delectus aut autem")).toBeInTheDocument();

    });
});

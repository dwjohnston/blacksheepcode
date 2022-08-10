import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';
import { fetchAllTodos } from "./services/TodosService";
jest.mock("./services/TodosService");



describe(TodoList, () => {
    it("Displays a list of todos", async () => {


        //@ts-ignore
        fetchAllTodos.mockResolvedValue([
            {
                userId: "1",
                id: 99,
                title: "foobar",
                completed: false,
            }
        ]);

        render(<TodoList />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            return expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });

        expect(screen.getByText("foobar")).toBeInTheDocument();

    });
});

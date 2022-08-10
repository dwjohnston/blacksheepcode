import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TodoListPresentational } from './TodoList';

describe(TodoListPresentational, () => {
    it("Displays a list of todos", () => {
        render(
            <TodoListPresentational todos={[
                {
                    userId: "1",
                    id: 2,
                    title: "hello",
                    completed: false,
                }
            ]}
                isLoading={false}
            />);

        expect(screen.getByText("hello")).toBeInTheDocument();

    });
});

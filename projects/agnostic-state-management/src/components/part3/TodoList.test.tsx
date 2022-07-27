import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';
import { ServicesProvider } from './ServicesProvider';

describe(TodoList, () => {


    it("If there is no context, it throws an error", () => {
        expect(() => render(<TodoList />)).toThrow();
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
                <TodoList />
            </ServicesProvider >);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            return expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });

        expect(screen.getByText("foobar")).toBeInTheDocument();

    });
});


export const Header = (props) => {
    return <></>
}

describe(Header, () => {

    it("Has the page title", ()=> {
        render(<Header title ="Foo"/>); 

        expect(screen.getByText("Foo")).toBeInTheDocument(); 
    })
})
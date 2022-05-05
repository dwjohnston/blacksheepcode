export type TodoListProps = {

    todos: Array<Todo>; 
    isLoading: boolean; 
};

export type Todo = {
    userId: string;
    id: number;
    title: string;
    completed: boolean;
}

export const TodoListComponent = (props: TodoListProps) => {

    const {isLoading, todos} = props; 

    return (
        <div><ul>

            {isLoading && "Loading..."}
            {todos.map((v) => {
                return <li key={v.id}>
                    {v.title} <strong>Completed:</strong> {`${v.completed}`}
                </li>
            })}
        </ul>
        </div>
    );
};

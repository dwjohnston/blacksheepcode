//services/TodoService.ts

export type Todo = {
    userId: string;
    id: number;
    title: string;
    completed: boolean;
}

export async function fetchAllTodos(): Promise<Array<Todo>> {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const json = await res.json();

    // Validate that the response is of the right shape here

    return json as Array<Todo>;

}


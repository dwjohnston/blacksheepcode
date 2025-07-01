
"use client"
import React, { useEffect } from "react";


type Todo = {
    id: string; 
    description: string;
    projectGroupId: string;
}

type Group = {
    id: string;
    name: string;
    description: string;
}

type EnrichedTodo = Todo & {
    group: Group;
}

export function TodoList() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [todos, setTodos] = React.useState<EnrichedTodo[]>([]);


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("/demos/graphql-vs-rest/todos");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const todos = await response.json();

                const groupProms = todos.map((todo: any) => {
                    return fetch(`/demos/graphql-vs-rest/groups/${todo.projectGroupId}`)
                        .then(res => res.json())
                });

                const groups = await Promise.all(groupProms);
                const groupMap = groups.reduce((acc: any, group: any) => {
                    acc[group.id] = group;
                    return acc;
                }, {} as Record<string, Group>);

                const enrichedTodos = todos.map((todo: Todo) => {
                    return {
                        ...todo,
                        group: groupMap[todo.projectGroupId] || { id: todo.projectGroupId, name: "Unknown Group", description: "No description available" }
                    } as EnrichedTodo;
                });

                setTodos(enrichedTodos);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
                setError(error instanceof Error ? error.message : "An unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        if(!isLoading){
            fetchTodos();
        }
    }, [])


    if(isLoading) {
        return <div>Loading...</div>;
    }

    return        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Group Name</th>
                        <th>Group Description</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.group.name}</td>
                            <td>{todo.group.description}</td>
                        </tr>
                    ))}
                </tbody>    
            </table>
        </div>
    


}
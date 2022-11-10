import { ServicesProvider } from "./ServicesProvider"
import { fetchAllTodos } from "./services/TodosService"
import { TodoList } from "./TodoList"
import {  ReactQueryTodosContextProvider } from "./useTodos"

export const App = () => {
    return <ServicesProvider fetchTodos={fetchAllTodos}>
        <ReactQueryTodosContextProvider>
            <TodoList />
        </ReactQueryTodosContextProvider>
    </ServicesProvider>
}





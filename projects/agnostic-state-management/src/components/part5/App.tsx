import { ServicesProvider } from "./ServicesProvider"
import { fetchAllTodos } from "./services/TodosService"
import { StateHookedTodoList, TodoList } from "./TodoList"

export const App = () => {
    return <ServicesProvider fetchTodos={fetchAllTodos}>
        <StateHookedTodoList />
    </ServicesProvider>
}
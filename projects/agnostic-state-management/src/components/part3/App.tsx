import { ServicesProvider } from "./ServicesProvider"
import { fetchAllTodos } from "./services/TodosService"
import { TodoList } from "./TodoList"

export const App = () => {
    return <ServicesProvider fetchTodos={fetchAllTodos}>
        <TodoList />
    </ServicesProvider>
}
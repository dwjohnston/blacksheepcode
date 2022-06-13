import { ServicesProvider } from "./ServicesProvider"
import { fetchAllTodos } from "./services/TodosService"
import { TodoList } from "./TodoList"
import { ApplicationStateProvider } from "./StateProvider"

export const App = () => {
    return <ServicesProvider fetchTodos={fetchAllTodos}>
        <ApplicationStateProvider>
            <TodoList />
        </ApplicationStateProvider>
    </ServicesProvider>
}
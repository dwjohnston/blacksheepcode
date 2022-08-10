import { ServicesProvider } from "./ServicesProvider"
import { fetchAllTodos } from "./services/TodosService"
import { TodoList } from "./TodoList"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const App = () => {
    return <ServicesProvider fetchTodos={fetchAllTodos}>
        <QueryClientProvider client={queryClient}>
            <TodoList />
        </QueryClientProvider>
    </ServicesProvider>
}
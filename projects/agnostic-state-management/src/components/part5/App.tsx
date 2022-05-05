/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import React from 'react';
import { ServicesProvider } from './ServiceProvider';
import { TodoListPage } from './TodoListPage';
import { fetchAllTodos } from './services/TodosService';

export type AppProps = {
};



export const App = () => {


    return (
            <ServicesProvider fetchTodos={fetchAllTodos}>
                <TodoListPage />
            </ServicesProvider>

    );
};

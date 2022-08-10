import { useEffect, useState } from "react";
import { useServices } from "../ServicesProvider";
import { useApplicationState } from "../StateProvider";


import {
    useQuery,
  } from '@tanstack/react-query'

  export function useTodos() {
    const { fetchTodos } = useServices();
    const query = useQuery(['todos'], fetchTodos)

    return {
        todos: query.data || [], 
        isLoading: query.isLoading, 

    }


}
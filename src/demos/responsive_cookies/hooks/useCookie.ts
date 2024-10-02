"use client";
import { useState, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'


// Define the return type of the hook
type UseCookieReturn<T> = [
  T | null, // Value of the cookie
  (newValue: T, options?: typeof Cookies.attributes) => void, // Function to update the cookie
  () => void // Function to delete the cookie
]


export default function useCookie<T>(name: string, defaultValue: T): UseCookieReturn<T> {
  const [value, setValue] = useState<T | null>(defaultValue)

  useEffect(() => {
    const cookie = Cookies.get(name)
    if (cookie) {
      try {
        // Attempt to parse JSON if the cookie is a stringified object
        setValue(JSON.parse(cookie) as T)
      } catch (e) {
        console.log(e)
        // If parsing fails, return the raw cookie string
        setValue(cookie as T)
      }


      
    }else {
    // If no cookie exists, set and return the default value
    Cookies.set(name, JSON.stringify(defaultValue))
    setValue(defaultValue)
    }

  }, [name, defaultValue])


  const updateCookie = useCallback(
    (newValue: T, options?: typeof Cookies.attributes) => {
      // Stringify the value before storing it
      Cookies.set(name, JSON.stringify(newValue), options)
      setValue(newValue)
    },
    [name]
  )


  const deleteCookie = useCallback(() => {
    Cookies.remove(name)
    setValue(null)
  }, [name])


  return [value, updateCookie, deleteCookie]
}
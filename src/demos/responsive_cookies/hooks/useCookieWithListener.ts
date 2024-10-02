"use client";
import { useState, useCallback, useEffect } from "react";

// Define the return type of the hook
type UseCookieReturn<T> = [
  T | null, // Value of the cookie
  (newValue: T, options?: unknown) => void, // Function to update the cookie
  () => void // Function to delete the cookie
];

export default function useCookieWithListener<T>(
  name: string,
  defaultValue: T
): UseCookieReturn<T> {

  // For first render, we use the default value
  // This for SSR purposes - SSR will not have cookies and we don't want a hydration error
  // Of course this gives you a flash of the default value
  // It will be up to you to handle this - perhaps you want to display nothing until the cookie is loaded
  const [value, setValue] = useState<T | null>(defaultValue);

  useEffect(() => {

    // The initial value of the cookie on the client, if it exists 
    cookieStore.get(name).then((cookie) => {
      if (cookie) {
        try {
          setValue(JSON.parse(cookie.value));
        } catch (err) {
          setValue(cookie.value);
        }
      }
    });



    // Any subsequent changes to the cookie will be listened to
    // and set into state
    const eventListener = (event) => {

      console.log(event)
      const foundCookie = event.changed.find((cookie) => cookie.name === name);
      if (foundCookie) {
        try {
          setValue(JSON.parse(foundCookie.value));
        } catch (err) {
          setValue(foundCookie.value);
        }

        return; 
      }

      const deletedCookie = event.deleted.find((cookie) => cookie.name === name);
      if(deletedCookie) {
        setValue(null);
      }
    };
    cookieStore.addEventListener("change", eventListener);

    return () => {
      cookieStore.removeEventListener("change", eventListener);
    };
  }, [name]);


  // For updates to the cookie we just update the cookie store directly,
  // And allow the event listener to update the state
  const updateCookie = useCallback(
    (newValue: T, options?: unknown) => {
      cookieStore.set(name, JSON.stringify(newValue), options);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    cookieStore.remove(name);
  }, [name]);

  return [value, updateCookie, deleteCookie];
}

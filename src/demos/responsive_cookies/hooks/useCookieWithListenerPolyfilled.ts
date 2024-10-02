//@ts-nocheck
"use client";
import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie"
// Define the return type of the hook
type UseCookieReturn<T> = [
  T | null, // Value of the cookie
  (newValue: T, options?: unknown) => void, // Function to update the cookie
  () => void // Function to delete the cookie
];


// Polyfilled cookieStore wrappers. 
async function getCookie(cookieName: string) : Promise<string | null> {
  if("cookieStore" in window) {
    return (await cookieStore.get(cookieName))?.value ?? null;
  } 

  return Cookies.get(cookieName) ?? null;
}

async function setCookie(cookieName: string, value: string, options?: unknown) : Promise<void> {
  if("cookieStore" in window) {
    return cookieStore.set(cookieName, value, options);
  } 

  Cookies.set(cookieName, value, options as CookieAttributes);
}

async function deleteCookie(cookie: string) : Promise<void> {
  if("cookieStore" in window) {
    return cookieStore.delete(cookie);
  } 

  Cookies.remove(cookie);
}

export function listenForCookieChange(cookieName: string, onChange: (newValue: string | null) => void) : (() => void) {

  // If the cookieStore is available, we can can use the change event listener
  if("cookieStore" in window) {
    const changeListener = (event) => {
      const foundCookie = event.changed.find((cookie) => cookie.name === cookieName);
      if (foundCookie) {
        onChange(foundCookie.value);
        return
      }

      const deletedCookie = event.deleted.find((cookie) => cookie.name === cookieName);
      if(deletedCookie) {
        onChange(null);
      }
    };

    cookieStore.addEventListener("change", changeListener);

    // We return a clean up function for the effect
    return () => {
      cookieStore.removeEventListener("change", changeListener);
    };
  }

  // If cookieStore is not available, we poll for changes. 
  const interval = setInterval(() => {
    const cookie = Cookies.get(cookieName);
    if(cookie) {
      onChange(cookie);
    } else {
      onChange(null);
    }
  }, 1000);

  // We still return a clean up function for the effect
  return () => {
    clearInterval(interval);
  }
}

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
    getCookie(name).then((cookie) => {
      if (cookie) {
        console.log(cookie, typeof cookie)
        
        try {
          setValue(JSON.parse(cookie));
        } catch (err) {
          setValue(cookie as T);
        }
      }
    });

    // Any subsequent changes to the cookie will be listened to
    // and set into state
    return listenForCookieChange(name, (newValue) => {  
      try {
        setValue(newValue? JSON.parse(newValue) : null);
      } catch (err) {
        setValue(newValue as T);
      }
    });
  }, [name]);

  // For updates to the cookie we just update the cookie store directly,
  // And allow the event listener to update the state
  const updateCookie = useCallback(
    (newValue: T, options?: unknown) => {
      setCookie(name, JSON.stringify(newValue), options);
    },
    [name]
  );

  const _deleteCookie = useCallback(() => {
    deleteCookie(name);
  }, [name]);

  return [value, updateCookie, _deleteCookie];
}

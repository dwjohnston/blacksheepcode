"use client";
import React from 'react'
import useCookieWithListenerPolyFilled from '../hooks/useCookieWithListenerPolyfilled'

import {hri} from "human-readable-ids"


interface User {
  name: string
  age: number
}


const defaultUser: User = { name: 'John Doe', age: 30 }


export function UserProfile2() {
  const [user, setUser, deleteUser] = useCookieWithListenerPolyFilled<User>('user-2', defaultUser)
  const [serverCookie] = useCookieWithListenerPolyFilled<string>('server-cookie', "default-value-for-server-cookie")

  const handleUpdateUser = () => {
    setUser({ name:hri.random() , age: 25 }, { expires: 7 })
  }

  const handleDeleteUser = () => {
    deleteUser()
  }

  return (
    <div>
      <p>Name: {user?.name}</p>
      <p>Age: {user?.age}</p>
      <p>Server cookie: {serverCookie}</p>
      <button onClick={handleUpdateUser}>Update User</button>
      <button onClick={handleDeleteUser}>Delete User</button>

      <button onClick={() => {
        fetch('/demos/responsive-cookies/req1').then(v => v.json()).then(v => console.log(v))
      }}>Server Fetch</button>
    </div>
  )
}


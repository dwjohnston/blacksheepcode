import { cookies } from 'next/headers'
import { User, UserProfile3 } from './UserProfile3';


export type UserProfileRscProps = {
  
}

const defaultUser: User = { name: 'John Doe', age: 30 }

export async function UserProfileRsc(props: UserProfileRscProps) {
  const cookieStore = await cookies();

  const user = cookieStore.get("user-2"); 
  const serverCookie = cookieStore.get("server-cookie"); 

  return (
    <UserProfile3 initialUser={user ? JSON.parse(user?.value) : defaultUser} initialServerCookie={serverCookie?.value ??  "default-value-for-server-cookie"} />
  )
} 
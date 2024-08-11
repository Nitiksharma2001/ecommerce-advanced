import type { LoginType } from '../types/users'

export async function signin(username: string, password: string) {
  if (!username || !password) return

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/user/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  )
  if(response.status === 200){
    const user: LoginType = await response.json()
    return user
  }
}

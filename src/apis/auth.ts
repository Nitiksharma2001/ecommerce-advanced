import { LoginType } from '../types/users'

export const signin = async (username: string, password: string) => {
  if (!username || !password) return

  const user: LoginType = await (
    await fetch(import.meta.env.VITE_BACKEND_URL + '/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
  ).json()
  return user
}

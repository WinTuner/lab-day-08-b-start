"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Mock credentials ตามโจทย์หน้า Home: admin@cmu.ac.th / 1234
// session cookie เก็บค่า SESSION_SECRET จาก env (ไม่ hardcode ความลับในโค้ด)
export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (email === 'admin@cmu.ac.th' && password === '1234') {
    const cookieStore = await cookies()
    cookieStore.set('session', process.env.SESSION_SECRET ?? 'dev-session', {
      httpOnly: true,
      path: '/',
    })
    redirect('/dashboard')
  }

  return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
}

"use client"

import { useActionState } from 'react'
import { login } from './actions'

const initialState = { error: '' }

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>
      <p className="text-sm text-gray-500 mb-4">ทดสอบ: admin@cmu.ac.th / 1234</p>
      <form action={formAction} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm mb-1">อีเมล</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue="admin@cmu.ac.th"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-1">รหัสผ่าน</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {isPending ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  )
}

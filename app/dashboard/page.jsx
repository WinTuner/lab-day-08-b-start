import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getTasks } from '@/lib/taskStore'

// Server Component ล้วน — ไม่มี "use client"
// ข้อความลับ render ที่ server แล้วส่งเป็น HTML เท่านั้น ไม่ปนใน JS bundle
export default async function DashboardPage() {
  // กันซ้ำชั้นที่ 2 (ชั้นที่ 1 คือ middleware.js) — เข้าตรงโดยเลี่ยง middleware ก็ยังโดนดีด
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) {
    redirect('/login')
  }

  const tasks = getTasks()
  const SECRET_REVENUE = 'ยอดขายทั้งปีนี้: 12,400,000 บาท (ห้ามพนักงานทั่วไปเห็น)'

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="p-4 border rounded bg-yellow-50 mb-6">{SECRET_REVENUE}</div>

      <h2 className="font-bold mb-2">งานทั้งหมด ({tasks.length})</h2>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between border-b pb-2">
            <span className={t.done ? 'line-through text-gray-400' : ''}>{t.title}</span>
            <span className="text-xs text-gray-400">{t.done ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

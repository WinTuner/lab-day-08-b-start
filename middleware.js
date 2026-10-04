import { NextResponse } from 'next/server'

// Auth guard ฝั่ง server — รันก่อนตอบ request ใด ๆ ที่ตรง matcher
// ไม่มี cookie `session` → redirect ไป /login ก่อนไฟล์ของ /dashboard จะถูกส่งเลย
export function middleware(request) {
  const session = request.cookies.get('session')?.value
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

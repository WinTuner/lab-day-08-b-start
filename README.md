# `lab-day-08-b-start` — โปรเจกต์ตั้งต้นของ **Lab B** วันที่ 8

โปรเจกต์ใหม่สำหรับ **Lab B — Auth Middleware + ความลับต้องอยู่ฝั่ง server** (🎯 มินิแอป #5) · ⏱ **Lab B 14:00–14:50 · Explain-Back 14:50–15:00**
**ทุกกลุ่มเริ่ม Lab B จากโปรเจกต์นี้** — ไม่ต่อจากโปรเจกต์ Lab A และไม่ก๊อปอะไรทับ · Lab A ทำจบหรือไม่ไม่มีผลกับ Lab B

> 🔀 Lab A อยู่ในโปรเจกต์ `lab-day-08-start` (commit + push ไว้ตอน 13:55) · โปรเจกต์นี้คือ**ที่ที่เขียน Lab B แล้ว push ขึ้น GitHub repo ใหม่** · **ไม่ต้อง deploy** (ฝึกไปแล้วตอนเช้า)
> 💡 แตก zip + `npm install` ไว้ตั้งแต่พักเที่ยง จะได้เริ่มทันที 14:00
> = `lab-day-08-start` ทุกไฟล์ — `app/tasks/*` และ `lib/taskStore.js` ยังเป็น TODO ของ Lab A **ไม่ต้องทำซ้ำ** (`/dashboard` ใช้แค่ `getTasks()` ที่มีให้แล้ว)
> 🔓 AI ใช้ได้ตามกติกาปกติ — อธิบายทุกบรรทัดได้เมื่อ TA ถาม · ⚠️ AI รุ่นเก่ามักลืม `await cookies()` (Next.js 15)

---

## เริ่มยังไง

```bash
npm install
cp .env.local.example .env.local     # แล้วแก้ค่าเอง — .env.local ไม่เข้า git
npm run dev
```

| ปัญหา | ทางแก้ |
|---|---|
| หัวเว็บขึ้น `(ยังไม่ตั้ง NEXT_PUBLIC_SITE_NAME)` | ยังไม่มี `.env.local` หรือแก้แล้วยังไม่ restart dev server · บน `npm start` = ค่า `NEXT_PUBLIC_` ถูกฝังตอน build ต้อง `npm run build` ใหม่ |
| เพิ่มงานแล้ว restart dev server งานหาย | ปกติ — `lib/taskStore.js` เก็บในหน่วยความจำ ไม่ใช่ database |
| `/login` ขึ้นแค่ TODO | งาน Lab B ขั้น A |
| `/dashboard` เข้าได้ทั้งที่ไม่ล็อกอิน | ใช่ — นี่คือเวอร์ชันไม่ปลอดภัยของเช้านี้ งาน Lab B ขั้น B |

## ไฟล์ที่ต้องเขียน

```
app/
├── login/
│   ├── page.jsx            ← ขั้น A ฟอร์ม login
│   └── actions.js          ← ขั้น A (login + logout)
├── dashboard/
│   ├── page.jsx            ← รื้อเป็น Server Component
│   └── DashboardPanel.jsx  ← ลบทิ้งทั้งไฟล์ (ขั้น D — ข้อความลับต้องหายจาก JS)
├── tasks/                  ✗ งาน Lab A — ไม่ต้องแตะ
└── layout.jsx              ✓ อ่าน cookie ส่งให้ AuthContext (ไม่ต้องแก้)
components/Nav.jsx          ← ปุ่ม "ออกจากระบบ"
middleware.js               ← ขั้น B สร้างเองที่ราก project (นอก app/)
README.md                   ← หลักฐาน Twist (ภาพ DevTools + คำอธิบาย) เขียนต่อท้ายไฟล์นี้
```

> ⚠️ อย่าลบ `await cookies()` ใน `app/layout.jsx` — มันทำให้ทุกหน้าเป็น dynamic (`ƒ`)

---

# โจทย์ (สำเนาส่วน Lab B จาก `labs/day-08.md`)

## Lab B (50 น. · 14:00–14:50) — Auth Middleware + ความลับต้องอยู่ฝั่ง server

**Starter: `lab-day-08-b-start` — โปรเจกต์ใหม่ ทุกกลุ่มเริ่มจากจุดเดียวกัน** (ไม่ใช่ต่อจากโปรเจกต์ Lab A — ทำ Lab A จบหรือไม่ไม่มีผลกับ Lab B) · สร้าง GitHub repo ใหม่ให้โปรเจกต์นี้แล้ว commit + push ก่อน 14:50 (TA ตรวจจาก repo นี้ · **ไม่ต้อง deploy**) · `app/tasks/` ในโปรเจกต์นี้ยังเป็น TODO ของ Lab A ตามเดิม **ไม่ต้องทำซ้ำ** (`/dashboard` ใช้แค่ `getTasks()` ที่มีให้แล้ว) · ⚠️ **ต่างจากตอนเช้า:** `app/login/page.jsx` และ `app/login/actions.js` เป็น **TODO เปล่า** (ตอนเช้าอาจารย์มีให้ครบ) และปุ่ม "ออกจากระบบ" ใน `components/Nav.jsx` ยังเป็น TODO — ทั้ง 3 จุดเป็นงานขั้น A · ยังไม่มี `middleware.js` (ขั้น B)

**Context:** เวอร์ชันเช้านี้ของ `/dashboard` เช็ก auth ที่ Client Component (`if (!user) return null`) — พิสูจน์ไปแล้วตอนเช้าว่าโค้ดและข้อมูลลับทั้งหมดหลุดไปอยู่ใน JS bundle ตั้งแต่ก่อนเช็กเงื่อนไขด้วยซ้ำ บ่ายนี้ให้รื้อของเดิมทิ้ง แล้วสร้างระบบล็อกอินจริง + `middleware.js` ที่เช็กที่ **server ก่อน**ตอบ request ใด ๆ กลับไปเลย

| ขั้น | เวลา | ทำอะไร |
|---|:--:|---|
| **A. Mock login + cookie** | 10 น. | เขียนฟอร์ม `/login` + Server Action `login(prevState, formData)` ที่เทียบ email/password กับค่า mock แล้ว `(await cookies()).set('session', ..., { httpOnly: true, path: '/' })` ถ้าถูกต้อง (Next.js 15: `cookies()` เป็น async ต้อง `await`) |
| **B. `middleware.js`** | 15 น. | สร้างที่ราก project นอก `app/` — เช็ก cookie `session` ก่อนปล่อยเข้า `/dashboard` ไม่มี → `NextResponse.redirect(new URL('/login', request.url))` มี → `NextResponse.next()` ตั้ง `matcher: ['/dashboard/:path*']` |
| **C. พิสูจน์ว่าไม่รั่ว** | 10 น. | Log out → เปิด DevTools **Sources**/**Network** → พิมพ์ `/dashboard` ตรง ๆ ใน address bar → ต้องเห็น **redirect ก่อน**ไฟล์ของหน้า dashboard จะถูกโหลดเลย (เทียบกับตอนเช้าที่โหลดมาเต็ม ๆ ทั้งที่ log out) — แคปหน้าจอทั้ง 2 เวอร์ชันเก็บไว้ |
| **D. ความลับไม่หลุดไป client** | 15 น. | รื้อ `/dashboard` เป็น **Server Component** (ไม่มี `"use client"`) ที่อ่าน `getTasks()` ฝั่ง server → **ลบ `DashboardPanel.jsx` ทิ้งทั้งไฟล์** → ตั้ง `SESSION_SECRET` (ไม่มี prefix) และ `NEXT_PUBLIC_SITE_NAME` (มี prefix) ใน `.env.local` ไม่ hardcode → `npm run build && npm start` → DevTools **Sources** กด Ctrl+Shift+F ค้น `ยอดขายทั้งปี` ต้อง**ไม่เจอ**ในไฟล์ JS ใด ๆ (ก่อนรื้อ ลองค้นดูก่อน — จะเจอใน `page-*.js`) |

---

### Twist

1. 🔴 **(ทดสอบในโปรเจกต์ Lab A) ปิด JavaScript ในเบราว์เซอร์แล้วฟอร์มเพิ่ม/ลบ/mark-done ต้องยังทำงานได้ทั้ง 3 อย่าง** (progressive enhancement) — เปิด DevTools → Settings → Debugger → Disable JavaScript แล้วทดสอบทีละปุ่ม หน้าจะ reload เต็มหน้าแทนที่จะ smooth แต่ mutation ต้องสำเร็จทุกครั้ง
2. 🔴 **ต้องพิสูจน์ด้วยภาพว่าคนไม่ล็อกอินเข้าหน้า protected ไม่ได้ ทั้งจาก UI และจาก direct URL** — แคป (ก) กดลิงก์ไปหน้า dashboard ตอน log out แล้วโดนเด้ง (ข) พิมพ์ URL `/dashboard` ตรง ๆ ใน address bar ตอน log out แล้วโดนเด้งเหมือนกัน พร้อม Network tab ที่เห็น status `307` **ก่อน**มีไฟล์ของหน้า dashboard โหลดเข้ามา
3. 🔴 **ใส่ middleware แล้วยังไม่พอ — ข้อความลับต้องหายไปจาก JS ที่ส่งให้เบราว์เซอร์** — middleware กันแค่ request ที่ไป `/dashboard` แต่ไฟล์ JS ของ Client Component อยู่ที่ `/_next/static/...` ซึ่ง `matcher` ไม่ครอบ ใครรู้ URL ก็โหลดได้โดยไม่ต้องล็อกอิน · ทดสอบบน **production build** (`npm run build && npm start`) ไม่ใช่ `npm run dev` เพราะ dev ไม่ได้ bundle แบบเดียวกับที่ผู้ใช้จริงได้รับ
4. 🔴 **ห้าม hardcode ความลับ (เช่น session secret) ลงในโค้ดที่ commit เข้า git** — ต้องอยู่ใน `.env.local` (gitignore อัตโนมัติ) เท่านั้น — TA เปิด repo ค้นต้องไม่เจอค่าจริง (`.env.local.example` ใส่ได้แค่ค่าตัวอย่าง)

---

**Lab B — คุณภาพ (40% ของคะแนนวันนี้)**
- middleware auth guard บล็อกกรณีไม่ล็อกอินได้จริง — 40%
- อธิบายได้ว่าทำไม server-side guard ปลอดภัยกว่า client-side guard เดิม — 30%
- ความลับไม่หลุดไปฝั่ง client: `/dashboard` เป็น Server Component · `DashboardPanel.jsx` ถูกลบ (ค้น `ยอดขายทั้งปี` ใน DevTools บน production build ต้องไม่เจอ) · secret อยู่ใน `.env.local` ไม่ hardcode — 30%

---

## หลักฐาน Twist (Lab B — ทำบน production build `npm run build && npm start`)

### Twist 2 — คนไม่ล็อกอินเข้า `/dashboard` ไม่ได้ (UI + direct URL)
- **(ก) กดลิงก์ตอน log out:** เปิด `/` ตอนไม่มี cookie `session` → กดลิงก์ Dashboard → โดน redirect ไป `/login`
- **(ข) พิมพ์ URL ตรง:** Log out แล้วพิมพ์ `http://localhost:3000/dashboard` ใน address bar → โดน redirect ไป `/login` เหมือนกัน
- **Network tab:** request แรก `GET /dashboard` ตอบ `307 Temporary Redirect` (`Location: /login`) **ก่อน**มีไฟล์ของหน้า dashboard โหลด (เทียบกับเวอร์ชันเช้าที่โหลด `page-*.js` มาเต็ม ๆ ทั้งที่ log out)
- **ยืนยันด้วย curl (production server):**
  ```
  $ curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://localhost:3108/dashboard
  307 -> http://localhost:3108/login            # ไม่มี cookie → โดนดีดก่อน
  $ curl -s -o /dev/null -w "%{http_code}\n" -b "session=$SESSION_SECRET" http://localhost:3108/dashboard
  200                                           # มี cookie → เข้าดูได้
  ```
- ![Twist-2a: กดลิงก์ Dashboard ตอน log out แล้วโดนเด้ง + Network เห็น 307](docs/twist-2a-link-redirect.png)
- ![Twist-2b: พิมพ์ /dashboard ตรง ๆ ตอน log out แล้วโดนเด้ง + Network เห็น 307](docs/twist-2b-direct-url-redirect.png)
- อธิบาย: `middleware.js` (`matcher: ['/dashboard/:path*']`) เช็ก `request.cookies.get('session')` ที่ **server ก่อน**ตอบ request ใด ๆ — เบราว์เซอร์ยังไม่ทันได้ไฟล์หน้า dashboard เลย ต่างจากของเดิมที่เช็ก `if (!user) return null` ใน Client Component ซึ่งไฟล์ JS + ข้อความลับโหลดมาครบแล้วค่อยซ่อน

### Twist 3 — ข้อความลับหายจาก JS ที่ส่งให้เบราว์เซอร์
- `/dashboard` ถูกรื้อเป็น **Server Component ล้วน** (ไม่มี `"use client"`) — `DashboardPanel.jsx` **ลบทั้งไฟล์**
- ข้อความลับ `ยอดขายทั้งปีนี้: 12,400,000 บาท` render ที่ server เป็น HTML เท่านั้น
- **ยืนยันบน production build:**
  ```
  $ npm run build && npm start
  $ rg -l "ยอดขายทั้งปี" .next/static        # → ไม่เจอ (client JS สะอาด)
  $ rg -l "ยอดขายทั้งปี" .next/server         # → .next/server/app/dashboard/page.js (อยู่ฝั่ง server เท่านั้น)
  ```
- DevTools → Sources → Ctrl+Shift+F ค้น `ยอดขายทั้งปี` → **ไม่เจอในไฟล์ JS ใด ๆ** (ก่อนรื้อจะเจอใน `page-*.js`)
- ![Twist-3: ค้น "ยอดขายทั้งปี" ใน DevTools Sources บน production build แล้วไม่เจอ](docs/twist-3-no-secret-in-js.png)

### Twist 4 — ความลับไม่ hardcode อยู่ใน `.env.local` เท่านั้น
- `SESSION_SECRET` (ไม่มี prefix → อ่านได้เฉพาะ server) และ `NEXT_PUBLIC_SITE_NAME` (มี prefix → ฝังลง client ได้) อยู่ใน `.env.local` ซึ่งถูก gitignore (`git check-ignore .env.local` ผ่าน)
- โค้ดอ่านผ่าน `process.env.SESSION_SECRET` ใน `app/login/actions.js` เท่านั้น — ค้นค่าจริงใน `app/ components/ context/ lib/ middleware.js` **ไม่เจอ**
- `.env.local.example` มีแค่ค่าตัวอย่าง (`super-secret-value-change-me`) ไม่มีค่าจริง

### Twist 1 — หมายเหตุ (ทดสอบในโปรเจกต์ Lab A)
- Twist ข้อ 1 (ปิด JavaScript แล้วฟอร์มเพิ่ม/ลบ/mark-done ยังทำงาน = progressive enhancement) ต้องทดสอบในโปรเจกต์ `lab-day-08-start` (Lab A) ไม่ใช่โปรเจกต์นี้ — โปรเจกต์นี้ `app/tasks/*` ยังเป็น TODO ของ Lab A ตามโจทย์ **ไม่ต้องทำซ้ำ**

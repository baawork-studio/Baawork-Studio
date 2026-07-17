# Baawork Studio

เว็บไซต์แสดงผลงานของ Baawork Studio พัฒนาด้วย Next.js App Router, React และ Material UI

## ความต้องการของระบบ

- Node.js 24 ขึ้นไป
- npm 11 ขึ้นไป

## เริ่มใช้งาน

```bash
npm install
cp .env.example .env.local
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Environment variables (optional)

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```

เว็บไซต์เป็น static landing page โดยข้อมูลผลงานอยู่ใน `src/data/fallbackProjects.ts` จึงไม่ต้องใช้ API, ฐานข้อมูล หรือ service backend

## ตรวจสอบก่อน deploy

```bash
npm run typecheck
npm run build
```

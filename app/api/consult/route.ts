import { NextResponse } from 'next/server';

const recipient = process.env.CONTACT_EMAIL ?? 'baawork.studio@gmail.com';
const sender = process.env.EMAIL_FROM ?? 'Baawork Studio <onboarding@resend.dev>';

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'ระบบส่งอีเมลยังไม่ได้ตั้งค่า' }, { status: 503 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง' }, { status: 400 });
  }

  const name = text(payload.name);
  const email = text(payload.email);
  const phone = text(payload.phone) || '-';
  const company = text(payload.company) || '-';
  const message = text(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'กรุณากรอกชื่อ อีเมล และรายละเอียดให้ครบถ้วน' }, { status: 400 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: `ปรึกษาโปรเจกต์จาก ${name}`,
      text: [`ชื่อ: ${name}`, `อีเมล: ${email}`, `โทรศัพท์: ${phone}`, `บริษัท: ${company}`, '', 'รายละเอียด:', message].join('\n'),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

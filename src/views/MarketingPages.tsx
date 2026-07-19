'use client';

import type { FormEvent } from 'react';
import { Box, Typography } from '@mui/material';
import { DetailStylePage, DetailStyleSection } from '../components/DetailStylePage';
import { Stack } from '../components/Stack';
import { palette, typeScale } from '../theme';

const services = [
  ['Web Application', 'ออกแบบระบบสำหรับลูกค้า ทีมงาน และผู้ดูแลให้ทำงานร่วมกันได้จริง'],
  ['UX/UI Design', 'วางโครงสร้างข้อมูลและหน้าจอให้เข้าใจง่าย ใช้งานสะดวก'],
  ['Dashboard & Admin', 'จัดการข้อมูล สถานะงาน และสิทธิ์ผู้ใช้งานจากจุดเดียว'],
  ['API & Production', 'เชื่อมต่อข้อมูล วางโครงสร้าง และเตรียมระบบพร้อมใช้งาน'],
];

const projectSteps = [
  ['01', 'คุยโจทย์', 'ทำความเข้าใจเป้าหมาย ผู้ใช้งาน และปัญหาที่ต้องแก้'],
  ['02', 'วางขอบเขต', 'สรุป flow ฟีเจอร์ และสิ่งส่งมอบให้เห็นภาพเดียวกัน'],
  ['03', 'ออกแบบ UX/UI', 'เรียงลำดับข้อมูลและประสบการณ์ใช้งานก่อนพัฒนา'],
  ['04', 'พัฒนาและเชื่อมต่อ', 'สร้างระบบ หน้าจอ API และฐานข้อมูลตามขอบเขต'],
  ['05', 'ทดสอบและส่งมอบ', 'ตรวจสอบการใช้งานจริง พร้อมแนวทางดูแลระบบต่อ'],
];

const consultationEmail = process.env.NEXT_PUBLIC_CONSULT_EMAIL ?? 'baaworkstudio@gmail.com';

const sectionTitleSx = { ...typeScale.sectionTitle, color: palette.text };
const bodySx = { ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 760 };
const cardSx = { bgcolor: '#FFFFFF', borderRadius: { xs: '24px', md: '28px' }, p: { xs: 3, md: 3.5 }, boxShadow: '0 12px 28px rgba(17,24,39,0.05)' };

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ mb: { xs: 4, md: 5 } }}>
      <Typography component="h2" sx={sectionTitleSx}>{title}</Typography>
      <Typography sx={bodySx}>{description}</Typography>
    </Stack>
  );
}

export function ServicesPage() {
  return (
    <DetailStylePage title="บริการของ Baawork" subtitle="ออกแบบประสบการณ์ใช้งานและพัฒนาระบบที่เชื่อมกับงานจริงของธุรกิจ">
      <DetailStyleSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="บริการที่ต่อกันเป็นระบบเดียว" description="ทุกส่วนของงานถูกวางให้ทำงานต่อเนื่อง ตั้งแต่หน้าจอที่ผู้ใช้เห็น ไปจนถึงข้อมูลและระบบหลังบ้าน" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 } }}>
          {services.map(([title, description]) => (
            <Stack key={title} spacing={1.25} sx={cardSx}>
              <Typography sx={{ ...typeScale.cardTitle, color: palette.primaryPink }}>{title}</Typography>
              <Typography sx={{ ...typeScale.body, color: '#4B5563' }}>{description}</Typography>
            </Stack>
          ))}
        </Box>
      </DetailStyleSection>
      <DetailStyleSection backgroundColor="#F7F8FA" variant="slide-left">
        <SectionHeading title="พร้อมใช้งานและต่อยอดได้" description="เราออกแบบให้ UX/UI, frontend, backend, API และฐานข้อมูลไปในทิศทางเดียวกันตั้งแต่ต้น" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          {['UX/UI', 'ระบบหลังบ้าน', 'Production'].map((item) => <Box key={item} sx={{ ...cardSx, textAlign: 'center' }}><Typography sx={{ ...typeScale.cardTitle }}>{item}</Typography></Box>)}
        </Box>
      </DetailStyleSection>
    </DetailStylePage>
  );
}

export function StartProjectPage() {
  return (
    <DetailStylePage title="เริ่มโปรเจกต์กับ Baawork" subtitle="คุยโจทย์ให้ชัด วางขอบเขตให้เห็นภาพ แล้วพัฒนาเป็นระบบที่พร้อมใช้งานจริง">
      <DetailStyleSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="ขั้นตอนการทำงาน" description="เราแบ่งงานเป็นขั้นตอนที่ชัดเจน เพื่อให้ทุกฝ่ายเห็นภาพและติดตามงานได้ตลอดโปรเจกต์" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(5, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 } }}>
          {projectSteps.map(([number, title, description]) => <Stack key={number} spacing={3} sx={{ ...cardSx, minHeight: { xs: 220, lg: 300 }, justifyContent: 'space-between' }}><Typography sx={{ color: palette.primaryPink, fontWeight: 700 }}>{number}</Typography><Box><Typography sx={{ ...typeScale.cardTitle, mb: 1 }}>{title}</Typography><Typography sx={{ ...typeScale.body, color: '#4B5563' }}>{description}</Typography></Box></Stack>)}
        </Box>
      </DetailStyleSection>
      <DetailStyleSection backgroundColor="#F7F8FA" variant="slide-left">
        <SectionHeading title="เตรียมข้อมูลเพียงเล็กน้อย" description="ยังไม่ต้องมีเอกสารครบ แค่แชร์เป้าหมาย ตัวอย่างที่ชอบ ข้อมูลที่ต้องเชื่อม และช่วงเวลาที่ต้องการใช้งาน" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
          {['เป้าหมายของระบบ', 'ตัวอย่างที่อยากได้', 'ข้อมูลที่ต้องเชื่อม', 'ช่วงเวลาที่ต้องการ'].map((item) => <Box key={item} sx={cardSx}><Typography sx={{ ...typeScale.cardTitle }}>{item}</Typography></Box>)}
        </Box>
      </DetailStyleSection>
    </DetailStylePage>
  );
}

export function ConsultPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`ปรึกษาโปรเจกต์จาก ${String(values.get('name') ?? '')}`);
    const body = encodeURIComponent(['ชื่อ: ' + String(values.get('name') ?? ''), 'อีเมล: ' + String(values.get('email') ?? ''), 'โทรศัพท์: ' + String(values.get('phone') ?? '-'), 'บริษัท: ' + String(values.get('company') ?? '-'), 'ประเภทระบบ: ' + String(values.get('projectType') ?? '-'), '', 'รายละเอียด:', String(values.get('message') ?? '')].join('\n'));
    window.location.href = `mailto:${consultationEmail}?subject=${subject}&body=${body}`;
  };

  const inputSx = { width: '100%', minHeight: 48, boxSizing: 'border-box', border: '1px solid #D1D5DB', borderRadius: '14px', px: 1.5, bgcolor: '#FFFFFF', color: palette.text, font: 'inherit', outline: 'none', '&:focus': { borderColor: palette.primaryPink, boxShadow: '0 0 0 3px rgba(255,0,140,0.14)' } };

  return (
    <DetailStylePage title="ปรึกษา Baawork" subtitle="ส่งโจทย์ ระบบที่อยากทำ หรือปัญหาที่อยากแก้มาให้เราเริ่มดูภาพรวมร่วมกัน">
      <DetailStyleSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="เล่าโจทย์ให้เราฟัง" description="กรอกข้อมูลแล้วกดส่ง ระบบจะเปิดอีเมลพร้อมรายละเอียดของคุณให้ส่งหา Baawork ได้ทันที" />
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 }, ...cardSx }}>
          {[['ชื่อของคุณ', 'name', 'text'], ['อีเมลสำหรับติดต่อกลับ', 'email', 'email'], ['เบอร์โทรศัพท์ (ถ้ามี)', 'phone', 'tel'], ['บริษัทหรือองค์กร (ถ้ามี)', 'company', 'text']].map(([label, name, type]) => <Box key={name} component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>{label}<Box component="input" name={name} type={type} required={name === 'name' || name === 'email'} sx={inputSx} /></Box>)}
          <Box component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>ประเภทระบบที่สนใจ<Box component="select" name="projectType" defaultValue="" required sx={inputSx}><option value="" disabled>เลือกประเภทระบบ</option><option>เว็บแอปพลิเคชัน</option><option>ระบบ AI</option><option>ระบบหลังบ้าน / Dashboard</option><option>เชื่อมต่อ API และข้อมูล</option></Box></Box>
          <Box component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>รายละเอียดที่อยากปรึกษา<Box component="textarea" name="message" required rows={5} sx={{ ...inputSx, p: 1.5, resize: 'vertical' }} /></Box>
          <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' } }}><Box component="button" type="submit" sx={{ minHeight: 50, minWidth: { xs: '100%', sm: 190 }, border: 0, borderRadius: 999, px: 3, bgcolor: palette.primaryPink, color: '#FFFFFF', cursor: 'pointer', font: 'inherit', fontWeight: 700 }}>ส่งรายละเอียดทางอีเมล</Box></Box>
        </Box>
      </DetailStyleSection>
      <DetailStyleSection backgroundColor="#F7F8FA" variant="slide-left">
        <SectionHeading title="หรือติดต่อได้ที่" description="ติดตามผลงานและส่งข้อความหาเราได้ผ่านช่องทางด้านล่าง" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          {[['Facebook', 'https://www.facebook.com/BAAWORK'], ['YouTube', 'https://www.youtube.com/@baawork'], ['LINE', 'https://line.me/R/ti/p/@baawork']].map(([label, href]) => <Box key={label} component="a" href={href} target="_blank" rel="noreferrer" sx={{ ...cardSx, color: palette.text, textDecoration: 'none', textAlign: 'center' }}><Typography sx={{ ...typeScale.cardTitle }}>{label}</Typography></Box>)}
        </Box>
      </DetailStyleSection>
    </DetailStylePage>
  );
}

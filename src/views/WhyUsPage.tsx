'use client';

import { Box, Typography } from '@mui/material';
import { MarketingPageLayout, MarketingContentSection } from '../components/MarketingPageLayout';
import { ResponsiveStack } from '../components/ResponsiveStack';
import { palette, typeScale } from '../appTheme';

const principles = [
  ['เห็นภาพก่อนลงมือ', 'แปลงโจทย์ธุรกิจเป็น flow ขอบเขตงาน และหน้าจอหลักก่อนเริ่มพัฒนา'],
  ['ออกแบบให้ใช้จริง', 'จัดลำดับข้อมูลและขั้นตอนให้ทีมทำงานได้เร็วขึ้นทุกวัน'],
  ['เชื่อมข้อมูลได้จริง', 'วางระบบหลังบ้าน API และฐานข้อมูลให้เข้ากับเครื่องมือเดิม'],
];

const outcomes = ['เว็บแอปและระบบ AI ที่พร้อมใช้งาน', 'หน้า admin สำหรับจัดการข้อมูล', 'API และฐานข้อมูลที่ต่อยอดได้', 'แนวทาง deploy และดูแลระบบหลังส่งมอบ'];

const cardSx = { bgcolor: '#FFFFFF', borderRadius: { xs: '24px', md: '28px' }, p: { xs: 3, md: 3.5 }, boxShadow: '0 12px 28px rgba(17,24,39,0.05)' };

function SectionHeading({ title, description }: { title: string; description: string }) {
  return <ResponsiveStack spacing={{ xs: 1.5, md: 2 }} sx={{ mb: { xs: 4, md: 5 } }}><Typography component="h2" sx={{ ...typeScale.sectionTitle, color: palette.text }}>{title}</Typography><Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 760 }}>{description}</Typography></ResponsiveStack>;
}

export function WhyUsPage() {
  return (
    <MarketingPageLayout title="ทำไมต้องเรา" subtitle="เพราะระบบที่ดีต้องเชื่อมงานออกแบบ ประสบการณ์ใช้งาน และเทคโนโลยีเข้ากับธุรกิจจริง">
      <MarketingContentSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="เราแตกต่างจากงานทั่วไปตรงไหน" description="Baawork วางงานแบบครบเส้นทาง ตั้งแต่โจทย์ธุรกิจ หน้าจอใช้งานจริง ไปจนถึง API และ production" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 } }}>
          {principles.map(([title, description]) => <ResponsiveStack key={title} spacing={2} sx={{ ...cardSx, minHeight: { xs: 220, md: 280 } }}><Typography sx={{ ...typeScale.cardTitle, color: palette.primaryPink }}>{title}</Typography><Typography sx={{ ...typeScale.body, color: '#4B5563' }}>{description}</Typography></ResponsiveStack>)}
        </Box>
      </MarketingContentSection>
      <MarketingContentSection backgroundColor="#F7F8FA" variant="slide-left">
        <SectionHeading title="วิธีคิดของเรา" description="เราเลือกทำสิ่งที่ช่วยให้ระบบเข้าใจง่าย ใช้งานได้เร็ว และต่อยอดได้หลังส่งมอบ" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
          {['เริ่มจาก workflow ของทีม', 'ออกแบบก่อนพัฒนา', 'เชื่อมต่อข้อมูลอย่างเป็นระบบ', 'ทดสอบกับการใช้งานจริง'].map((item, index) => <Box key={item} sx={cardSx}><Typography sx={{ color: palette.primaryPink, fontWeight: 700, mb: 1 }}>0{index + 1}</Typography><Typography sx={{ ...typeScale.cardTitle }}>{item}</Typography></Box>)}
        </Box>
      </MarketingContentSection>
      <MarketingContentSection backgroundColor="#FFFFFF" variant="scale">
        <SectionHeading title="สิ่งที่ได้หลังร่วมงาน" description="ไม่ใช่เพียงหน้าจอหรือไฟล์งาน แต่เป็นระบบที่ทีมใช้งานและต่อยอดได้จริง" />
        <ResponsiveStack spacing={1.5}>{outcomes.map((item) => <Box key={item} sx={cardSx}><Typography sx={{ ...typeScale.bodyLarge, color: palette.text, fontWeight: 700 }}>{item}</Typography></Box>)}</ResponsiveStack>
      </MarketingContentSection>
    </MarketingPageLayout>
  );
}

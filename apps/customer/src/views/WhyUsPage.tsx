'use client';

import { Box, Stack, Typography } from '@mui/material';
import { palette, typeScale } from '../theme';

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

const proofItems = [
  {
    title: 'เริ่มจากงานจริงของทีม',
    description: 'คุย workflow, ข้อมูลที่ต้องใช้ และปัญหาที่เกิดซ้ำก่อนออกแบบหน้าจอทุกครั้ง',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=82',
  },
  {
    title: 'ดีไซน์ให้ใช้งานทุกวัน',
    description: 'หน้าจออ่านง่าย ลำดับข้อมูลชัด และลดขั้นตอนที่ทำให้ทีมเสียเวลา',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=82',
  },
  {
    title: 'เชื่อมข้อมูลได้จริง',
    description: 'วางโครง API, ฐานข้อมูล และหลังบ้านให้ต่อกับเครื่องมือเดิมของธุรกิจได้',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=82',
  },
  {
    title: 'ต่อยอดหลังส่งมอบ',
    description: 'โครงระบบถูกออกแบบให้ขยายฟีเจอร์ เพิ่มข้อมูล และดูแล production ต่อได้ง่าย',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=82',
  },
];

const differences = [
  {
    label: 'ภาพรวมก่อนลงมือ',
    title: 'เห็นโจทย์เดียวกันตั้งแต่วันแรก',
    body: 'เราแปลงความต้องการให้เป็น flow, ขอบเขตงาน และหน้าจอหลักก่อนเริ่มพัฒนา เพื่อลดการแก้ซ้ำระหว่างทาง',
  },
  {
    label: 'งานออกแบบ',
    title: 'ไม่ใช่แค่สวย แต่ต้องใช้ได้จริง',
    body: 'ทุกหน้าเน้นการอ่านข้อมูล การตัดสินใจ และการทำงานซ้ำของทีมจริง มากกว่าการทำหน้าจอให้ดูเต็มอย่างเดียว',
  },
  {
    label: 'งานระบบ',
    title: 'คิดทั้ง frontend, backend และข้อมูล',
    body: 'เราออกแบบหน้าบ้าน หลังบ้าน API ฐานข้อมูล และสิทธิ์การใช้งานให้เป็นระบบเดียวกันตั้งแต่ต้น',
  },
];

const deliveryPoints = [
  'ระบบเว็บแอปและระบบ AI ที่พร้อมใช้งาน',
  'หน้า admin สำหรับจัดการข้อมูล',
  'API และฐานข้อมูลที่ต่อยอดได้',
  'แนวทาง deploy และดูแลระบบหลังส่งมอบ',
];

export function WhyUsPage() {
  return (
    <Box sx={{ bgcolor: palette.background, color: palette.text, overflow: 'hidden' }}>
      <Box
        component="section"
        sx={{
          minHeight: { xs: 'auto', md: '82vh' },
          pt: { xs: 13, sm: 15, md: 18 },
          pb: { xs: 7, md: 10 },
          px: pageGutter,
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 980, mx: 'auto', textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              ...typeScale.hero,
              fontSize: { xs: 44, sm: 64, md: 88, lg: 96 },
              color: palette.text,
            }}
          >
            ทำไมต้องเรา
          </Typography>
          <Typography
            sx={{
              ...typeScale.intro,
              mx: 'auto',
              maxWidth: 820,
              color: '#4B5563',
            }}
          >
            เพราะระบบที่ดีต้องเข้าใจทั้งงานออกแบบ ประสบการณ์ใช้งาน และเทคโนโลยีที่ต่อกับธุรกิจจริง
          </Typography>
        </Stack>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            mx: 'auto',
            width: '100%',
            maxWidth: 1180,
            aspectRatio: { xs: '1 / 1.08', sm: '16 / 8.5', md: '16 / 7' },
            borderRadius: { xs: '28px', md: '36px' },
            overflow: 'hidden',
            position: 'relative',
            bgcolor: palette.softGray,
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=84"
            alt="ทีมออกแบบและพัฒนาระบบกำลังทำงานร่วมกัน"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(17,24,39,0.10) 0%, rgba(17,24,39,0.50) 100%)',
            }}
          />
          <Typography
            sx={{
              position: 'absolute',
              left: { xs: 24, md: 40 },
              bottom: { xs: 24, md: 36 },
              maxWidth: 720,
              color: '#fff',
              fontSize: { xs: 28, sm: 40, md: 56 },
              lineHeight: 1.1,
              fontWeight: 600,
            }}
          >
            สร้างระบบที่ทีมใช้ต่อได้จริง ไม่ใช่แค่หน้าเว็บที่ดูดี
          </Typography>
        </Box>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 }, px: pageGutter, bgcolor: palette.softGray }}>
        <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: 980, mb: { xs: 4, md: 6 } }}>
          <Typography component="h2" sx={{ ...typeScale.sectionTitle, color: palette.primaryPink }}>
            เราต่างจากงานทั่วไปตรงไหน
          </Typography>
          <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 760 }}>
            Baawork วางงานแบบครบเส้นทาง ตั้งแต่โจทย์ธุรกิจ หน้าจอใช้งานจริง ไปจนถึง API และ production
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {differences.map((item) => (
            <Stack
              key={item.title}
              spacing={2.5}
              sx={{
                minHeight: { xs: 260, md: 360 },
                justifyContent: 'space-between',
                p: { xs: 3, md: 4 },
                borderRadius: '28px',
                bgcolor: '#fff',
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 20px 44px rgba(17,24,39,0.10)',
                },
              }}
            >
              <Typography sx={{ color: palette.primaryPink, fontSize: 15, lineHeight: 1.35, fontWeight: 700 }}>
                {item.label}
              </Typography>
              <Box>
                <Typography sx={{ ...typeScale.cardTitle, mb: 2, color: palette.text }}>{item.title}</Typography>
                <Typography sx={{ ...typeScale.body, color: '#4B5563' }}>{item.body}</Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: '#fff' }}>
        <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ px: pageGutter, mb: { xs: 4, md: 5 } }}>
          <Typography component="h2" sx={{ ...typeScale.sectionTitle, color: palette.text }}>
            วิธีคิดของเรา
          </Typography>
          <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 760 }}>
            เราเลือกทำสิ่งที่ช่วยให้ระบบเข้าใจง่าย ใช้ได้เร็ว และต่อยอดได้หลังส่งมอบ
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 2.5 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            px: pageGutter,
            pb: { xs: 2, md: 3 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {proofItems.map((item) => (
            <Box
              key={item.title}
              sx={{
                position: 'relative',
                flex: { xs: '0 0 calc(100vw - 64px)', sm: '0 0 440px', md: '0 0 520px' },
                height: { xs: 520, md: 620 },
                borderRadius: '30px',
                overflow: 'hidden',
                color: '#fff',
                scrollSnapAlign: 'start',
                bgcolor: '#111827',
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 18px 40px rgba(17,24,39,0.14)',
                },
                '&:hover img': {
                  transform: 'scale(1.035)',
                },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0.34) 100%)' }} />
              <Stack spacing={2} sx={{ position: 'absolute', inset: 0, p: { xs: 3, md: 4 }, justifyContent: 'flex-start' }}>
                <Typography sx={{ fontSize: { xs: 32, md: 40 }, lineHeight: 1.1, fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ ...typeScale.body, color: 'rgba(255,255,255,0.78)', maxWidth: 410 }}>
                  {item.description}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          py: { xs: 7, md: 10 },
          px: pageGutter,
          bgcolor: palette.primaryPink,
          color: '#fff',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.9fr) minmax(320px, 0.75fr)' },
            gap: { xs: 4, md: 8 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={{ xs: 2, md: 2.5 }}>
            <Typography component="h2" sx={{ ...typeScale.sectionTitle, color: '#fff' }}>
              สิ่งที่ได้หลังร่วมงาน
            </Typography>
            <Typography sx={{ ...typeScale.bodyLarge, color: 'rgba(255,255,255,0.82)', maxWidth: 720 }}>
              ไม่ใช่แค่ไฟล์งานหรือหน้าเว็บ แต่เป็นระบบที่มีโครงสร้าง ใช้งานได้ และพร้อมให้ทีมต่อยอด
            </Typography>
          </Stack>

          <Stack spacing={1.2}>
            {deliveryPoints.map((point) => (
              <Box
                key={point}
                sx={{
                  p: { xs: 2.2, md: 2.5 },
                  borderRadius: '22px',
                  bgcolor: 'rgba(255,255,255,0.14)',
                  color: '#fff',
                  fontSize: { xs: 19, md: 21 },
                  lineHeight: 1.38,
                  fontWeight: 600,
                }}
              >
                {point}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

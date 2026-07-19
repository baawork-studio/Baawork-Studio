'use client';

import { Box, Typography } from '@mui/material';
import { Reveal } from '../components/motion/Reveal';
import { Stack } from '../components/Stack';
import { palette, typeScale } from '../theme';

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

const serviceCards = [
  {
    title: 'ระบบเว็บแอป',
    body: 'หน้าบ้าน หลังบ้าน และแดชบอร์ดสำหรับทีมที่ต้องจัดการงานจริงทุกวัน',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1500&q=84',
  },
  {
    title: 'ระบบ AI',
    body: 'สรุปข้อมูล วิเคราะห์สัญญาณสำคัญ และช่วยทีมตัดสินใจจากข้อมูลที่มีอยู่',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1500&q=84',
  },
  {
    title: 'ระบบหลังบ้าน',
    body: 'จัดการข้อมูล รูปภาพ สถานะงาน สิทธิ์ผู้ใช้ และเนื้อหาที่ต้องอัปเดตเอง',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=84',
  },
  {
    title: 'API และ Production',
    body: 'วางฐานข้อมูล เชื่อม API deploy และเตรียมระบบให้ดูแลต่อได้หลังส่งมอบ',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1500&q=84',
  },
];

const startSteps = [
  {
    step: '01',
    title: 'คุยโจทย์',
    body: 'ทำความเข้าใจเป้าหมาย ปัญหาเดิม ผู้ใช้งาน และข้อมูลที่ระบบต้องเชื่อมต่อ',
  },
  {
    step: '02',
    title: 'วางขอบเขต',
    body: 'สรุปฟีเจอร์หลัก flow การทำงาน และสิ่งที่ต้องส่งมอบให้เห็นภาพเดียวกัน',
  },
  {
    step: '03',
    title: 'ออกแบบ UX/UI',
    body: 'จัดลำดับข้อมูล หน้าจอ และประสบการณ์ใช้งานให้เหมาะกับทีมที่ใช้จริง',
  },
  {
    step: '04',
    title: 'พัฒนาและเชื่อมข้อมูล',
    body: 'สร้าง frontend, backend, API, database และหน้า admin ตามขอบเขตงาน',
  },
  {
    step: '05',
    title: 'ทดสอบและส่งมอบ',
    body: 'ตรวจการใช้งานจริง deploy และสรุปแนวทางดูแลระบบหลังขึ้น production',
  },
];

const faqItems = [
  {
    question: 'Baawork รับทำระบบประเภทไหน',
    answer: 'รับทำระบบเว็บแอป ระบบ AI หน้า admin dashboard API และระบบหลังบ้านที่ต้องเชื่อมข้อมูลกับงานจริง',
  },
  {
    question: 'ต้องมีดีไซน์มาก่อนหรือไม่',
    answer: 'ไม่จำเป็น เราช่วยวาง UX/UI จากโจทย์ธุรกิจและ flow งานเดิมได้ตั้งแต่ต้น',
  },
  {
    question: 'เชื่อมระบบเดิมหรือ API ภายนอกได้ไหม',
    answer: 'ได้ สามารถเชื่อม API, database, Google Sheet, CRM, POS, LINE หรือระบบหลังบ้านเดิมตามความพร้อมของข้อมูล',
  },
  {
    question: 'มีหน้า admin ให้จัดการข้อมูลไหม',
    answer: 'มีได้ตามขอบเขตงาน เช่น เพิ่มผลงาน อัปโหลดรูป แก้คำอธิบาย จัดการสถานะ หรือจัดการข้อมูลลูกค้า',
  },
  {
    question: 'ใช้เวลาทำนานแค่ไหน',
    answer: 'ขึ้นกับขนาดระบบและจำนวนฟีเจอร์ หลังคุยโจทย์เราจะช่วยแยกเฟสและประเมินเวลาที่เหมาะสมให้ชัดเจน',
  },
  {
    question: 'ดูแลหลังส่งมอบได้ไหม',
    answer: 'ได้ ทั้งการแก้ไขเล็กน้อย เพิ่มฟีเจอร์ ตรวจระบบ และช่วยดู production ต่อหลังเปิดใช้งาน',
  },
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/BAAWORK',
    color: '#1877F2',
    iconSrc: 'https://thesvg.org/icons/facebook/default.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@baawork',
    color: '#FF0033',
    iconSrc: 'https://thesvg.org/icons/youtube/default.svg',
  },
  {
    label: 'LINE',
    href: 'https://line.me/R/ti/p/@baawork',
    color: '#06C755',
    iconSrc: 'https://thesvg.org/icons/line/default.svg',
  },
];

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        px: pageGutter,
        pt: { xs: 13, sm: 15, md: 18 },
        pb: { xs: 6, md: 9 },
        textAlign: 'center',
      }}
    >
      <Reveal>
      <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 980, mx: 'auto', alignItems: 'center' }}>
        <Typography sx={{ color: palette.primaryPink, fontSize: 17, lineHeight: 1.35, fontWeight: 700 }}>
          {eyebrow}
        </Typography>
        <Typography
          component="h1"
          sx={{
            ...typeScale.hero,
            fontSize: { xs: 44, sm: 64, md: 88, lg: 96 },
            color: palette.text,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ ...typeScale.intro, maxWidth: 820, color: '#4B5563' }}>{description}</Typography>
      </Stack>
      </Reveal>
    </Box>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Box
      component="a"
      href={href}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 54,
        px: { xs: 3.5, md: 4.5 },
        borderRadius: 999,
        bgcolor: palette.primaryPink,
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: 17,
        lineHeight: 1.23,
        fontWeight: 700,
        transition: 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease',
        '&:hover': {
          bgcolor: '#E6007E',
          transform: 'translate3d(0, -2px, 0)',
        },
      }}
    >
      {children}
    </Box>
  );
}

export function ServicesPage() {
  return (
    <Box sx={{ bgcolor: palette.background, color: palette.text, overflow: 'hidden' }}>
      <PageHero
        eyebrow="บริการ"
        title="บริการของ Baawork"
        description="ออกแบบและพัฒนาระบบเว็บแอป ระบบ AI และเครื่องมือหลังบ้านที่เชื่อมกับข้อมูลจริงของธุรกิจ"
      />

      <Box component="section" sx={{ px: pageGutter, pb: { xs: 7, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {serviceCards.map((item) => (
            <Box
              key={item.title}
              sx={{
                position: 'relative',
                minHeight: { xs: 420, sm: 500, md: 560 },
                borderRadius: { xs: '28px', md: '34px' },
                overflow: 'hidden',
                color: '#fff',
                isolation: 'isolate',
                transition: 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 340ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 28px 60px rgba(17,24,39,0.16)',
                },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}
              />
              <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(17,24,39,0.48)', zIndex: -1 }} />
              <Stack spacing={2} sx={{ p: { xs: 3.5, md: 5 }, maxWidth: 620 }}>
                <Typography sx={{ ...typeScale.cardTitle, color: '#FFFFFF' }}>{item.title}</Typography>
                <Typography sx={{ ...typeScale.bodyLarge, color: 'rgba(255,255,255,0.86)' }}>{item.body}</Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ px: pageGutter, py: { xs: 7, md: 10 }, bgcolor: palette.softGray }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.92fr) minmax(0, 1.08fr)' },
            gap: { xs: 4, md: 7 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={2.5}>
            <Typography component="h2" sx={{ ...typeScale.sectionTitle, color: palette.primaryPink }}>
              บริการที่ต่อกันเป็นระบบเดียว
            </Typography>
            <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563' }}>
              เราไม่ได้แยกงานออกแบบกับงานระบบออกจากกัน แต่จัด UX/UI, frontend, backend, API และฐานข้อมูลให้ไปในทิศทางเดียวกันตั้งแต่ต้น
            </Typography>
            <Box sx={{ pt: 1 }}>
              <PrimaryLink href="/start-project">เริ่มคุยโปรเจกต์</PrimaryLink>
            </Box>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
              gap: 2,
            }}
          >
            {['UX/UI', 'ระบบ', 'Production'].map((label) => (
              <Stack
                key={label}
                sx={{
                  minHeight: 220,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: '28px',
                  bgcolor: '#FFFFFF',
                }}
              >
                <Typography sx={{ fontSize: { xs: 32, md: 40 }, lineHeight: 1.1, fontWeight: 700 }}>{label}</Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function StartProjectPage() {
  return (
    <Box sx={{ bgcolor: palette.background, color: palette.text, overflow: 'hidden' }}>
      <PageHero
        eyebrow="วิธีเริ่มโปรเจกต์"
        title="เริ่มโปรเจกต์กับ Baawork"
        description="คุยโจทย์ให้ชัด วางขอบเขตให้เห็นภาพ แล้วค่อยพัฒนาเป็นระบบที่พร้อมใช้งานจริง"
      />

      <Box component="section" sx={{ px: pageGutter, pb: { xs: 7, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(5, minmax(0, 1fr))' },
            gap: { xs: 2, md: 1.5 },
          }}
        >
          {startSteps.map((item) => (
            <Stack
              key={item.step}
              spacing={3}
              sx={{
                minHeight: { xs: 260, md: 420 },
                p: { xs: 3, md: 3.2 },
                borderRadius: '28px',
                bgcolor: item.step === '01' ? palette.primaryPink : palette.softGray,
                color: item.step === '01' ? '#FFFFFF' : palette.text,
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: 17, lineHeight: 1.35, fontWeight: 700, opacity: 0.85 }}>{item.step}</Typography>
              <Box>
                <Typography sx={{ fontSize: { xs: 32, md: 34 }, lineHeight: 1.1, fontWeight: 700, mb: 1.5 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ ...typeScale.body, color: item.step === '01' ? 'rgba(255,255,255,0.86)' : '#4B5563' }}>
                  {item.body}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ px: pageGutter, py: { xs: 7, md: 10 }, bgcolor: palette.softGray }}>
        <Stack spacing={2.5} sx={{ maxWidth: 860, mb: { xs: 4, md: 5 } }}>
          <Typography component="h2" sx={{ ...typeScale.sectionTitle, color: palette.text }}>
            เตรียมแค่นี้ก็เริ่มคุยได้
          </Typography>
          <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563' }}>
            ยังไม่ต้องมีเอกสารครบ แค่มีเป้าหมาย ตัวอย่างระบบที่ชอบ หรือปัญหาที่อยากแก้ ก็เริ่มวางแนวทางได้แล้ว
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          {['เป้าหมายของระบบ', 'ตัวอย่างที่อยากได้', 'ข้อมูลที่ต้องเชื่อม', 'ระยะเวลาที่ต้องใช้'].map((item) => (
            <Stack key={item} sx={{ minHeight: 180, borderRadius: '26px', bgcolor: '#fff', p: 3, justifyContent: 'flex-end' }}>
              <Typography sx={{ fontSize: { xs: 24, md: 28 }, lineHeight: 1.18, fontWeight: 700 }}>{item}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function FaqPage() {
  return (
    <Box sx={{ bgcolor: palette.background, color: palette.text, overflow: 'hidden' }}>
      <PageHero
        eyebrow="FAQ"
        title="คำถามที่พบบ่อย"
        description="คำตอบสั้นๆ สำหรับคนที่กำลังคิดจะทำระบบเว็บแอป ระบบ AI หรือหลังบ้านกับ Baawork"
      />

      <Box component="section" sx={{ px: pageGutter, pb: { xs: 7, md: 10 } }}>
        <Stack spacing={1.5} sx={{ maxWidth: 980, mx: 'auto' }}>
          {faqItems.map((item) => (
            <Box
              key={item.question}
              component="details"
              sx={{
                borderRadius: '24px',
                bgcolor: palette.softGray,
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 2.2, md: 2.8 },
                '&[open]': { bgcolor: '#fff', boxShadow: '0 18px 46px rgba(17,24,39,0.08)' },
              }}
            >
              <Box
                component="summary"
                sx={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  '&::-webkit-details-marker': { display: 'none' },
                }}
              >
                <Typography sx={{ fontSize: { xs: 21, md: 28 }, lineHeight: 1.18, fontWeight: 700 }}>
                  {item.question}
                </Typography>
                <Typography aria-hidden="true" sx={{ color: palette.primaryPink, fontSize: 24, lineHeight: 1, fontWeight: 700 }}>
                  ›
                </Typography>
              </Box>
              <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 820, pt: 2 }}>{item.answer}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export function ContactPage() {
  return (
    <Box sx={{ bgcolor: palette.background, color: palette.text, overflow: 'hidden' }}>
      <PageHero
        eyebrow="ติดต่อเรา"
        title="คุยกับ Baawork"
        description="ส่งโจทย์ ระบบที่อยากทำ หรือปัญหาที่อยากแก้มาให้เราเริ่มดูภาพรวมร่วมกัน"
      />

      <Box component="section" sx={{ px: pageGutter, pb: { xs: 7, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.95fr) minmax(280px, 0.7fr)' },
            gap: { xs: 4, md: 8 },
            alignItems: 'start',
          }}
        >
          <Stack spacing={3}>
            <Typography component="h2" sx={{ ...typeScale.sectionTitle, color: palette.primaryPink }}>
              สนใจร่วมงานติดต่อได้ที่
            </Typography>
            <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 720 }}>
              บอกเป้าหมายของระบบ ประเภทงาน และช่องทางที่สะดวกติดต่อกลับได้เลย เราจะช่วยไล่ภาพรวมและขอบเขตงานให้ชัดขึ้น
            </Typography>
            <Stack spacing={1.5} sx={{ pt: 1 }}>
              {socials.map((social) => (
                <Box
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.75,
                    color: '#4B5563',
                    textDecoration: 'none',
                    fontSize: { xs: 24, md: 32 },
                    lineHeight: 1.2,
                    fontWeight: 600,
                    transition: 'color 180ms ease, transform 220ms ease',
                    '&:hover': { color: social.color, transform: 'translate3d(0, -2px, 0)' },
                  }}
                >
                  <Box
                    component="img"
                    src={social.iconSrc}
                    alt=""
                    aria-hidden="true"
                    sx={{ width: { xs: 28, md: 34 }, height: { xs: 28, md: 34 }, objectFit: 'contain' }}
                  />
                  {social.label}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              alignItems: { xs: 'flex-start', md: 'center' },
              p: { xs: 0, md: 4 },
            }}
          >
            <Box
              component="img"
              src="/homepage/line-qr.png"
              alt="QR code สำหรับติดต่อ LINE Baawork"
              sx={{ width: { xs: 220, md: 280 }, height: { xs: 220, md: 280 }, objectFit: 'contain' }}
            />
            <Typography sx={{ ...typeScale.body, color: '#4B5563', textAlign: { xs: 'left', md: 'center' } }}>
              สแกนเพื่อคุยผ่าน LINE
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

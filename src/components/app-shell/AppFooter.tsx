import { Box, Typography } from '@mui/material';
import { ResponsiveStack } from '../ResponsiveStack';
import { Reveal } from '../motion/Reveal';
import { hover, palette, typeScale } from '../../appTheme';
import { navigateToHomeSection } from '../../utils/homeSectionNavigation';
import { footerNavigation, socialLinks } from './navigation';

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

export function AppFooter() {
  return (
    <Box component="footer" id="contact" sx={{ bgcolor: palette.background, color: palette.text, py: { xs: 7, sm: 8, md: 10 }, px: pageGutter }}>
      <Reveal>
        <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)' },
          gap: { xs: 5, md: 7, lg: 8 },
          alignItems: 'start',
        }}
      >
        <ResponsiveStack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 760 }}>
          <ResponsiveStack direction="row" alignItems="center" spacing={1.5}>
            <Box component="img" src="/homepage/baawork-logo.png" alt="คนบ้างงาน" sx={{ display: 'block', width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: '50%', objectFit: 'contain' }} />
            <Typography sx={{ fontSize: { xs: 19, md: 21 }, lineHeight: 1.2, fontWeight: 600, letterSpacing: 0 }}>
              Baawork Studio
            </Typography>
          </ResponsiveStack>
          <Typography variant="h3" sx={{ color: palette.text, maxWidth: 720 }}>
            สร้างระบบจริงกับทีมที่เข้าใจงาน
          </Typography>
          <Typography sx={{ ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 680 }}>
            คุยโจทย์ วางแนวทาง และต่อยอดเป็นระบบเว็บแอป ระบบ AI หรือเครื่องมือหลังบ้านที่เชื่อมต่อข้อมูลจริงได้อย่างเป็นระบบ
          </Typography>
        </ResponsiveStack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 0.94fr) minmax(150px, 1.06fr)', sm: 'minmax(0, 1fr) minmax(180px, 0.95fr)' }, gap: { xs: 2.5, sm: 4, md: 5 }, alignItems: 'stretch' }}>
          <Box>
            <Typography sx={{ mb: 1.5, color: palette.primaryPink, fontSize: 14, lineHeight: 1.35, fontWeight: 700 }}>
              ไปยังส่วนต่างๆ
            </Typography>
            <ResponsiveStack spacing={1.2}>
              {footerNavigation.map((link) => (
                <Typography
                  key={link.label}
                  component="a"
                  href={link.href}
                  onClick={link.sectionId ? (event) => navigateToHomeSection(event, link.sectionId!) : undefined}
                  sx={{ color: '#4B5563', textDecoration: 'none', fontSize: 17, lineHeight: 1.353, fontWeight: 500, transition: hover.transition.color, '&:hover': { color: palette.text } }}
                >
                  {link.label}
                </Typography>
              ))}
            </ResponsiveStack>
          </Box>

          <Box>
            <Typography sx={{ mb: 1.5, color: palette.primaryPink, fontSize: 14, lineHeight: 1.35, fontWeight: 700 }}>
              สนใจร่วมงานติดต่อได้ที่
            </Typography>
            <ResponsiveStack spacing={1.2}>
              {socialLinks.map((social) => (
                <Typography
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.label} Baawork`}
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: '#4B5563', textDecoration: 'none', fontSize: 17, lineHeight: 1.353, fontWeight: 500, transition: hover.transition.interactive, '&:hover': { color: social.color, transform: hover.subtleLift } }}
                >
                  <Box component="img" src={social.iconSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" sx={{ width: 24, height: 24, minWidth: 24, objectFit: 'contain', flex: '0 0 auto' }} />
                  {social.label}
                </Typography>
              ))}
            </ResponsiveStack>
            <Box component="img" src="/homepage/line-qr.png" alt="QR code สำหรับติดต่อ LINE Baawork" loading="lazy" decoding="async" sx={{ display: 'block', width: { xs: 112, sm: 148, md: 156 }, height: { xs: 112, sm: 148, md: 156 }, mt: { xs: 2.25, md: 2.5 }, objectFit: 'contain' }} />
          </Box>
        </Box>
        </Box>
      </Reveal>

      <Reveal delay={0.08}>
        <Box sx={{ mt: { xs: 6, md: 8 }, pt: { xs: 3, md: 4 }, borderTop: `1px solid ${palette.border}`, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#4B5563', fontSize: { xs: 13, sm: 14 }, lineHeight: 1.5, fontWeight: 600, letterSpacing: 0 }}>
          บริษัท คนบ้างาน จำกัด
        </Typography>
        <Typography sx={{ color: '#6B7280', fontSize: { xs: 13, sm: 14 }, lineHeight: 1.5 }}>
          ออกแบบ พัฒนา และส่งมอบระบบดิจิทัลสำหรับใช้งานจริง
        </Typography>
        </Box>
      </Reveal>
    </Box>
  );
}

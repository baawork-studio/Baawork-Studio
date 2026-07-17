import { Box, Typography } from "@mui/material";
import { Stack } from "../../components/Stack";
import type { Project } from "../../data/fallbackProjects";
import { palette, typeScale } from "../../theme";
import { detailCarouselVerticalGap, mockupAssets, pageGutter, screenSlots, techIcons } from "./data";
import { carouselControlSx, getAudienceCards, getCapabilityCards, getCapabilityDetailRows, getConnectionItems, getOutcomeCards, getProjectVisual, getProjectVisualImage, getProjectVisualImages, getScreenImage, getSystemPreviewItems, getTechReason, getWorkflowSteps, renderHighlightedDescription, useDetailCarousel } from "./utils";
import type { CapabilityCard, DetailInfoCard, SystemPreviewItem } from "./types";

export function ProjectDeviceShowcase({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const slots = screenSlots[visual.template];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 960, md: 1260, lg: 1440 },
        mx: 'auto',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={mockupAssets[visual.template]}
        alt={`${project.title} บนหน้าจออุปกรณ์`}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {slots.map((slot, index) => {
        const imageUrl = getScreenImage(project, slot.key, index);

        return (
          <Box
            key={`${slot.key}-${slot.mask}`}
            sx={{
              position: 'absolute',
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
              overflow: 'hidden',
              WebkitMaskImage: `url(${slot.mask})`,
              maskImage: `url(${slot.mask})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={`${project.title} ${slot.key}`}
              loading="lazy"
              decoding="async"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export function ProjectPurposeSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        mx: 'auto',
        py: { xs: 2, md: 3.5 },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.08fr) minmax(360px, 0.92fr)' },
          gap: { xs: 2.5, md: 3.5, lg: 5 },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 360, sm: 460, md: 540, lg: 620 },
            overflow: 'hidden',
            borderRadius: { xs: '30px', md: '44px' },
            bgcolor: visual.tint,
            boxShadow: '0 28px 80px rgba(17,24,39,0.1)',
          }}
        >
          <Box
            component="img"
            src={getProjectVisualImage(project, 1)}
            alt={`${project.title} ภาพรวมการใช้งาน`}
            loading="lazy"
            decoding="async"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(17,24,39,0.12) 0%, rgba(17,24,39,0.08) 42%, rgba(17,24,39,0.56) 100%)',
            }}
          />
          <Stack
            spacing={{ xs: 1, md: 1.25 }}
            sx={{
              position: 'absolute',
              left: { xs: 24, md: 42 },
              right: { xs: 24, md: 42 },
              bottom: { xs: 24, md: 40 },
            }}
          >
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: 18, md: 21 },
                lineHeight: 1.25,
                fontWeight: 700,
              }}
            >
              เห็นภาพงานจริงก่อนลงรายละเอียด
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#FFFFFF',
                ...typeScale.sectionTitle,
                maxWidth: 780,
              }}
            >
              {project.title}
            </Typography>
          </Stack>
        </Box>

        <Stack
          spacing={{ xs: 2, md: 2.5 }}
          sx={{
            maxWidth: 660,
            mx: { xs: 'auto', lg: 0 },
            textAlign: { xs: 'center', lg: 'left' },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: visual.accent,
              ...typeScale.display,
            }}
          >
            สร้างมาเพื่ออะไร
          </Typography>
          <Typography
            sx={{
              color: '#6E6E73',
              ...typeScale.intro,
              fontWeight: 600,
            }}
          >
            {renderHighlightedDescription(project, visual.accent)}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function SystemPreviewCard({
  item,
  accent,
  featured = false,
}: {
  item: SystemPreviewItem;
  accent: string;
  featured?: boolean;
}) {
  return (
    <Box
      component="article"
      sx={{
        minHeight: 0,
        overflow: 'hidden',
        borderRadius: { xs: '28px', md: '34px' },
        bgcolor: '#FFFFFF',
        boxShadow: '0 20px 54px rgba(17,24,39,0.08)',
        transition:
          'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        '&:hover': {
          transform: 'translate3d(0, -6px, 0)',
          boxShadow: '0 28px 72px rgba(17,24,39,0.12)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: featured ? { xs: '16 / 11', md: '16 / 10' } : '16 / 9',
          overflow: 'hidden',
          bgcolor: '#EEF0F4',
        }}
      >
        <Box
          component="img"
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          decoding="async"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.01)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,24,39,0.12) 0%, rgba(17,24,39,0) 48%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Stack
        spacing={{ xs: 1, md: 1.25 }}
        sx={{
          p: { xs: 2.5, sm: 3, md: featured ? 4 : 3.25 },
        }}
      >
        <Typography
          sx={{
            color: accent,
            fontSize: { xs: 15, md: 16 },
            lineHeight: 1.35,
            fontWeight: 700,
          }}
        >
          {item.focus}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: palette.text,
            fontSize: featured
              ? { xs: 31, sm: 36, md: 44, lg: 48 }
              : { xs: 26, sm: 28, md: 31 },
            lineHeight: 1.08,
            letterSpacing: 0,
            fontWeight: 700,
          }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            color: '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: featured ? 760 : '100%',
          }}
        >
          {item.description}
        </Typography>
      </Stack>
    </Box>
  );
}

export function ProjectSystemPreviewSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const items = getSystemPreviewItems(project);
  const [featured, ...supportItems] = items;

  if (!featured) return null;

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#F7F8FA',
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: { xs: 6, sm: 7, md: 8 },
        overflow: 'visible',
      }}
    >
      <Stack
        spacing={{ xs: 1.25, md: 1.5 }}
        sx={{
          px: pageGutter,
          mb: { xs: 3, md: 4 },
          maxWidth: { xs: '100%', md: 960 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
          }}
        >
          พรีวิวหน้าจอระบบจริง
        </Typography>
        <Typography
          sx={{
            color: '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: 760,
          }}
        >
          ตัวอย่างหน้าจอสำคัญที่ลูกค้าจะได้เห็นในระบบจริง ตั้งแต่ภาพรวม รายละเอียดงาน ไปจนถึง workflow ที่ทีมใช้ต่อได้ทันที
        </Typography>
      </Stack>

      <Box
        sx={{
          px: pageGutter,
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)' },
            gap: { xs: 2, md: 2.5, lg: 3 },
            alignItems: 'stretch',
          }}
        >
          <SystemPreviewCard item={featured} accent={visual.accent} featured />
          <Stack spacing={{ xs: 2, md: 2.5, lg: 3 }}>
            {supportItems.map((item) => (
              <SystemPreviewCard key={item.title} item={item} accent={visual.accent} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function DetailSectionHeading({
  title,
  description,
  accent,
}: {
  title: string;
  description?: string;
  accent: string;
}) {
  return (
    <Stack spacing={{ xs: 1, md: 1.25 }} sx={{ maxWidth: 860 }}>
      <Typography
        variant="h2"
        sx={{
          color: accent,
          ...typeScale.sectionTitle,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: 760,
          }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
}

function VisualInfoCard({
  title,
  description,
  imageUrl,
  accent,
  label,
  tall = false,
  dark = true,
}: {
  title: string;
  description: string;
  imageUrl: string;
  accent: string;
  label?: string;
  tall?: boolean;
  dark?: boolean;
}) {
  return (
    <Stack
      component="article"
      sx={{
        position: 'relative',
        minHeight: tall ? { xs: 360, md: 460 } : { xs: 300, md: 360 },
        overflow: 'hidden',
        borderRadius: { xs: '28px', md: '36px' },
        bgcolor: dark ? '#05060A' : '#FFFFFF',
        color: dark ? '#FFFFFF' : palette.text,
        boxShadow: '0 24px 64px rgba(17,24,39,0.09)',
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease',
        '&:hover': {
          transform: 'translate3d(0, -6px, 0)',
          boxShadow: '0 32px 82px rgba(17,24,39,0.13)',
        },
        '&:hover img': {
          transform: 'scale(1.045)',
        },
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: dark ? 0.86 : 0.2,
          transform: 'scale(1.01)',
          transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: dark
            ? 'linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.78) 100%)'
            : `linear-gradient(180deg, rgba(255,255,255,0.82) 0%, ${visualTintFromAccent(accent)} 100%)`,
        }}
      />
      <Stack
        spacing={{ xs: 1.35, md: 1.6 }}
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          minHeight: 'inherit',
          justifyContent: 'flex-end',
          p: { xs: 3, md: 3.75 },
        }}
      >
        {label && (
          <Typography
            sx={{
              color: dark ? 'rgba(255,255,255,0.72)' : accent,
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            {label}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{
            color: 'currentColor',
            fontSize: { xs: 31, sm: 35, md: 42 },
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: dark ? 'rgba(255,255,255,0.78)' : '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: 560,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}

function visualTintFromAccent(accent: string) {
  return accent === '#FF008C' ? 'rgba(255,240,248,0.92)' : 'rgba(247,248,250,0.92)';
}

export function ProjectUsageGuideSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const audienceCards = getAudienceCards(project);
  const workflowSteps = getWorkflowSteps(project);
  const connectionItems = getConnectionItems(project);
  const outcomeCards = getOutcomeCards(project);

  return (
    <Stack component="section" spacing={{ xs: 6, md: 8 }} sx={{ py: { xs: 2, md: 3 }, overflow: 'visible' }}>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <DetailSectionHeading
          title="ระบบนี้ช่วยงานใครบ้าง"
          description="ดูจากบทบาทจริงในทีมก่อน แล้วค่อยลงรายละเอียดว่าหน้าจอไหนช่วยงานส่วนไหน"
          accent={visual.accent}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 2.25 },
          }}
        >
          {audienceCards.map((card, index) => (
            <VisualInfoCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={getProjectVisualImage(project, index)}
              accent={visual.accent}
              label={`บทบาท ${String(index + 1).padStart(2, '0')}`}
              tall={index === 0}
            />
          ))}
        </Box>
      </Stack>

      <Box
        sx={{
          bgcolor: '#F7F8FA',
          position: 'relative',
          left: `calc(${pageGutter} * -1)`,
          width: `calc(100% + (${pageGutter} * 2))`,
          alignSelf: 'stretch',
          py: { xs: 6, md: 8 },
          overflow: 'visible',
        }}
      >
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ px: pageGutter }}>
          <DetailSectionHeading
            title="Flow การใช้งานจริง"
            description="ภาพรวมการไหลของงานจริง ตั้งแต่รับข้อมูล ไปจนถึงทีมเห็นผลลัพธ์พร้อมใช้งาน"
            accent={palette.text}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
              gap: { xs: 1.5, md: 2.25 },
            }}
          >
            {workflowSteps.map((step, index) => (
              <VisualInfoCard
                key={step.label}
                title={step.title}
                description={step.description}
                imageUrl={getProjectVisualImage(project, index + 2)}
                accent={visual.accent}
                label={step.label}
                dark={index !== 1}
              />
            ))}
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(320px, 0.72fr) minmax(0, 1.28fr)' },
          gap: { xs: 3, md: 5, lg: 7 },
          alignItems: 'center',
        }}
      >
        <DetailSectionHeading
          title="ข้อมูลที่ระบบเชื่อมต่อได้"
          description="ทำให้ลูกค้าเห็นทันทีว่าระบบไม่ได้เป็นแค่หน้าจอสวย แต่ต่อกับข้อมูลจริงและเครื่องมือที่ใช้อยู่ได้"
          accent={visual.accent}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.25, md: 1.5 },
          }}
        >
          {connectionItems.map((item, index) => (
            <Box
              key={item}
              sx={{
                minHeight: { xs: 126, md: 148 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: { xs: 2, md: 2.35 },
                borderRadius: { xs: '22px', md: '28px' },
                bgcolor: index === 0 ? visual.accent : '#F7F8FA',
                color: palette.text,
                boxShadow: '0 18px 42px rgba(17,24,39,0.05)',
                transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -4px, 0)',
                  boxShadow: '0 22px 54px rgba(17,24,39,0.09)',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 34, md: 42 },
                  height: { xs: 34, md: 42 },
                  borderRadius: '50%',
                  bgcolor: index === 0 ? 'rgba(255,255,255,0.24)' : visual.tint,
                }}
              />
              <Typography
                sx={{
                  color: index === 0 ? '#FFFFFF' : palette.text,
                  fontSize: { xs: 21, md: 25 },
                  lineHeight: 1.08,
                  fontWeight: 700,
                  letterSpacing: 0,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: '#F7F8FA',
          position: 'relative',
          left: `calc(${pageGutter} * -1)`,
          width: `calc(100% + (${pageGutter} * 2))`,
          alignSelf: 'stretch',
          py: { xs: 6, md: 8 },
          px: pageGutter,
        }}
      >
        <Stack spacing={{ xs: 3, md: 4 }}>
          <DetailSectionHeading
            title="ผลลัพธ์ที่ลูกค้าจะได้"
            description="สรุปเป็นภาษาง่ายๆ ว่าหลังใช้งานแล้วทีมควรเห็นความเปลี่ยนแปลงตรงไหน"
            accent={palette.text}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            {outcomeCards.map((card, index) => (
              <VisualInfoCard
                key={`${card.title}-${index}`}
                title={card.title}
                description={card.description}
                imageUrl={getProjectVisualImage(project, index + 4)}
                accent={visual.accent}
                label={`ผลลัพธ์ ${String(index + 1).padStart(2, '0')}`}
                tall={index === 0}
                dark={index !== 1}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export function ProjectHighlightsSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#FFFFFF',
        py: { xs: 2, md: 3 },
        overflow: 'visible',
      }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>
        <DetailSectionHeading
          title="จุดเด่นของระบบ"
          description="เล่าเป็นภาพให้เห็นว่าสิ่งที่เด่นจริงของระบบนี้ช่วยให้งานง่ายขึ้นตรงไหน"
          accent={visual.accent}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 2.25 },
          }}
        >
          {project.highlights.map((highlight, index) => (
            <VisualInfoCard
              key={highlight}
              title={highlight}
              description={getOutcomeCards(project)[index]?.description ?? 'ออกแบบให้ทีมเข้าใจง่าย ใช้ซ้ำได้จริง และต่อยอดกับระบบเดิมของธุรกิจได้'}
              imageUrl={getProjectVisualImage(project, index + 6)}
              accent={visual.accent}
              label={String(index + 1).padStart(2, '0')}
              dark={index !== 1}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

export function ProjectCapabilitySection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const cards = getCapabilityCards(project);
  const { carouselRef, carouselState, scrollCards } = useDetailCarousel();
  const fallbackImages = Array.from(new Set([project.coverImageUrl, ...project.galleryImageUrls].filter(Boolean)));

  return (
    <Box
      sx={{
        bgcolor: '#F7F8FA',
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: { xs: 6, sm: 7, md: 8 },
        overflow: 'visible',
      }}
    >
      <Stack
        spacing={1.25}
        sx={{
          px: pageGutter,
          maxWidth: { xs: '100%', md: 900, lg: 980 },
          alignItems: 'flex-start',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
            whiteSpace: { sm: 'nowrap' },
          }}
        >
          ระบบทำอะไรได้บ้าง
        </Typography>
      </Stack>

      <Box
        ref={carouselRef}
        aria-label={`รายละเอียดการทำงานของ ${project.title}`}
        sx={{
          mt: 0,
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          overscrollBehaviorX: 'contain',
          pr: pageGutter,
          pt: detailCarouselVerticalGap,
          pb: { xs: 7, md: 8 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flex: '0 0 auto',
            width: pageGutter,
          }}
        />
        {cards.map((card, index) => {
          const imageUrl = fallbackImages[index % fallbackImages.length] ?? project.coverImageUrl;
          const detailRows = getCapabilityDetailRows(project, card);

          return (
            <Box
              key={card.title}
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: { xs: 'calc(100vw - 64px)', sm: 372, md: 372 },
                height: { xs: 620, md: 680 },
                overflow: 'hidden',
                borderRadius: '28px',
                bgcolor: '#000',
                color: '#fff',
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
                display: 'block',
                boxShadow: 'none',
                zIndex: 1,
                transform: 'translate3d(0, 0, 0)',
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
                willChange: 'transform',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 18px 40px rgba(17,24,39,0.14)',
                  zIndex: 2,
                },
                '&:hover img': {
                  transform: 'scale(1.035)',
                },
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={card.title}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1)',
                  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 30%, rgba(0,0,0,0.58) 58%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.24) 100%)',
                  zIndex: 1,
                }}
              />
              <Stack
                spacing={{ xs: 1.45, md: 2 }}
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  p: { xs: '28px', md: '32px' },
                  pr: { xs: '32px', md: '34px' },
                  m: { xs: '18px', md: '20px' },
                  borderRadius: '22px',
                  bgcolor: 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.68)',
                    fontSize: 17,
                    lineHeight: 1.353,
                    fontWeight: 700,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#fff',
                    ...typeScale.cardTitle,
                    maxWidth: 430,
                  }}
                >
                  {card.title}
                </Typography>
                <Stack
                  spacing={{ xs: 1.15, md: 1.25 }}
                  sx={{
                    pt: { xs: 0.35, md: 0.5 },
                  }}
                >
                  {detailRows.map((row) => (
                    <Box key={`${card.title}-${row.label}`}>
                      <Typography
                        sx={{
                          color: visual.accent,
                          fontSize: 13,
                          lineHeight: 1.231,
                          fontWeight: 700,
                          mb: 0.35,
                        }}
                      >
                        {row.label}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.78)',
                          fontSize: { xs: 15, md: 16 },
                          lineHeight: 1.38,
                          fontWeight: 500,
                        }}
                      >
                        {row.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Box>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: { xs: -4, md: -5 }, px: pageGutter, position: 'relative', zIndex: 2 }}
      >
        <Box
          component="button"
          type="button"
          aria-label="เลื่อนรายละเอียดการทำงานไปทางซ้าย"
          disabled={!carouselState.canScrollPrev}
          onClick={() => scrollCards(-1)}
          sx={carouselControlSx(carouselState.canScrollPrev)}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              ml: 0.5,
              borderRight: '3px solid currentColor',
              borderBottom: '3px solid currentColor',
              transform: 'rotate(135deg)',
            }}
          />
        </Box>
        <Box
          component="button"
          type="button"
          aria-label="เลื่อนรายละเอียดการทำงานไปทางขวา"
          disabled={!carouselState.canScrollNext}
          onClick={() => scrollCards(1)}
          sx={carouselControlSx(carouselState.canScrollNext)}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              mr: 0.5,
              borderRight: '3px solid currentColor',
              borderBottom: '3px solid currentColor',
              transform: 'rotate(-45deg)',
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export function ProjectTechSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(360px, 0.85fr) minmax(420px, 1fr)' },
        alignItems: 'center',
        gap: { xs: 4, md: 7, lg: 9 },
        mt: { xs: 1, md: 2 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Stack spacing={{ xs: 1.75, md: 2.25 }} sx={{ maxWidth: 620, alignItems: 'flex-start', textAlign: 'left' }}>
        <Typography
          variant="h2"
          sx={{
            color: visual.accent,
            ...typeScale.sectionTitle,
            fontWeight: 600,
          }}
        >
          เทคโนโลยีที่ใช้
        </Typography>
        <Typography
          sx={{
            maxWidth: 620,
            color: '#4B5563',
            ...typeScale.bodyLarge,
          }}
        >
          {getTechReason(project)}
        </Typography>
      </Stack>

      <Box
        aria-label={`เทคโนโลยีที่ใช้ใน ${project.title}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, minmax(0, 1fr))',
            sm: 'repeat(5, minmax(0, 1fr))',
          },
          gap: { xs: 1.25, sm: 1.5, md: 1.8 },
          justifySelf: { xs: 'stretch', md: 'end' },
          width: '100%',
          maxWidth: { xs: '100%', md: 520 },
        }}
      >
        {project.stack.map((item) => {
          const icon = techIcons[item] ?? { label: item.slice(0, 4) };

          return (
            <Box
              key={item}
              title={item}
              sx={{
                aspectRatio: '1 / 1',
                display: 'grid',
                placeItems: 'center',
                borderRadius: { xs: '18px', md: '20px' },
                bgcolor: '#F7F8FA',
                boxShadow: '0 16px 36px rgba(17,24,39,0.06)',
                transition:
                  'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 260ms ease, box-shadow 260ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -4px, 0)',
                  bgcolor: '#F3F4F6',
                  boxShadow: '0 20px 42px rgba(17,24,39,0.1)',
                },
              }}
            >
              {icon.src ? (
                <Box
                  component="img"
                  src={icon.src}
                  alt={item}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                  sx={{
                    width: { xs: 34, sm: 38, md: 44 },
                    height: { xs: 34, sm: 38, md: 44 },
                    objectFit: 'contain',
                    filter: icon.invert
                      ? 'invert(1) drop-shadow(0 10px 24px rgba(17,24,39,0.12))'
                      : 'drop-shadow(0 10px 24px rgba(17,24,39,0.12))',
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    color: visual.accent,
                    fontSize: { xs: 18, md: 21 },
                    lineHeight: 1,
                    fontWeight: 800,
                  }}
                >
                  {icon.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { createProject, uploadProjectImage, type Project } from './api/projects';
import { palette } from './theme';

type FormState = {
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  stack: string;
  highlights: string;
  published: boolean;
};

const initialForm: FormState = {
  title: '',
  subtitle: '',
  shortDescription: '',
  description: '',
  stack: '',
  highlights: '',
  published: true,
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function App() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [coverPreview, setCoverPreview] = useState('');

  const slug = useMemo(() => toSlug(form.title), [form.title]);

  useEffect(() => {
    if (!coverImage) {
      setCoverPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(coverImage);
    setCoverPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [coverImage]);

  function updateField(field: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setCoverImage(file);
  }

  function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    setGalleryImages(Array.from(event.target.files ?? []));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title || !form.subtitle || !form.shortDescription || !form.description || !slug) {
      setStatus('error');
      setMessage('Please complete title, subtitle, short description, and description.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const project = await createProject({
        slug,
        title: form.title,
        subtitle: form.subtitle,
        shortDescription: form.shortDescription,
        description: form.description,
        coverImageUrl: '',
        galleryImageUrls: [],
        stack: splitLines(form.stack),
        highlights: splitLines(form.highlights),
        published: form.published,
      });

      let latest = project;
      if (coverImage) {
        latest = await uploadProjectImage(project.id, coverImage);
      }
      for (const image of galleryImages) {
        latest = await uploadProjectImage(project.id, image);
      }

      setCreatedProject(latest);
      setStatus('success');
      setMessage('Project published successfully.');
      setForm(initialForm);
      setCoverImage(null);
      setGalleryImages([]);
    } catch {
      setStatus('error');
      setMessage('Could not save project. Check that the API is running.');
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: palette.softGray }}>
      <Box sx={{ bgcolor: '#111827', color: '#fff', py: 2 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: palette.primaryPink }} />
              <Typography fontWeight={800}>Baawork Studio Admin</Typography>
            </Stack>
            <Chip label="Add work" sx={{ bgcolor: palette.accentYellow, fontWeight: 800 }} />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h4" fontWeight={800}>
                    Add portfolio work
                  </Typography>
                  <Typography color="text.secondary">
                    Upload images and describe the system for the public showcase.
                  </Typography>
                </Box>

                {message && <Alert severity={status === 'success' ? 'success' : 'error'}>{message}</Alert>}

                <Button component="label" variant="outlined" sx={{ minHeight: 170, borderStyle: 'dashed', bgcolor: '#fff' }}>
                  {coverPreview ? (
                    <Box
                      component="img"
                      src={coverPreview}
                      alt="Cover preview"
                      sx={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 1 }}
                    />
                  ) : (
                    <Typography fontWeight={800}>Choose cover image</Typography>
                  )}
                  <input hidden type="file" accept="image/*" onChange={handleCoverChange} />
                </Button>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Project title" value={form.title} onChange={(event) => updateField('title', event.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Slug" value={slug} disabled />
                  </Grid>
                </Grid>

                <TextField fullWidth label="Subtitle" value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} />
                <TextField
                  fullWidth
                  label="Short description"
                  value={form.shortDescription}
                  onChange={(event) => updateField('shortDescription', event.target.value)}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  label="System description"
                  value={form.description}
                  onChange={(event) => updateField('description', event.target.value)}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Stack, one per line"
                  value={form.stack}
                  onChange={(event) => updateField('stack', event.target.value)}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Highlights, one per line"
                  value={form.highlights}
                  onChange={(event) => updateField('highlights', event.target.value)}
                />

                <Button component="label" variant="outlined">
                  Add gallery images
                  <input hidden multiple type="file" accept="image/*" onChange={handleGalleryChange} />
                </Button>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography fontWeight={700}>Publish immediately</Typography>
                  <Switch checked={form.published} onChange={(event) => updateField('published', event.target.checked)} />
                </Stack>

                <Button type="submit" variant="contained" size="large" disabled={status === 'saving'}>
                  {status === 'saving' ? 'Saving...' : 'Publish work'}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, position: 'sticky', top: 24 }}>
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight={800}>
                  Preview
                </Typography>
                <Box sx={{ minHeight: 260, borderRadius: 2, bgcolor: '#fff', border: `1px solid ${palette.border}`, overflow: 'hidden' }}>
                  {coverPreview ? (
                    <Box component="img" src={coverPreview} alt="Preview" sx={{ width: '100%', height: 260, objectFit: 'cover' }} />
                  ) : (
                    <Box sx={{ height: 260, display: 'grid', placeItems: 'center', bgcolor: palette.accentYellow }}>
                      <Typography fontWeight={900}>Image preview</Typography>
                    </Box>
                  )}
                </Box>
                <Typography variant="h4" fontWeight={900}>
                  {form.title || 'Project title'}
                </Typography>
                <Typography color="text.secondary">{form.shortDescription || 'Short description appears here.'}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {splitLines(form.stack).map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: palette.accentYellow, fontWeight: 800 }} />
                  ))}
                </Stack>
                {createdProject && <Alert severity="success">Last created: {createdProject.title}</Alert>}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

import type { Project } from '../api/projects';

export const fallbackProjects: Project[] = [
  {
    id: 'demo-1',
    slug: 'baawork-command-center',
    title: 'Baawork Command Center',
    subtitle: 'Operations dashboard for service teams',
    shortDescription:
      'A polished operating system for tracking work, requests, and delivery status.',
    description:
      'Baawork Command Center brings project status, service requests, and operational context into one fast interface. The system is designed for teams that need clean visibility without exposing unnecessary complexity.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    ],
    stack: ['React', 'Go', 'PostgreSQL', 'Redis'],
    highlights: [
      'Real-time operational visibility',
      'Clean case workflow for daily teams',
      'Responsive interface for repeated use',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    slug: 'studio-booking-flow',
    title: 'Studio Booking Flow',
    subtitle: 'Reservation flow for creative services',
    shortDescription:
      'A direct booking experience that keeps choices clear and confirmation fast.',
    description:
      'This booking system focuses on reducing friction between discovery, service selection, and confirmation. The interface keeps the visual language premium while staying practical for daily business operations.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    ],
    stack: ['Vite', 'MUI', 'Axios', 'Gin'],
    highlights: [
      'Simple service selection',
      'Image-led presentation',
      'Fast API-backed publishing',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

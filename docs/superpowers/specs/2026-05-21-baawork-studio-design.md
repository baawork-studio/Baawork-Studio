# Baawork Studio Project Design

Date: 2026-05-21

## Goal

Build the Baawork Studio portfolio system across three repositories:

- `Baawork-Studio`: public portfolio website for showcasing project work.
- `Baawork-Studio-Admin`: admin interface for adding portfolio projects.
- `Baawork-Studio-Api`: backend API and persistence layer.

The public site should not include login. The admin repository should only include the add-work management surface.

## Visual Direction

Use a hybrid UI direction:

- A: Apple-like public showcase for the public home page.
- B: Editorial portfolio detail page after selecting a project.
- C: Admin-first add-work interface for the admin repository.

The public UX flow is:

1. User lands on `Baawork-Studio`.
2. The home page presents a polished Apple-like showcase with strong project visuals.
3. User clicks a project card.
4. User lands on a detail/case-study page with richer images, system description, stack, and project highlights.

The admin UX flow is:

1. Admin opens `Baawork-Studio-Admin`.
2. Admin adds a project using one focused page.
3. Admin enters title, short description, detailed system description, technology stack, highlights, and image assets.
4. Admin publishes the project so it appears on the public site.

## Theme

Use the requested palette:

| Role | Color | Usage |
| --- | --- | --- |
| Background | `#FFFFFF` | Main page background |
| Text | `#111827` | Primary text |
| Primary Pink | `#FF008C` | CTA, logo, active states |
| Accent Yellow | `#F5FF00` | Highlights and small accent elements |
| Soft Gray | `#F3F4F6` | Sections and card backgrounds |
| Border | `#E5E7EB` | Dividers and outlines |

Keep the interface clean, spacious, and product-like. Avoid login screens, marketing filler, and unnecessary dashboard features.

## Frontend Architecture

Both frontend repositories use:

- Vite
- React
- TypeScript
- MUI
- Axios

`Baawork-Studio` pages:

- Home page: Apple-like showcase, featured hero, project grid, selected work sections, contact CTA.
- Project detail page: editorial case-study layout, image gallery, project description, stack, highlights.
- Error/loading states: simple empty/loading/error presentation for API failures.

`Baawork-Studio-Admin` pages:

- Add work page only.
- Image-first project form.
- Project preview or existing recent project list may be shown only if it supports adding work.
- No login page.

## Backend Architecture

`Baawork-Studio-Api` uses:

- Go
- Gin
- PostgreSQL
- Redis

Primary resources:

- Portfolio project
- Project images

API endpoints:

- `GET /health`: API health check.
- `GET /api/v1/projects`: list published projects for the public site.
- `GET /api/v1/projects/:slug`: fetch a single public project detail.
- `POST /api/v1/projects`: create a project from admin.
- `POST /api/v1/projects/:id/images`: upload or attach images for a project.

Redis can cache public project list/detail responses. PostgreSQL remains the source of truth.

## Data Model

Project fields:

- `id`
- `slug`
- `title`
- `subtitle`
- `shortDescription`
- `description`
- `coverImageUrl`
- `galleryImageUrls`
- `stack`
- `highlights`
- `published`
- `createdAt`
- `updatedAt`

Images may initially be stored as URL strings or local static upload paths, depending on repository setup. The API contract should keep image fields explicit so storage can be changed later without redesigning the frontend.

## Error Handling

Frontend:

- Show loading states while fetching projects.
- Show a clear empty state if no projects exist.
- Show a compact error state if the API is unavailable.
- Validate admin form fields before submit.

Backend:

- Return structured JSON errors.
- Validate required project fields.
- Return `404` for missing project slugs.
- Return `400` for invalid admin payloads.
- Keep CORS configured for local frontend/admin development.

## Testing And Verification

Implementation should verify:

- Public site builds successfully.
- Admin app builds successfully.
- API compiles and health endpoint responds.
- Project list/detail endpoints return expected JSON.
- Admin form can submit a project to the API.
- Browser check confirms the public Apple-like home page, detail page, and admin add-work page render correctly.

## Out Of Scope

- Authentication and login screens.
- Multi-user admin permissions.
- Payments.
- CMS integration.
- Complex analytics.

These can be added later, but the initial implementation should stay focused on portfolio showcase and project creation.

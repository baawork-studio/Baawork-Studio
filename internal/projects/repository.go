package projects

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) Repository {
	return Repository{db: db}
}

func (r Repository) ListPublished(ctx context.Context) ([]Project, error) {
	rows, err := r.db.Query(ctx, `
		select id::text, slug, title, subtitle, short_description, description, cover_image_url,
		       gallery_image_urls, stack, highlights, published, created_at, updated_at
		from projects
		where published = true
		order by created_at desc
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	projects := make([]Project, 0)
	for rows.Next() {
		project, err := scanProject(rows)
		if err != nil {
			return nil, err
		}
		projects = append(projects, project)
	}
	return projects, rows.Err()
}

func (r Repository) FindPublishedBySlug(ctx context.Context, slug string) (Project, error) {
	row := r.db.QueryRow(ctx, `
		select id::text, slug, title, subtitle, short_description, description, cover_image_url,
		       gallery_image_urls, stack, highlights, published, created_at, updated_at
		from projects
		where slug = $1 and published = true
	`, slug)

	project, err := scanProject(row)
	if errors.Is(err, pgx.ErrNoRows) {
		return Project{}, pgx.ErrNoRows
	}
	return project, err
}

func (r Repository) Create(ctx context.Context, request CreateProjectRequest) (Project, error) {
	published := true
	if request.Published != nil {
		published = *request.Published
	}

	row := r.db.QueryRow(ctx, `
		insert into projects (
			slug, title, subtitle, short_description, description, cover_image_url,
			gallery_image_urls, stack, highlights, published
		)
		values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		returning id::text, slug, title, subtitle, short_description, description, cover_image_url,
		          gallery_image_urls, stack, highlights, published, created_at, updated_at
	`, request.Slug, request.Title, request.Subtitle, request.ShortDescription, request.Description,
		request.CoverImageURL, request.GalleryImageURLs, request.Stack, request.Highlights, published)

	return scanProject(row)
}

func (r Repository) AddImage(ctx context.Context, id string, imageURL string) (Project, error) {
	row := r.db.QueryRow(ctx, `
		update projects
		set gallery_image_urls = array_append(gallery_image_urls, $2),
		    cover_image_url = case when cover_image_url = '' then $2 else cover_image_url end,
		    updated_at = now()
		where id = $1
		returning id::text, slug, title, subtitle, short_description, description, cover_image_url,
		          gallery_image_urls, stack, highlights, published, created_at, updated_at
	`, id, imageURL)

	return scanProject(row)
}

type projectScanner interface {
	Scan(dest ...any) error
}

func scanProject(scanner projectScanner) (Project, error) {
	var project Project
	err := scanner.Scan(
		&project.ID,
		&project.Slug,
		&project.Title,
		&project.Subtitle,
		&project.ShortDescription,
		&project.Description,
		&project.CoverImageURL,
		&project.GalleryImageURLs,
		&project.Stack,
		&project.Highlights,
		&project.Published,
		&project.CreatedAt,
		&project.UpdatedAt,
	)
	return project, err
}

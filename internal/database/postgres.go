package database

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect(ctx context.Context, databaseURL string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return nil, err
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, err
	}
	return pool, nil
}

func EnsureSchema(ctx context.Context, pool *pgxpool.Pool) error {
	_, err := pool.Exec(ctx, `
		create table if not exists projects (
			id uuid primary key default gen_random_uuid(),
			slug text not null unique,
			title text not null,
			subtitle text not null,
			short_description text not null,
			description text not null,
			cover_image_url text not null,
			gallery_image_urls text[] not null default '{}',
			stack text[] not null default '{}',
			highlights text[] not null default '{}',
			published boolean not null default true,
			created_at timestamptz not null default now(),
			updated_at timestamptz not null default now()
		);
		create index if not exists projects_published_idx on projects (published, created_at desc);
	`)
	return err
}

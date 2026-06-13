package projects

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
)

type Cache struct {
	redis *redis.Client
}

func NewCache(redisClient *redis.Client) Cache {
	return Cache{redis: redisClient}
}

func (c Cache) GetProjects(ctx context.Context) ([]Project, bool) {
	value, err := c.redis.Get(ctx, "projects:published").Result()
	if err != nil {
		return nil, false
	}
	var projects []Project
	if err := json.Unmarshal([]byte(value), &projects); err != nil {
		return nil, false
	}
	return projects, true
}

func (c Cache) SetProjects(ctx context.Context, projects []Project) {
	value, err := json.Marshal(projects)
	if err != nil {
		return
	}
	c.redis.Set(ctx, "projects:published", value, 5*time.Minute)
}

func (c Cache) GetProject(ctx context.Context, slug string) (Project, bool) {
	value, err := c.redis.Get(ctx, "projects:slug:"+slug).Result()
	if err != nil {
		return Project{}, false
	}
	var project Project
	if err := json.Unmarshal([]byte(value), &project); err != nil {
		return Project{}, false
	}
	return project, true
}

func (c Cache) SetProject(ctx context.Context, project Project) {
	value, err := json.Marshal(project)
	if err != nil {
		return
	}
	c.redis.Set(ctx, "projects:slug:"+project.Slug, value, 5*time.Minute)
}

func (c Cache) ClearPublic(ctx context.Context) {
	c.redis.Del(ctx, "projects:published")
}

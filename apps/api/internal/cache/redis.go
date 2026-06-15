package cache

import (
	"context"

	"github.com/redis/go-redis/v9"
)

func Connect(ctx context.Context, redisURL string, addr string, password string) (*redis.Client, error) {
	options := &redis.Options{
		Addr:     addr,
		Password: password,
		DB:       0,
	}

	if redisURL != "" {
		parsedOptions, err := redis.ParseURL(redisURL)
		if err != nil {
			return nil, err
		}
		options = parsedOptions
	}

	client := redis.NewClient(options)
	if err := client.Ping(ctx).Err(); err != nil {
		return nil, err
	}
	return client, nil
}

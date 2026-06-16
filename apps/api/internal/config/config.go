package config

import "os"

type Config struct {
	Port           string
	DatabaseURL    string
	RedisURL       string
	RedisAddr      string
	RedisPassword  string
	UploadDir      string
	PublicBaseURL  string
	AllowedOrigins string
	AdminUsername  string
	AdminPassword  string
	SessionSecret  string
}

func Load() Config {
	return Config{
		Port:           getEnv("PORT", "8080"),
		DatabaseURL:    getEnv("DATABASE_URL", "postgres://baawork:baawork@localhost:55432/baawork_studio?sslmode=disable"),
		RedisURL:       getEnv("REDIS_URL", ""),
		RedisAddr:      getEnv("REDIS_ADDR", "localhost:6379"),
		RedisPassword:  getEnv("REDIS_PASSWORD", ""),
		UploadDir:      getEnv("UPLOAD_DIR", "uploads"),
		PublicBaseURL:  getEnv("PUBLIC_BASE_URL", "http://localhost:8080"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174"),
		AdminUsername:  getEnv("ADMIN_USERNAME", ""),
		AdminPassword:  getEnv("ADMIN_PASSWORD", ""),
		SessionSecret:  getEnv("ADMIN_SESSION_SECRET", ""),
	}
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

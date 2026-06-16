package server

import (
	"net/http"
	"os"
	"strings"

	"baawork-studio-api/internal/config"
	"baawork-studio-api/internal/projects"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func NewRouter(cfg config.Config, db *pgxpool.Pool, redisClient *redis.Client) *gin.Engine {
	_ = os.MkdirAll(cfg.UploadDir, 0o755)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     parseAllowedOrigins(cfg.AllowedOrigins),
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: false,
	}))

	repository := projects.NewRepository(db)
	cache := projects.NewCache(redisClient)
	handler := projects.NewHandler(repository, cache, cfg.UploadDir, cfg.PublicBaseURL)

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
	router.Static("/uploads", cfg.UploadDir)

	v1 := router.Group("/api/v1")
	{
		v1.POST("/admin/login", adminLoginHandler(cfg.AdminUsername, cfg.AdminPassword, cfg.SessionSecret))
		v1.GET("/projects", handler.List)
		v1.GET("/projects/:slug", handler.Detail)

		admin := v1.Group("", adminAuth(cfg.SessionSecret))
		admin.POST("/projects", handler.Create)
		admin.POST("/projects/:id/images", handler.UploadImage)
	}

	return router
}

func parseAllowedOrigins(value string) []string {
	origins := []string{}
	for _, origin := range strings.Split(value, ",") {
		origin = strings.TrimSpace(origin)
		if origin != "" {
			origins = append(origins, origin)
		}
	}
	return origins
}

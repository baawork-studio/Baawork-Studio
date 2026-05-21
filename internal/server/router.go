package server

import (
	"net/http"
	"os"

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
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:5174"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
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
		v1.GET("/projects", handler.List)
		v1.GET("/projects/:slug", handler.Detail)
		v1.POST("/projects", handler.Create)
		v1.POST("/projects/:id/images", handler.UploadImage)
	}

	return router
}

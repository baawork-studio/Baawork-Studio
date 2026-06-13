package projects

import (
	"errors"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

type Handler struct {
	repository    Repository
	cache         Cache
	uploadDir     string
	publicBaseURL string
}

func NewHandler(repository Repository, cache Cache, uploadDir string, publicBaseURL string) Handler {
	return Handler{
		repository:    repository,
		cache:         cache,
		uploadDir:     uploadDir,
		publicBaseURL: strings.TrimRight(publicBaseURL, "/"),
	}
}

func (h Handler) List(c *gin.Context) {
	ctx := c.Request.Context()
	if cached, ok := h.cache.GetProjects(ctx); ok {
		c.JSON(http.StatusOK, cached)
		return
	}

	items, err := h.repository.ListPublished(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to list projects"})
		return
	}
	h.cache.SetProjects(ctx, items)
	c.JSON(http.StatusOK, items)
}

func (h Handler) Detail(c *gin.Context) {
	ctx := c.Request.Context()
	slug := c.Param("slug")

	if cached, ok := h.cache.GetProject(ctx, slug); ok {
		c.JSON(http.StatusOK, cached)
		return
	}

	project, err := h.repository.FindPublishedBySlug(ctx, slug)
	if errors.Is(err, pgx.ErrNoRows) {
		c.JSON(http.StatusNotFound, ErrorResponse{Error: "project not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to fetch project"})
		return
	}

	h.cache.SetProject(ctx, project)
	c.JSON(http.StatusOK, project)
}

func (h Handler) Create(c *gin.Context) {
	var request CreateProjectRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid project payload"})
		return
	}

	project, err := h.repository.Create(c.Request.Context(), request)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "failed to create project"})
		return
	}

	h.cache.ClearPublic(c.Request.Context())
	c.JSON(http.StatusCreated, project)
}

func (h Handler) UploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "image file is required"})
		return
	}

	filename := filepath.Base(file.Filename)
	target := filepath.Join(h.uploadDir, filename)
	if err := c.SaveUploadedFile(file, target); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to save image"})
		return
	}

	imageURL := h.publicBaseURL + "/uploads/" + filename
	project, err := h.repository.AddImage(c.Request.Context(), c.Param("id"), imageURL)
	if errors.Is(err, pgx.ErrNoRows) {
		c.JSON(http.StatusNotFound, ErrorResponse{Error: "project not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to attach image"})
		return
	}

	h.cache.ClearPublic(c.Request.Context())
	c.JSON(http.StatusOK, project)
}

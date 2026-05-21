package projects

import "time"

type Project struct {
	ID               string    `json:"id"`
	Slug             string    `json:"slug"`
	Title            string    `json:"title"`
	Subtitle         string    `json:"subtitle"`
	ShortDescription string    `json:"shortDescription"`
	Description      string    `json:"description"`
	CoverImageURL    string    `json:"coverImageUrl"`
	GalleryImageURLs []string  `json:"galleryImageUrls"`
	Stack            []string  `json:"stack"`
	Highlights       []string  `json:"highlights"`
	Published        bool      `json:"published"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

type CreateProjectRequest struct {
	Slug             string   `json:"slug" binding:"required"`
	Title            string   `json:"title" binding:"required"`
	Subtitle         string   `json:"subtitle" binding:"required"`
	ShortDescription string   `json:"shortDescription" binding:"required"`
	Description      string   `json:"description" binding:"required"`
	CoverImageURL    string   `json:"coverImageUrl"`
	GalleryImageURLs []string `json:"galleryImageUrls"`
	Stack            []string `json:"stack"`
	Highlights       []string `json:"highlights"`
	Published        *bool    `json:"published"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

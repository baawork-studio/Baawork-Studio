package server

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestAdminAuthRequiresCredentials(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.New()
	router.POST("/admin", adminAuth("admin", "secret"), func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	request := httptest.NewRequest(http.MethodPost, "/admin", nil)
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusUnauthorized {
		t.Fatalf("expected status %d, got %d", http.StatusUnauthorized, response.Code)
	}
}

func TestAdminAuthAllowsValidCredentials(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.New()
	router.POST("/admin", adminAuth("admin", "secret"), func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	request := httptest.NewRequest(http.MethodPost, "/admin", nil)
	request.SetBasicAuth("admin", "secret")
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusNoContent {
		t.Fatalf("expected status %d, got %d", http.StatusNoContent, response.Code)
	}
}

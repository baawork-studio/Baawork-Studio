package server

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
)

func TestAdminAuthRequiresBearerToken(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.New()
	router.POST("/admin", adminAuth("session-secret"), func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	request := httptest.NewRequest(http.MethodPost, "/admin", nil)
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusUnauthorized {
		t.Fatalf("expected status %d, got %d", http.StatusUnauthorized, response.Code)
	}
}

func TestAdminAuthAllowsValidSessionToken(t *testing.T) {
	gin.SetMode(gin.TestMode)

	token, err := signAdminToken(adminTokenPayload{
		Subject:   "admin",
		ExpiresAt: time.Now().Add(time.Hour).Unix(),
	}, "session-secret")
	if err != nil {
		t.Fatalf("sign token: %v", err)
	}

	router := gin.New()
	router.POST("/admin", adminAuth("session-secret"), func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	request := httptest.NewRequest(http.MethodPost, "/admin", nil)
	request.Header.Set("Authorization", "Bearer "+token)
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusNoContent {
		t.Fatalf("expected status %d, got %d", http.StatusNoContent, response.Code)
	}
}

func TestVerifyAdminTokenRejectsExpiredToken(t *testing.T) {
	token, err := signAdminToken(adminTokenPayload{
		Subject:   "admin",
		ExpiresAt: time.Now().Add(-time.Hour).Unix(),
	}, "session-secret")
	if err != nil {
		t.Fatalf("sign token: %v", err)
	}

	if _, err := verifyAdminToken(token, "session-secret", time.Now()); err == nil {
		t.Fatal("expected expired token to be rejected")
	}
}

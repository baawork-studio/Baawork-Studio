package server

import (
	"crypto/hmac"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

const adminSessionTTL = 12 * time.Hour

type adminLoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type adminLoginResponse struct {
	Token     string `json:"token"`
	ExpiresAt int64  `json:"expiresAt"`
}

type adminTokenPayload struct {
	Subject   string `json:"sub"`
	ExpiresAt int64  `json:"exp"`
}

func adminLoginHandler(username string, password string, sessionSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if username == "" || password == "" || sessionSecret == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "admin auth is not configured"})
			return
		}

		var request adminLoginRequest
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid login payload"})
			return
		}

		if subtle.ConstantTimeCompare([]byte(request.Username), []byte(username)) != 1 ||
			subtle.ConstantTimeCompare([]byte(request.Password), []byte(password)) != 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		expiresAt := time.Now().Add(adminSessionTTL).Unix()
		token, err := signAdminToken(adminTokenPayload{
			Subject:   request.Username,
			ExpiresAt: expiresAt,
		}, sessionSecret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session"})
			return
		}

		c.JSON(http.StatusOK, adminLoginResponse{
			Token:     token,
			ExpiresAt: expiresAt,
		})
	}
}

func adminAuth(sessionSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if sessionSecret == "" {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "admin auth is not configured"})
			return
		}

		token := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		if _, err := verifyAdminToken(token, sessionSecret, time.Now()); err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		c.Next()
	}
}

func signAdminToken(payload adminTokenPayload, secret string) (string, error) {
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	encodedPayload := base64.RawURLEncoding.EncodeToString(payloadBytes)
	signature := signAdminPayload(encodedPayload, secret)
	return encodedPayload + "." + signature, nil
}

func verifyAdminToken(token string, secret string, now time.Time) (adminTokenPayload, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 2 {
		return adminTokenPayload{}, errors.New("invalid token")
	}

	expectedSignature := signAdminPayload(parts[0], secret)
	if subtle.ConstantTimeCompare([]byte(parts[1]), []byte(expectedSignature)) != 1 {
		return adminTokenPayload{}, errors.New("invalid signature")
	}

	payloadBytes, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return adminTokenPayload{}, err
	}

	var payload adminTokenPayload
	if err := json.Unmarshal(payloadBytes, &payload); err != nil {
		return adminTokenPayload{}, err
	}

	if payload.ExpiresAt <= now.Unix() {
		return adminTokenPayload{}, errors.New("expired token")
	}

	return payload, nil
}

func signAdminPayload(encodedPayload string, secret string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(encodedPayload))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

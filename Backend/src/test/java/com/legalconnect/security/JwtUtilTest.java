package com.legalconnect.security;

import com.legalconnect.entity.enums.UserRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private final String validSecret = "legalconnect_super_secret_key_for_jwt_token_generation_2026_secure_key_min_256_bits!";
    private final long expirationMs = 3600000; // 1 hour

    @Test
    @DisplayName("Should generate and validate JWT token successfully")
    void testTokenGenerationAndValidation() {
        JwtUtil jwtUtil = new JwtUtil(validSecret, expirationMs);

        String token = jwtUtil.generateToken("user-1", "user@demo.com", UserRole.USER, "Ananya Mehta");

        assertNotNull(token);
        assertFalse(token.isEmpty());

        assertEquals("user@demo.com", jwtUtil.extractEmail(token));
        assertEquals("user-1", jwtUtil.extractUserId(token));
        assertEquals("USER", jwtUtil.extractRole(token));
        assertTrue(jwtUtil.validateToken(token, "user@demo.com"));
        assertFalse(jwtUtil.validateToken(token, "wrong@demo.com"));
    }

    @Test
    @DisplayName("Should handle empty or short secret gracefully by using secure default fallback")
    void testEmptySecretFallback() {
        // When secret is empty or less than 32 bytes, it should not throw WeakKeyException
        assertDoesNotThrow(() -> {
            JwtUtil jwtUtil = new JwtUtil("", expirationMs);
            String token = jwtUtil.generateToken("user-1", "user@demo.com", UserRole.USER, "Ananya Mehta");
            assertNotNull(token);
            assertTrue(jwtUtil.validateToken(token, "user@demo.com"));
        });
    }
}


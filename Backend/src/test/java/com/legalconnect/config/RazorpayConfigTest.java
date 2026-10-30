package com.legalconnect.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RazorpayConfigTest {

    @Autowired
    private RazorpayConfig razorpayConfig;

    @Test
    @DisplayName("Should load Razorpay TEST credentials and confirm client configured")
    void testCredentialsLoaded() {
        assertTrue(razorpayConfig.isConfigured(), "RazorpayConfig must be configured");
        assertFalse(razorpayConfig.getKeyId().isEmpty(), "Key ID must not be empty");
        assertFalse(razorpayConfig.getKeySecret().isEmpty(), "Key Secret must not be empty");
        assertTrue(razorpayConfig.getKeyId().startsWith("rzp_test_"), "Must be a Razorpay TEST key");
        assertNotNull(razorpayConfig.getClient(), "RazorpayClient instance must initialize");
    }
}

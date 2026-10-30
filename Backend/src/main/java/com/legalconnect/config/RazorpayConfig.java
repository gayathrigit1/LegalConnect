package com.legalconnect.config;

import com.legalconnect.exception.BadRequestException;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.nio.charset.StandardCharsets;

@Configuration
public class RazorpayConfig {

    private static final Logger logger = LoggerFactory.getLogger(RazorpayConfig.class);

    private final Environment environment;

    @Value("${razorpay.key.id:}")
    private String keyId;

    @Value("${razorpay.key.secret:}")
    private String keySecret;

    @Value("${razorpay.webhook.secret:}")
    private String webhookSecret;

    private RazorpayClient client;

    public RazorpayConfig() {
        this.environment = null;
    }

    public RazorpayConfig(Environment environment) {
        this.environment = environment;
    }

    @PostConstruct
    void initAndLogConfiguration() {
        resolveCredentialsIfEmpty();

        if (isConfigured()) {
            // Key ID is public (used by checkout). Never log key/webhook secrets.
            String id = getKeyId();
            String prefix = id.length() <= 8 ? id : id.substring(0, 8);
            logger.info("Razorpay TEST credentials loaded (keyId prefix: {}…, webhookSecret configured: {})",
                    prefix, !getWebhookSecret().isEmpty());
        } else {
            logger.warn("Razorpay credentials not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Backend/.env (or OS env), then restart.");
        }
    }

    /**
     * Resolves credentials from Spring Environment, JVM system properties, OS environment variables,
     * or by reading .env directly if property injection resulted in empty values.
     */
    private void resolveCredentialsIfEmpty() {
        if (keyId == null || keyId.trim().isEmpty()) {
            keyId = findProperty("RAZORPAY_KEY_ID", "razorpay.key.id");
        }
        if (keySecret == null || keySecret.trim().isEmpty()) {
            keySecret = findProperty("RAZORPAY_KEY_SECRET", "razorpay.key.secret");
        }
        if (webhookSecret == null || webhookSecret.trim().isEmpty()) {
            webhookSecret = findProperty("RAZORPAY_WEBHOOK_SECRET", "razorpay.webhook.secret");
        }

        // Direct .env file fallback
        if (!isConfigured()) {
            loadFromDotEnvDirectly();
        }
    }

    private String findProperty(String... keys) {
        for (String k : keys) {
            String val = environment != null ? environment.getProperty(k) : null;
            if (val != null && !val.trim().isEmpty()) return val.trim();
            val = System.getProperty(k);
            if (val != null && !val.trim().isEmpty()) return val.trim();
            val = System.getenv(k);
            if (val != null && !val.trim().isEmpty()) return val.trim();
        }
        return "";
    }

    private void loadFromDotEnvDirectly() {
        String userDir = System.getProperty("user.dir", ".");
        String[] candidatePaths = {
            ".env",
            "Backend/.env",
            "../Backend/.env",
            userDir + "/.env",
            userDir + "/Backend/.env",
            userDir + "/../Backend/.env"
        };
        for (String path : candidatePaths) {
            File f = new File(path);
            if (f.exists() && f.isFile()) {
                try (BufferedReader reader = new BufferedReader(new FileReader(f, StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) continue;
                        int eqIdx = line.indexOf('=');
                        if (eqIdx <= 0) continue;
                        String k = line.substring(0, eqIdx).trim();
                        String v = line.substring(eqIdx + 1).trim();
                        if ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("'") && v.endsWith("'"))) {
                            if (v.length() >= 2) v = v.substring(1, v.length() - 1).trim();
                        }
                        if ("RAZORPAY_KEY_ID".equalsIgnoreCase(k) && (keyId == null || keyId.trim().isEmpty())) {
                            keyId = v;
                        } else if ("RAZORPAY_KEY_SECRET".equalsIgnoreCase(k) && (keySecret == null || keySecret.trim().isEmpty())) {
                            keySecret = v;
                        } else if ("RAZORPAY_WEBHOOK_SECRET".equalsIgnoreCase(k) && (webhookSecret == null || webhookSecret.trim().isEmpty())) {
                            webhookSecret = v;
                        }
                    }
                } catch (Exception ignored) {
                }
                if (isConfigured()) break;
            }
        }
    }

    public synchronized RazorpayClient getClient() {
        if (!isConfigured()) {
            resolveCredentialsIfEmpty();
        }
        if (!isConfigured()) {
            throw new BadRequestException(
                    "Razorpay TEST credentials are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Backend/.env (or as environment variables)."
            );
        }
        if (client == null) {
            try {
                client = new RazorpayClient(getKeyId(), getKeySecret());
                logger.info("Razorpay client initialized in TEST mode");
            } catch (RazorpayException e) {
                logger.error("Failed to initialize RazorpayClient: {}", e.getMessage());
                throw new BadRequestException("Failed to initialize Razorpay client");
            }
        }
        return client;
    }

    public boolean isConfigured() {
        return !getKeyId().isEmpty() && !getKeySecret().isEmpty();
    }

    /** Public Key ID — safe to send to the browser for Razorpay Checkout. */
    public String getKeyId() {
        return keyId != null ? keyId.trim() : "";
    }

    /** Server-only secret — never expose via API responses or logs. */
    public String getKeySecret() {
        return keySecret != null ? keySecret.trim() : "";
    }

    /** Server-only webhook signing secret — never expose via API responses or logs. */
    public String getWebhookSecret() {
        return webhookSecret != null ? webhookSecret.trim() : "";
    }
}

package com.legalconnect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class LegalConnectApplication {

    private static final Logger log = LoggerFactory.getLogger(LegalConnectApplication.class);

    public static void main(String[] args) {
        loadDotEnv();
        SpringApplication.run(LegalConnectApplication.class, args);
    }

    /**
     * Loads environment variables from .env file into System properties before Spring Boot boots up.
     * Searches in current working directory, Backend/ subdirectory, and parent paths.
     */
    public static void loadDotEnv() {
        String userDir = System.getProperty("user.dir", ".");
        String[] candidatePaths = {
            ".env",
            "Backend/.env",
            "../Backend/.env",
            userDir + "/.env",
            userDir + "/Backend/.env",
            userDir + "/../Backend/.env"
        };

        File envFile = null;
        for (String path : candidatePaths) {
            File f = new File(path);
            if (f.exists() && f.isFile()) {
                envFile = f;
                break;
            }
        }

        if (envFile == null) {
            log.info("No .env file found in search paths; relying on environment variables or application.properties");
            return;
        }

        log.info("Loading environment configuration from: {}", envFile.getAbsolutePath());

        try (BufferedReader reader = new BufferedReader(new FileReader(envFile, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }
                int eqIdx = line.indexOf('=');
                if (eqIdx <= 0) {
                    continue;
                }
                String key = line.substring(0, eqIdx).trim();
                String value = line.substring(eqIdx + 1).trim();

                // Strip optional surrounding single or double quotes
                if ((value.startsWith("\"") && value.endsWith("\"")) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    if (value.length() >= 2) {
                        value = value.substring(1, value.length() - 1).trim();
                    }
                }

                // Populate JVM system property if not already set by OS environment
                if (System.getenv(key) == null && System.getProperty(key) == null) {
                    System.setProperty(key, value);
                }

                // Explicitly map keys to Spring property conventions
                if ("RAZORPAY_KEY_ID".equalsIgnoreCase(key)) {
                    if (System.getProperty("razorpay.key.id") == null) {
                        System.setProperty("razorpay.key.id", value);
                    }
                } else if ("RAZORPAY_KEY_SECRET".equalsIgnoreCase(key)) {
                    if (System.getProperty("razorpay.key.secret") == null) {
                        System.setProperty("razorpay.key.secret", value);
                    }
                } else if ("RAZORPAY_WEBHOOK_SECRET".equalsIgnoreCase(key)) {
                    if (System.getProperty("razorpay.webhook.secret") == null) {
                        System.setProperty("razorpay.webhook.secret", value);
                    }
                } else if ("SPRING_DATASOURCE_URL".equalsIgnoreCase(key)) {
                    if (System.getProperty("spring.datasource.url") == null) {
                        System.setProperty("spring.datasource.url", value);
                    }
                } else if ("SPRING_DATASOURCE_USERNAME".equalsIgnoreCase(key)) {
                    if (System.getProperty("spring.datasource.username") == null) {
                        System.setProperty("spring.datasource.username", value);
                    }
                } else if ("SPRING_DATASOURCE_PASSWORD".equalsIgnoreCase(key)) {
                    if (System.getProperty("spring.datasource.password") == null) {
                        System.setProperty("spring.datasource.password", value);
                    }
                } else if ("JWT_SECRET".equalsIgnoreCase(key)) {
                    if (System.getProperty("app.jwt.secret") == null) {
                        System.setProperty("app.jwt.secret", value);
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Could not read .env file: {}", e.getMessage());
        }
    }
}

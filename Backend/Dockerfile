# ==========================================
# STAGE 1: Build Application
# ==========================================
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /app

# Copy Maven wrapper and POM first for layer caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Ensure Maven wrapper is executable
RUN chmod +x mvnw

# Download dependencies (cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline -B

# Copy application source code
COPY src/ src/

# Build production JAR (skipping tests for fast container packaging)
RUN ./mvnw clean package -DskipTests

# ==========================================
# STAGE 2: Lightweight Runtime Environment
# ==========================================
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Run as non-root user for security
RUN useradd -m -s /bin/bash appuser && chown -R appuser:appuser /app
USER appuser

# Copy generated JAR from builder stage
COPY --from=builder --chown=appuser:appuser /app/target/legalconnect-backend-1.0.0.jar app.jar

# Render provides the PORT environment variable dynamically (defaults to 8080)
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

# Execute Spring Boot application with dynamic PORT and production profile
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-prod} -jar app.jar"]


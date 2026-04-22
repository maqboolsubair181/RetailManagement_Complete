# ─── Build stage ───────────────────────────────────────────────────────────────
FROM maven:3.8.6-openjdk-11 AS build
WORKDIR /app

# Copy POM first to cache dependency layer
COPY pom.xml .
RUN mvn dependency:go-offline -q || true

# Copy source and build fat-jar
COPY src ./src
RUN mvn clean package -DskipTests -q

# ─── Run stage ─────────────────────────────────────────────────────────────────
FROM eclipse-temurin:11-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Production port — matches server.port in application.properties
EXPOSE 8080

# Environment variables expected at runtime (injected by EKS / docker-compose):
#   DB_URL   — full JDBC connection string
#   DB_USER  — database username
#   DB_PASS  — database password
ENTRYPOINT ["java", "-jar", "app.jar"]

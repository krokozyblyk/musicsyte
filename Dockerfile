FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Копируем родительский pom.xml
COPY pom.xml /app/pom.xml

# Копируем api-gateway модуль
COPY api-gateway/pom.xml /app/api-gateway/
COPY api-gateway/src /app/api-gateway/src

# Собираем api-gateway модуль (используем родительский pom.xml)
WORKDIR /app
RUN mvn -pl api-gateway -am clean package -DskipTests

# Финальный образ
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Копируем собранный JAR
COPY --from=build /app/api-gateway/target/api-gateway-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


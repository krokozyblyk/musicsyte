# Dockerfile для api-gateway
# Работает если Root Directory = api-gateway

FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Копируем api-gateway
COPY pom-standalone.xml /app/pom.xml
COPY src /app/src

# Собираем проект
RUN mvn clean package -DskipTests

# Финальный образ
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Копируем собранный JAR
COPY --from=build /app/target/api-gateway-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


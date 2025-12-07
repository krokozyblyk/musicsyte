# Этот Dockerfile работает только если Root Directory = api-gateway
# Если Root Directory = . (корень), используйте Dockerfile в корне проекта

FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Копируем api-gateway (текущая директория уже api-gateway)
COPY pom.xml /app/pom.xml
COPY src /app/src

# Собираем проект (используем локальный pom.xml)
RUN mvn clean package -DskipTests

# Финальный образ
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Копируем собранный JAR
COPY --from=build /app/target/api-gateway-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


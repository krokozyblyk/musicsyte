# Dockerfile для api-gateway
# Работает если Root Directory = api-gateway

FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Копируем родительский pom.xml (из корня проекта)
# Если Root Directory = api-gateway, нужно скопировать из родительской директории
COPY ../pom.xml /app/pom.xml

# Копируем api-gateway
COPY pom.xml /app/api-gateway/pom.xml
COPY src /app/api-gateway/src

# Собираем api-gateway модуль
WORKDIR /app
RUN mvn -pl api-gateway -am clean package -DskipTests

# Финальный образ
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Копируем собранный JAR
COPY --from=build /app/api-gateway/target/api-gateway-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


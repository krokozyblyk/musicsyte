# 🔧 Исправление команд запуска для Railway

## ❌ Проблема

Ошибка: `Error: Unable to access jarfile target/*jar`

**Причина:** В инструкциях указано неправильное имя JAR файла.

## ✅ Решение

### Правильные команды запуска для Railway:

#### Config Server:
```bash
Build Command: cd config-server && mvn clean package -DskipTests
Start Command: cd config-server && java -jar target/config-server-1.0.0.jar
```

#### Eureka Server:
```bash
Build Command: cd eureka-server && mvn clean package -DskipTests
Start Command: cd eureka-server && java -jar target/eureka-server-1.0.0.jar
```

#### User Service:
```bash
Build Command: cd user-service && mvn clean package -DskipTests
Start Command: cd user-service && java -jar target/user-service-1.0.0.jar
```

#### Music Catalog Service:
```bash
Build Command: cd music-catalog-service && mvn clean package -DskipTests
Start Command: cd music-catalog-service && java -jar target/music-catalog-service-1.0.0.jar
```

#### Notification Service:
```bash
Build Command: cd notification-service && mvn clean package -DskipTests
Start Command: cd notification-service && java -jar target/notification-service-1.0.0.jar
```

#### Analytics Service:
```bash
Build Command: cd analytics-service && mvn clean package -DskipTests
Start Command: cd analytics-service && java -jar target/analytics-service-1.0.0.jar
```

#### Recommendation Service:
```bash
Build Command: cd recommendation-service && mvn clean package -DskipTests
Start Command: cd recommendation-service && java -jar target/recommendation-service-1.0.0.jar
```

#### Search Service:
```bash
Build Command: cd search-service && mvn clean package -DskipTests
Start Command: cd search-service && java -jar target/search-service-1.0.0.jar
```

#### Social Service:
```bash
Build Command: cd social-service && mvn clean package -DskipTests
Start Command: cd social-service && java -jar target/social-service-1.0.0.jar
```

#### API Gateway:
```bash
Build Command: cd api-gateway && mvn clean package -DskipTests
Start Command: cd api-gateway && java -jar target/api-gateway-1.0.0.jar
```

---

## 🔄 Альтернативный вариант (универсальный)

Если версия изменится, можно использовать:

```bash
Start Command: cd название-сервиса && java -jar $(find target -name "*.jar" -not -name "*.original" | head -1)
```

Или для Railway (более простой вариант):

```bash
Start Command: cd название-сервиса && java -jar target/название-сервиса-1.0.0.jar
```

---

## 📋 Что изменить в Railway

1. Откройте каждый сервис в Railway
2. Перейдите в **Settings**
3. Найдите **Start Command**
4. Замените `-0.0.1-SNAPSHOT.jar` на `-1.0.0.jar`
5. Сохраните и перезапустите

---

## ✅ Проверка

После исправления команды должны работать без ошибок!


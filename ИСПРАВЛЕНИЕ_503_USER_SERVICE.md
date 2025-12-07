# 🔧 ИСПРАВЛЕНИЕ: User Service 503 ошибка

## ❌ Проблема:

API Gateway не может найти User Service, потому что используется `lb://user-service` (через Eureka), но Eureka Server не задеплоен.

---

## ✅ РЕШЕНИЕ 1: Задеплоить Eureka Server (РЕКОМЕНДУЕТСЯ)

### Шаг 1: Создайте Eureka Server в Railway

1. В Railway нажмите **"+ New"** → **"GitHub Repo"**
2. Выберите репозиторий: `krokozyblyk/musicsyte`

### Шаг 2: Настройки

- **Service Name:** `eureka-server`
- **Root Directory:** `eureka-server`
- **Builder:** `NIXPACKS`
- **Build Command:** `cp pom-standalone.xml pom.xml && mvn clean package -DskipTests` (если есть pom-standalone.xml)
- **ИЛИ:** `mvn clean package -DskipTests` (если Root Directory = `.`)
- **Start Command:** `java -jar target/eureka-server-1.0.0.jar`

### Шаг 3: Variables

```
SERVER_PORT=8761
SPRING_PROFILES_ACTIVE=prod
EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/
```

### Шаг 4: Деплой

Нажмите **"Deploy"**

---

## ✅ РЕШЕНИЕ 2: Изменить API Gateway на прямые URL (БЫСТРЕЕ)

Если не хотите деплоить Eureka Server, можно изменить конфигурацию API Gateway.

Но это сложнее и требует изменения кода.

---

## 🎯 РЕКОМЕНДАЦИЯ:

**Используйте РЕШЕНИЕ 1** - задеплойте Eureka Server. Это правильная архитектура микросервисов.

После деплоя Eureka Server:
1. User Service зарегистрируется в Eureka
2. API Gateway найдет User Service через Eureka
3. Ошибки 503 исчезнут

---

**Задеплойте Eureka Server и ошибка 503 исчезнет! ✅**


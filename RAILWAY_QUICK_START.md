# ⚡ Быстрый старт: Railway.app

## 🎯 Вы уже создали аккаунт - что дальше?

---

## 📋 Чеклист деплоя

### ✅ Шаг 1: Подготовка (5 мин)
- [ ] Проект загружен на GitHub
- [ ] Открыт Railway.app

### ✅ Шаг 2: База данных (3 мин)
- [ ] Создан PostgreSQL в Railway
- [ ] Скопированы переменные окружения

### ✅ Шаг 3: Сервисы (по 5 мин каждый)
- [ ] Config Server
- [ ] Eureka Server
- [ ] User Service
- [ ] Music Catalog Service
- [ ] Notification Service
- [ ] Analytics Service
- [ ] Recommendation Service
- [ ] Search Service
- [ ] Social Service
- [ ] **API Gateway** (с доменом!)

### ✅ Шаг 4: Frontend (5 мин)
- [ ] Обновлен `frontend/js/api.js`
- [ ] Задеплоен на Vercel

---

## 🚀 Начинаем!

### 1. Создайте проект в Railway

1. Нажмите **"New Project"**
2. Выберите **"Deploy from GitHub repo"**
3. Выберите ваш репозиторий

**Готово!** Проект создан.

---

### 2. Добавьте PostgreSQL

1. В проекте нажмите **"+ New"**
2. Выберите **"Database"** → **"Add PostgreSQL"**
3. Откройте базу данных → вкладка **"Variables"**
4. **Скопируйте все переменные!** (они понадобятся)

**Готово!** База данных создана.

---

### 3. Деплой Config Server

1. **"+ New"** → **"GitHub Repo"** → выберите репозиторий
2. **Settings:**
   - **Service Name:** `config-server`
   - **Root Directory:** `config-server`
   - **Build Command:** `cd config-server && mvn clean package -DskipTests`
   - **Start Command:** `cd config-server && java -jar target/config-server-1.0.0.jar`
3. **Variables:**
   ```
   SERVER_PORT=8888
   SPRING_PROFILES_ACTIVE=prod
   ```
4. **Deploy**

**Готово!** Config Server запущен.

---

### 4. Деплой Eureka Server

1. **"+ New"** → **"GitHub Repo"**
2. **Settings:**
   - **Service Name:** `eureka-server`
   - **Root Directory:** `eureka-server`
   - **Build Command:** `cd eureka-server && mvn clean package -DskipTests`
   - **Start Command:** `cd eureka-server && java -jar target/eureka-server-1.0.0.jar`
3. **Variables:**
   ```
   SERVER_PORT=8761
   SPRING_PROFILES_ACTIVE=prod
   EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/
   ```
4. **Deploy**

**Готово!** Eureka Server запущен.

---

### 5. Деплой User Service

1. **"+ New"** → **"GitHub Repo"**
2. **Settings:**
   - **Service Name:** `user-service`
   - **Root Directory:** `user-service`
   - **Build Command:** `cd user-service && mvn clean package -DskipTests`
   - **Start Command:** `cd user-service && java -jar target/user-service-1.0.0.jar`
3. **Variables:** (добавьте ВСЕ переменные из PostgreSQL + эти):
   ```
   SERVER_PORT=8081
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE}
   SPRING_DATASOURCE_USERNAME=${PGUSER}
   SPRING_DATASOURCE_PASSWORD=${PGPASSWORD}
   SPRING_CLOUD_CONFIG_URI=http://config-server:8888
   EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/
   ```
4. **Deploy**

**Готово!** User Service запущен.

---

### 6. Деплой остальных сервисов

**Повторите для каждого:**

- **music-catalog-service** (порт 8082)
- **notification-service** (порт 8083)
- **analytics-service** (порт 8084)
- **recommendation-service** (порт 8085)
- **search-service** (порт 8086)
- **social-service** (порт 8087)

**Формула:**
- Root Directory: `название-сервиса`
- Build Command: `cd название-сервиса && mvn clean package -DskipTests`
- Start Command: `cd название-сервиса && java -jar target/название-сервиса-1.0.0.jar`
- Variables: те же, что для User Service, но другой `SERVER_PORT`

---

### 7. ⭐ Деплой API Gateway (ГЛАВНЫЙ!)

1. **"+ New"** → **"GitHub Repo"**
2. **Settings:**
   - **Service Name:** `api-gateway`
   - **Root Directory:** `api-gateway`
   - **Build Command:** `cd api-gateway && mvn clean package -DskipTests`
   - **Start Command:** `cd api-gateway && java -jar target/api-gateway-1.0.0.jar`
3. **Variables:**
   ```
   SERVER_PORT=8080
   SPRING_PROFILES_ACTIVE=prod
   SPRING_CLOUD_CONFIG_URI=http://config-server:8888
   EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/
   ```
4. **ВАЖНО:** В **Settings** → **Networking** → **"Generate Domain"**
5. **Deploy**

**Готово!** API Gateway запущен с HTTPS! ✅

---

### 8. Обновление Frontend

1. Откройте `frontend/js/api.js`
2. Найдите строку:
   ```javascript
   const API_BASE_URL = window.API_BASE_URL || 'http://localhost:8080';
   ```
3. Замените на ваш домен Railway:
   ```javascript
   const API_BASE_URL = window.API_BASE_URL || 'https://ваш-домен-railway.up.railway.app';
   ```
4. Сохраните и закоммитьте:
   ```bash
   git add frontend/js/api.js
   git commit -m "Update API URL for production"
   git push
   ```

---

### 9. Деплой Frontend на Vercel

1. Откройте https://vercel.com
2. Войдите через GitHub
3. **"Add New Project"** → выберите репозиторий
4. Настройки:
   - **Root Directory:** `frontend`
   - **Build Command:** (пусто)
   - **Output Directory:** `frontend`
5. **Deploy**

**Готово!** Frontend задеплоен с HTTPS! ✅

---

## ✅ Проверка

1. Откройте сайт на Vercel
2. Проверьте 🔒 в адресной строке
3. Проверьте работу сайта

**Готово!** Всё работает! 🎉

---

## 📸 Для отчета

Сделайте скриншоты:
1. Railway Dashboard (все сервисы)
2. API Gateway домен (с HTTPS)
3. Vercel деплой
4. Открытый сайт (с 🔒)
5. SSL проверка (ssllabs.com)

---

**Подробная инструкция:** См. `RAILWAY_STEP_BY_STEP.md`


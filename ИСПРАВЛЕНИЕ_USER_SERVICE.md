# 🔧 ИСПРАВЛЕНИЕ: User Service ошибка сборки

## ❌ Проблема:

```
ERROR: cd user-service: No such file or directory
```

Railway использует Dockerfile из корня проекта (для api-gateway), а не NIXPACKS.

---

## ✅ РЕШЕНИЕ: Изменить Builder в Railway UI

### В Railway UI:

1. Откройте сервис **`user-service`**
2. Перейдите в **Settings** → раздел **"Build"**
3. Найдите **"Builder"**
4. **Сейчас:** `DOCKERFILE` (или что-то другое)
5. **Измените на:** `NIXPACKS` (или `Railpack`)
6. Сохраните

### Проверьте Build Command:

**Должно быть:**
```
mvn clean package -DskipTests
```

**НЕ должно быть:**
```
cd user-service && mvn clean package -DskipTests
```

### Проверьте Start Command:

**Должно быть:**
```
java -jar target/user-service-1.0.0.jar
```

**НЕ должно быть:**
```
cd user-service && java -jar target/user-service-1.0.0.jar
```

---

## 📋 Правильные настройки:

```
Root Directory: user-service
Builder: NIXPACKS (или Railpack)
Build Command: mvn clean package -DskipTests
Start Command: java -jar target/user-service-1.0.0.jar
```

---

## ⚠️ ВАЖНО:

- **Builder** должен быть `NIXPACKS` или `Railpack`, НЕ `DOCKERFILE`
- **Build Command** и **Start Command** БЕЗ `cd user-service &&`
- **Root Directory** = `user-service`

---

**Измените Builder на NIXPACKS в Railway UI и ошибка исчезнет! ✅**


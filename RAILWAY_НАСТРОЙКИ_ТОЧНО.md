# ✅ ТОЧНЫЕ настройки для api-gateway в Railway

## 🎯 Правильные настройки:

### В Railway UI (Settings):

```
Service Name: api-gateway
Root Directory: api-gateway
Builder: DOCKERFILE
Dockerfile Path: Dockerfile
Build Command: (ПУСТО)
Start Command: (ПУСТО)
```

---

## ⚠️ ВАЖНО:

1. **Root Directory** должен быть `api-gateway` (не `.`)
2. **Dockerfile Path** должен быть `Dockerfile` (Railway автоматически найдет его в `api-gateway/Dockerfile`)
3. **Build Command** и **Start Command** должны быть ПУСТЫМИ

---

## 📋 Почему это работает:

- Root Directory = `api-gateway` → контекст сборки = `api-gateway/`
- Dockerfile Path = `Dockerfile` → Railway ищет `api-gateway/Dockerfile`
- Dockerfile копирует `pom-standalone.xml` и `src` напрямую (без `api-gateway/`)
- Все работает правильно! ✅

---

## 🔧 Если не работает:

1. Проверьте, что Root Directory = `api-gateway` в Railway UI
2. Проверьте, что Dockerfile Path = `Dockerfile` (не `api-gateway/Dockerfile`)
3. Убедитесь, что Build Command и Start Command ПУСТЫЕ
4. Сохраните и передеплойте

---

**Готово! Должно работать! ✅**


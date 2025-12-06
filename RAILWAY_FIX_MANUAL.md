# 🔧 РУЧНОЕ ИСПРАВЛЕНИЕ в Railway (если ошибка все еще есть)

## ❌ Ошибка:
```
Error: Unable to access jarfile target/*jar
```

## ✅ Решение:

Railway может не использовать `railway.json` автоматически, если команда указана вручную в настройках.

### Вариант 1: Удалить Start Command из настроек (РЕКОМЕНДУЕТСЯ)

1. Откройте сервис в Railway
2. Перейдите в **Settings**
3. Найдите раздел **"Start Command"**
4. **УДАЛИТЕ** команду (оставьте пустым)
5. Сохраните
6. Railway автоматически использует `railway.json` или скрипт `start.sh`

### Вариант 2: Использовать универсальную команду

Если Railway не подхватывает `railway.json`, вручную укажите:

**Для каждого сервиса в Settings → Start Command:**

#### Config Server:
```bash
cd config-server && bash start.sh
```

#### Eureka Server:
```bash
cd eureka-server && bash start.sh
```

#### User Service:
```bash
cd user-service && bash start.sh
```

#### Music Catalog Service:
```bash
cd music-catalog-service && bash start.sh
```

#### Notification Service:
```bash
cd notification-service && bash start.sh
```

#### Analytics Service:
```bash
cd analytics-service && bash start.sh
```

#### Recommendation Service:
```bash
cd recommendation-service && bash start.sh
```

#### Search Service:
```bash
cd search-service && bash start.sh
```

#### Social Service:
```bash
cd social-service && bash start.sh
```

#### API Gateway:
```bash
cd api-gateway && bash start.sh
```

### Вариант 3: Прямая команда с поиском JAR

Если скрипты не работают, используйте:

```bash
cd название-сервиса && java -jar $(find target -name "*.jar" -not -name "*.original" | head -1)
```

Например для API Gateway:
```bash
cd api-gateway && java -jar $(find target -name "*.jar" -not -name "*.original" | head -1)
```

---

## 🎯 Что я сделал:

1. ✅ Создал `start.sh` скрипты для каждого сервиса
2. ✅ Скрипты автоматически находят JAR файл
3. ✅ Обновил `railway.json` файлы
4. ✅ Все закоммичено и запушено в GitHub

---

## 📋 Что делать сейчас:

1. **Откройте каждый сервис в Railway**
2. **Settings → Start Command**
3. **Выберите один из вариантов выше**
4. **Сохраните и перезапустите**

---

## ✅ После исправления:

Ошибка должна исчезнуть, и сервисы запустятся успешно!


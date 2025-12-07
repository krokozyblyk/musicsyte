# Notification Service API Documentation

**Base URL:** `http://localhost:8084` (или через API Gateway: `http://localhost:8080/api`)

**Service Port:** 8084

## Оглавление

- [Notifications API](#notifications-api)

---

## Notifications API

### Создать уведомление
**POST** `/api/notifications`

**Request Body:**
```json
{
  "userId": 1,
  "title": "Новое уведомление",
  "message": "У вас новое сообщение",
  "type": "INFO"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "userId": 1,
  "title": "Новое уведомление",
  "message": "У вас новое сообщение",
  "type": "INFO",
  "isRead": false,
  "createdAt": "2024-01-01T00:00:00"
}
```

**Типы уведомлений (`type`):**
- `INFO` - информационное уведомление
- `WARNING` - предупреждение
- `ERROR` - ошибка
- `SUCCESS` - успешная операция

---

### Получить все уведомления
**GET** `/api/notifications`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Уведомление 1",
    "message": "Сообщение 1",
    "type": "INFO",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "Уведомление 2",
    "message": "Сообщение 2",
    "type": "SUCCESS",
    "isRead": true,
    "createdAt": "2024-01-02T00:00:00"
  }
]
```

---

### Получить уведомления пользователя
**GET** `/api/notifications/user/{userId}`

**Parameters:**
- `userId` (path) - ID пользователя

**Response:** `200 OK` - массив уведомлений пользователя

---

### Получить непрочитанные уведомления пользователя
**GET** `/api/notifications/user/{userId}/unread`

**Parameters:**
- `userId` (path) - ID пользователя

**Response:** `200 OK` - массив непрочитанных уведомлений (`isRead: false`)

---

### Получить количество непрочитанных уведомлений
**GET** `/api/notifications/user/{userId}/unread/count`

**Parameters:**
- `userId` (path) - ID пользователя

**Response:** `200 OK`
```json
5
```

---

### Получить уведомление по ID
**GET** `/api/notifications/{id}`

**Parameters:**
- `id` (path) - ID уведомления

**Response:** `200 OK`
```json
{
  "id": 1,
  "userId": 1,
  "title": "Уведомление",
  "message": "Сообщение",
  "type": "INFO",
  "isRead": false,
  "createdAt": "2024-01-01T00:00:00"
}
```

---

### Отметить уведомление как прочитанное
**PUT** `/api/notifications/{id}/read`

**Parameters:**
- `id` (path) - ID уведомления

**Response:** `200 OK` - обновленное уведомление с `isRead: true`
```json
{
  "id": 1,
  "userId": 1,
  "title": "Уведомление",
  "message": "Сообщение",
  "type": "INFO",
  "isRead": true,
  "createdAt": "2024-01-01T00:00:00"
}
```

---

### Удалить уведомление
**DELETE** `/api/notifications/{id}`

**Parameters:**
- `id` (path) - ID уведомления

**Response:** `204 No Content`

---

## Примеры использования

### Создать уведомление о новом треке
```bash
curl -X POST http://localhost:8080/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "Новый трек",
    "message": "Добавлен новый трек от вашего любимого исполнителя",
    "type": "INFO"
  }'
```

### Получить количество непрочитанных уведомлений
```bash
curl http://localhost:8080/api/notifications/user/1/unread/count
```

### Отметить уведомление как прочитанное
```bash
curl -X PUT http://localhost:8080/api/notifications/1/read
```

---

## Ошибки

Все endpoints могут возвращать следующие HTTP статусы:

- `200 OK` - успешный запрос
- `201 Created` - ресурс успешно создан
- `204 No Content` - успешное удаление
- `400 Bad Request` - неверные данные запроса
- `404 Not Found` - ресурс не найден
- `500 Internal Server Error` - внутренняя ошибка сервера

---

## Примечания

- Все даты и время в формате ISO 8601
- По умолчанию все новые уведомления имеют `isRead: false`
- API доступен как напрямую на порту 8084, так и через API Gateway на порту 8080










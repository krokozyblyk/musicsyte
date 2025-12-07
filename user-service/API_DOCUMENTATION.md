# User Service API Documentation

**Base URL:** `http://localhost:8083` (или через API Gateway: `http://localhost:8080/api`)

**Service Port:** 8083

## Оглавление

- [Users API](#users-api)
- [Playlists API](#playlists-api)
- [Playlist Tracks API](#playlist-tracks-api)
- [Favorite Tracks API](#favorite-tracks-api)
- [Favorite Artists API](#favorite-artists-api)

---

## Users API

### Создать пользователя
**POST** `/api/users`

**Request Body:**
```json
{
  "username": "username",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Имя",
  "lastName": "Фамилия"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "username": "username",
  "email": "user@example.com",
  "firstName": "Имя",
  "lastName": "Фамилия"
}
```

**Errors:**
- `400 Bad Request` - если username или email уже существуют

---

### Получить всех пользователей
**GET** `/api/users`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "username": "username1",
    "email": "user1@example.com",
    ...
  },
  {
    "id": 2,
    "username": "username2",
    ...
  }
]
```

---

### Получить пользователей с пагинацией
**GET** `/api/users/page?page=0&size=20`

**Parameters:**
- `page` (query) - номер страницы (по умолчанию 0)
- `size` (query) - размер страницы (по умолчанию 20)

**Response:** `200 OK` - объект пагинации с пользователями

---

### Получить пользователя по ID
**GET** `/api/users/{id}`

**Parameters:**
- `id` (path) - ID пользователя

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "username",
  "email": "user@example.com",
  "firstName": "Имя",
  "lastName": "Фамилия"
}
```

**Errors:**
- `404 Not Found` - если пользователь не найден

---

### Обновить пользователя
**PUT** `/api/users/{id}`

**Parameters:**
- `id` (path) - ID пользователя

**Request Body:** (все поля опциональны)
```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword123",
  "firstName": "Новое имя",
  "lastName": "Новая фамилия"
}
```

**Response:** `200 OK` - обновленный пользователь

**Errors:**
- `400 Bad Request` - если новый username или email уже используются
- `404 Not Found` - если пользователь не найден

---

### Удалить пользователя
**DELETE** `/api/users/{id}`

**Parameters:**
- `id` (path) - ID пользователя

**Response:** `204 No Content`

**Errors:**
- `404 Not Found` - если пользователь не найден

---

### Вход пользователя
**POST** `/api/users/login`

**Request Body:**
```json
{
  "emailOrUsername": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "username",
  "email": "user@example.com",
  "firstName": "Имя",
  "lastName": "Фамилия"
}
```

**Errors:**
- `401 Unauthorized` - если неверные учетные данные

---

## Playlists API

### Создать плейлист
**POST** `/api/playlists`

**Request Body:**
```json
{
  "name": "Мой плейлист",
  "description": "Описание плейлиста",
  "userId": 1,
  "imagePath": "uploads/playlists/1.jpg"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Мой плейлист",
  "description": "Описание плейлиста",
  "userId": 1,
  "imagePath": "uploads/playlists/1.jpg",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

---

### Получить все плейлисты
**GET** `/api/playlists`

**Response:** `200 OK` - массив плейлистов

---

### Получить плейлисты по ID пользователя
**GET** `/api/playlists/user/{userId}`

**Parameters:**
- `userId` (path) - ID пользователя

**Response:** `200 OK` - массив плейлистов пользователя

---

### Получить плейлист по ID
**GET** `/api/playlists/{id}`

**Parameters:**
- `id` (path) - ID плейлиста

**Response:** `200 OK` - плейлист

---

### Обновить плейлист
**PUT** `/api/playlists/{id}`

**Parameters:**
- `id` (path) - ID плейлиста

**Request Body:** (все поля опциональны)
```json
{
  "name": "Обновленное название",
  "description": "Обновленное описание",
  "imagePath": "uploads/playlists/1_new.jpg"
}
```

**Response:** `200 OK` - обновленный плейлист

---

### Удалить плейлист
**DELETE** `/api/playlists/{id}`

**Parameters:**
- `id` (path) - ID плейлиста

**Response:** `204 No Content`

---

## Playlist Tracks API

### Добавить трек в плейлист
**POST** `/api/playlist-tracks`

**Request Body:**
```json
{
  "playlistId": 1,
  "trackId": 5
}
```

**Response:** `201 Created`
```json
{
  "playlistId": 1,
  "trackId": 5
}
```

---

### Получить ID треков плейлиста
**GET** `/api/playlist-tracks/playlist/{playlistId}`

**Parameters:**
- `playlistId` (path) - ID плейлиста

**Response:** `200 OK`
```json
[1, 2, 3, 5, 7]
```

---

### Удалить трек из плейлиста
**DELETE** `/api/playlist-tracks/playlist/{playlistId}/track/{trackId}`

**Parameters:**
- `playlistId` (path) - ID плейлиста
- `trackId` (path) - ID трека

**Response:** `204 No Content`

---

### Удалить все треки из плейлиста
**DELETE** `/api/playlist-tracks/playlist/{playlistId}`

**Parameters:**
- `playlistId` (path) - ID плейлиста

**Response:** `204 No Content`

---

## Favorite Tracks API

### Добавить трек в избранное
**POST** `/api/favorite-tracks`

**Request Body:**
```json
{
  "userId": 1,
  "trackId": 5
}
```

**Response:** `201 Created`
```json
{
  "userId": 1,
  "trackId": 5
}
```

---

### Получить ID избранных треков пользователя
**GET** `/api/favorite-tracks/user/{userId}`

**Parameters:**
- `userId` (path) - ID пользователя

**Response:** `200 OK`
```json
[1, 2, 3, 5, 7]
```

---

### Проверить, является ли трек избранным
**GET** `/api/favorite-tracks/user/{userId}/track/{trackId}`

**Parameters:**
- `userId` (path) - ID пользователя
- `trackId` (path) - ID трека

**Response:** `200 OK`
```json
true
```
или
```json
false
```

---

### Удалить трек из избранного
**DELETE** `/api/favorite-tracks/user/{userId}/track/{trackId}`

**Parameters:**
- `userId` (path) - ID пользователя
- `trackId` (path) - ID трека

**Response:** `204 No Content`

---

## Favorite Artists API

### Добавить исполнителя в избранное
**POST** `/api/favorite-artists`

**Request Body:**
```json
{
  "userId": 1,
  "artistId": 5
}
```

**Response:** `201 Created`
```json
{
  "userId": 1,
  "artistId": 5
}
```

**Note:** Если исполнитель уже в избранном, возвращается существующая запись (200 OK)

---

### Получить ID избранных исполнителей пользователя
**GET** `/api/favorite-artists/user/{userId}`

**Parameters:**
- `userId` (path) - ID пользователя

**Response:** `200 OK`
```json
[1, 2, 3, 5, 7]
```

---

### Проверить, является ли исполнитель избранным
**GET** `/api/favorite-artists/user/{userId}/artist/{artistId}`

**Parameters:**
- `userId` (path) - ID пользователя
- `artistId` (path) - ID исполнителя

**Response:** `200 OK`
```json
true
```
или
```json
false
```

---

### Удалить исполнителя из избранного
**DELETE** `/api/favorite-artists/user/{userId}/artist/{artistId}`

**Parameters:**
- `userId` (path) - ID пользователя
- `artistId` (path) - ID исполнителя

**Response:** `204 No Content`

---

## Ошибки

Все endpoints могут возвращать следующие HTTP статусы:

- `200 OK` - успешный запрос
- `201 Created` - ресурс успешно создан
- `204 No Content` - успешное удаление
- `400 Bad Request` - неверные данные запроса
- `401 Unauthorized` - неверные учетные данные (для login)
- `404 Not Found` - ресурс не найден
- `500 Internal Server Error` - внутренняя ошибка сервера

---

## Примечания

- Все даты и время в формате ISO 8601
- Пароли передаются в открытом виде (в продакшене следует использовать HTTPS и хеширование паролей)
- Для входа можно использовать как email, так и username в поле `emailOrUsername`
- API доступен как напрямую на порту 8083, так и через API Gateway на порту 8080










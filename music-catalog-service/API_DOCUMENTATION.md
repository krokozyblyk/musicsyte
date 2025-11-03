# Music Catalog Service API Documentation

**Base URL:** `http://localhost:8082` (или через API Gateway: `http://localhost:8080/api`)

**Service Port:** 8082

## Оглавление

- [Tracks API](#tracks-api)
- [Albums API](#albums-api)
- [Artists API](#artists-api)
- [Files API](#files-api)

---

## Tracks API

### Создать трек
**POST** `/api/tracks`

**Request Body:**
```json
{
  "title": "Название трека",
  "artistId": 1,
  "albumId": 1,
  "durationSeconds": 240,
  "genre": "Реп",
  "filePath": "uploads/tracks/1/track.mp3",
  "artworkPath": "uploads/artwork/tracks/1.jpg",
  "isNewRelease": false
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Название трека",
  "artistId": 1,
  "albumId": 1,
  "durationSeconds": 240,
  "genre": "Реп",
  "filePath": "uploads/tracks/1/track.mp3",
  "artworkPath": "uploads/artwork/tracks/1.jpg",
  "isNewRelease": false,
  "playCountAll": 0,
  "playCountMonth": 0,
  "playCountWeek": 0,
  "playCountDay": 0
}
```

---

### Получить все треки
**GET** `/api/tracks`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Трек 1",
    "artistId": 1,
    "albumId": 1,
    ...
  },
  {
    "id": 2,
    "title": "Трек 2",
    ...
  }
]
```

---

### Получить трек по ID
**GET** `/api/tracks/{id}`

**Parameters:**
- `id` (path) - ID трека

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Название трека",
  ...
}
```

---

### Получить треки по ID исполнителя
**GET** `/api/tracks/artist/{artistId}`

**Parameters:**
- `artistId` (path) - ID исполнителя

**Response:** `200 OK` - массив треков

---

### Получить треки по ID альбома
**GET** `/api/tracks/album/{albumId}`

**Parameters:**
- `albumId` (path) - ID альбома

**Response:** `200 OK` - массив треков

---

### Обновить трек
**PUT** `/api/tracks/{id}`

**Parameters:**
- `id` (path) - ID трека

**Request Body:** (как при создании, все поля опциональны)

**Response:** `200 OK` - обновленный трек

---

### Удалить трек
**DELETE** `/api/tracks/{id}`

**Parameters:**
- `id` (path) - ID трека

**Response:** `204 No Content`

---

### Записать воспроизведение трека
**POST** `/api/tracks/{id}/play`

**Parameters:**
- `id` (path) - ID трека

**Response:** `200 OK`

---

### Поиск треков по названию
**GET** `/api/tracks/search?query={query}`

**Parameters:**
- `query` (query) - поисковый запрос

**Response:** `200 OK` - массив найденных треков

---

### Получить новые релизы
**GET** `/api/tracks/new-releases`

**Response:** `200 OK` - массив треков с `isNewRelease: true`, отсортированных по дате создания (новые первыми)

---

### Установить счетчики прослушиваний
**POST** `/api/tracks/{id}/play-counts`

**Parameters:**
- `id` (path) - ID трека

**Request Body:**
```json
{
  "playCountAll": 1000,
  "playCountMonth": 100,
  "playCountWeek": 50,
  "playCountDay": 10
}
```

**Response:** `200 OK`

**Note:** `playCountAll` должен быть >= остальных счетчиков

---

## Albums API

### Создать альбом
**POST** `/api/albums`

**Request Body:**
```json
{
  "title": "Название альбома",
  "artistId": 1,
  "releaseYear": 2024,
  "artworkPath": "uploads/artwork/albums/1.jpg"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Название альбома",
  "artistId": 1,
  "releaseYear": 2024,
  "artworkPath": "uploads/artwork/albums/1.jpg"
}
```

---

### Получить все альбомы
**GET** `/api/albums`

**Response:** `200 OK` - массив альбомов

---

### Получить альбом по ID
**GET** `/api/albums/{id}`

**Parameters:**
- `id` (path) - ID альбома

**Response:** `200 OK` - альбом

---

### Получить альбомы по ID исполнителя
**GET** `/api/albums/artist/{artistId}`

**Parameters:**
- `artistId` (path) - ID исполнителя

**Response:** `200 OK` - массив альбомов

---

### Обновить альбом
**PUT** `/api/albums/{id}`

**Parameters:**
- `id` (path) - ID альбома

**Request Body:** (как при создании, все поля опциональны)

**Response:** `200 OK` - обновленный альбом

---

### Удалить альбом
**DELETE** `/api/albums/{id}`

**Parameters:**
- `id` (path) - ID альбома

**Response:** `204 No Content`

---

## Artists API

### Создать исполнителя
**POST** `/api/artists`

**Request Body:**
```json
{
  "name": "Имя исполнителя",
  "bio": "Биография",
  "imagePath": "uploads/artwork/artists/1.jpg"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Имя исполнителя",
  "bio": "Биография",
  "imagePath": "uploads/artwork/artists/1.jpg"
}
```

---

### Получить всех исполнителей
**GET** `/api/artists`

**Response:** `200 OK` - массив исполнителей

---

### Получить исполнителей с пагинацией
**GET** `/api/artists/page?page=0&size=20`

**Parameters:**
- `page` (query) - номер страницы (по умолчанию 0)
- `size` (query) - размер страницы (по умолчанию 20)

**Response:** `200 OK` - объект пагинации с исполнителями

---

### Получить исполнителя по ID
**GET** `/api/artists/{id}`

**Parameters:**
- `id` (path) - ID исполнителя

**Response:** `200 OK` - исполнитель

---

### Обновить исполнителя
**PUT** `/api/artists/{id}`

**Parameters:**
- `id` (path) - ID исполнителя

**Request Body:** (как при создании, все поля опциональны)

**Response:** `200 OK` - обновленный исполнитель

---

### Удалить исполнителя
**DELETE** `/api/artists/{id}`

**Parameters:**
- `id` (path) - ID исполнителя

**Response:** `204 No Content`

---

### Поиск исполнителей по имени
**GET** `/api/artists/search?query={query}`

**Parameters:**
- `query` (query) - поисковый запрос

**Response:** `200 OK` - массив найденных исполнителей

---

## Files API

### Получить аудио файл трека
**GET** `/api/files/tracks/{trackId}`

**Parameters:**
- `trackId` (path) - ID трека

**Response:** `200 OK` - аудио файл (audio/mpeg, audio/wav, и т.д.)

**Headers:**
- `Content-Type`: определяется автоматически по расширению файла
- `Content-Disposition`: `inline; filename="название трека"`
- `Accept-Ranges`: `bytes`

---

### Скачать аудио файл трека
**GET** `/api/files/tracks/{trackId}/download`

**Parameters:**
- `trackId` (path) - ID трека

**Response:** `200 OK` - файл для скачивания

**Headers:**
- `Content-Disposition`: `attachment; filename="название.mp3"`

---

### Загрузить аудио файл трека
**POST** `/api/files/tracks/{trackId}/upload`

**Parameters:**
- `trackId` (path) - ID трека

**Request:**
- `multipart/form-data`
- `file` (form-data) - аудио файл

**Response:** `200 OK`
```
File uploaded successfully: path/to/file (Duration: 240s)
```

**Note:** Длительность трека определяется автоматически

---

### Загрузить аудио файл трека из URL
**POST** `/api/files/tracks/{trackId}/download-from-url`

**Parameters:**
- `trackId` (path) - ID трека

**Request:**
- `url` (form-data) - URL аудио файла

**Response:** `200 OK`
```
File downloaded successfully from URL: path/to/file (Duration: 240s)
```

---

### Получить обложку альбома
**GET** `/api/files/artwork/albums/{albumId}`

**Parameters:**
- `albumId` (path) - ID альбома

**Response:** `200 OK` - изображение (image/jpeg, image/png, и т.д.) или `302 Found` (редирект, если URL)

**Fallback:** Если обложка не найдена, возвращается `404 Not Found`

---

### Загрузить обложку альбома
**POST** `/api/files/artwork/albums/{albumId}/upload`

**Parameters:**
- `albumId` (path) - ID альбома

**Request:**
- `multipart/form-data`
- `file` (form-data) - изображение

**Response:** `200 OK`
```
Artwork uploaded successfully: path/to/file
```

---

### Получить фото исполнителя
**GET** `/api/files/artwork/artists/{artistId}`

**Parameters:**
- `artistId` (path) - ID исполнителя

**Response:** `200 OK` - изображение или `302 Found` (редирект, если URL)

**Fallback:** Если фото не найдено, возвращается `404 Not Found`

---

### Загрузить фото исполнителя
**POST** `/api/files/artwork/artists/{artistId}/upload`

**Parameters:**
- `artistId` (path) - ID исполнителя

**Request:**
- `multipart/form-data`
- `file` (form-data) - изображение

**Response:** `200 OK`
```
Image uploaded successfully: path/to/file
```

---

### Получить обложку трека
**GET** `/api/files/artwork/tracks/{trackId}`

**Parameters:**
- `trackId` (path) - ID трека

**Response:** `200 OK` - изображение

**Fallback Logic:**
1. Если у трека есть `artworkPath`, используется он
2. Если нет, используется обложка альбома (если `albumId` указан)
3. Если ничего не найдено, возвращается `404 Not Found`

---

### Загрузить обложку трека
**POST** `/api/files/artwork/tracks/{trackId}/upload`

**Parameters:**
- `trackId` (path) - ID трека

**Request:**
- `multipart/form-data`
- `file` (form-data) - изображение

**Response:** `200 OK`
```
Artwork uploaded successfully: path/to/file
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
- Все пути к файлам используют `/` в качестве разделителя
- При загрузке файлов поддерживаются форматы: MP3, WAV, OGG, M4A, FLAC (аудио) и JPG, PNG (изображения)
- API доступен как напрямую на порту 8082, так и через API Gateway на порту 8080



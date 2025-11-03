# Руководство по созданию коммита в новой ветке

## Шаг 1: Создание новой ветки

```powershell
# Перейдите в директорию проекта
cd "c:\pract\chibuk\PROEKT MUSIC SYTE\music_proj_www"

# Создайте новую ветку и переключитесь на неё
git checkout -b feature/your-feature-name

# Или создайте ветку с отдельной командой
git branch feature/your-feature-name
git checkout feature/your-feature-name
```

**Примеры названий веток:**
- `feature/api-documentation` - для новой документации API
- `feature/microservices-overview` - для обзора микросервисов
- `feature/fix-play-buttons` - для исправления кнопок воспроизведения
- `fix/album-playback` - для исправлений
- `docs/microservices` - для документации

---

## Шаг 2: Проверка изменений

```powershell
# Посмотрите, какие файлы изменены
git status

# Посмотрите конкретные изменения в файле
git diff <имя_файла>
```

---

## Шаг 3: Добавление файлов в индекс (staging)

```powershell
# Добавить все новые и измененные файлы
git add .

# Или добавить конкретные файлы
git add API_DOCUMENTATION_INDEX.md
git add MICROSERVICES_OVERVIEW.md
git add music-catalog-service/API_DOCUMENTATION.md
git add user-service/API_DOCUMENTATION.md
git add notification-service/API_DOCUMENTATION.md

# Добавить все .md файлы
git add *.md

# Добавить все файлы в определенной директории
git add analytics-service/
```

**⚠️ Важно:** Обычно НЕ нужно коммитить:
- Файлы в `target/` директориях (скompиленные классы)
- Файлы в `logs/` директориях
- Файлы в `.idea/` (настройки IDE)
- Временные файлы

---

## Шаг 4: Создание коммита

```powershell
# Коммит с сообщением
git commit -m "Добавлена API документация для всех микросервисов"

# Или более подробное сообщение
git commit -m "Добавлена API документация

- Создана документация для Music Catalog Service
- Создана документация для User Service  
- Создана документация для Notification Service
- Добавлен общий индексный файл документации
- Добавлен обзор микросервисов"
```

**Хорошие примеры сообщений коммитов:**
- `feat: добавлена API документация для всех сервисов`
- `docs: создан обзор микросервисов`
- `fix: исправлены кнопки воспроизведения в альбомах`
- `feat: добавлен FavoriteArtistController для избранных исполнителей`

---

## Шаг 5: Отправка ветки на удаленный репозиторий

```powershell
# Отправить новую ветку на удаленный репозиторий
git push -u origin feature/your-feature-name

# Или просто
git push origin feature/your-feature-name
```

---

## Полный пример работы с новой веткой

```powershell
# 1. Перейдите в директорию проекта
cd "c:\pract\chibuk\PROEKT MUSIC SYTE\music_proj_www"

# 2. Проверьте текущую ветку и статус
git status
git branch

# 3. Создайте новую ветку для документации
git checkout -b docs/api-documentation

# 4. Добавьте файлы документации (не добавляйте target/ и logs/)
git add API_DOCUMENTATION_INDEX.md
git add MICROSERVICES_OVERVIEW.md
git add music-catalog-service/API_DOCUMENTATION.md
git add user-service/API_DOCUMENTATION.md
git add notification-service/API_DOCUMENTATION.md
git add analytics-service/API_DOCUMENTATION.md
git add recommendation-service/API_DOCUMENTATION.md
git add search-service/API_DOCUMENTATION.md
git add social-service/API_DOCUMENTATION.md

# 5. Проверьте, что добавлено правильно
git status

# 6. Создайте коммит
git commit -m "docs: добавлена полная API документация для всех микросервисов"

# 7. Отправьте ветку на удаленный репозиторий
git push -u origin docs/api-documentation
```

---

## Полезные команды

```powershell
# Посмотреть историю коммитов
git log

# Посмотреть, какая ветка активна
git branch

# Переключиться на другую ветку
git checkout main
git checkout feature/your-feature-name

# Посмотреть все ветки (локальные и удаленные)
git branch -a

# Удалить локальную ветку (после слияния)
git branch -d feature/your-feature-name

# Отменить изменения в файле (если еще не закоммичено)
git restore <имя_файла>

# Отменить все изменения
git restore .
```

---

## Рекомендации

1. **Создавайте отдельную ветку для каждой задачи/фичи**
2. **Используйте понятные названия веток:** `feature/`, `fix/`, `docs/`
3. **Пишите понятные сообщения коммитов**
4. **Не коммитьте файлы в `target/`, `logs/`, `.idea/`**
5. **Регулярно делайте коммиты** (не накапливайте много изменений)

---

## Если нужно создать Pull Request

После отправки ветки на GitHub/GitLab:

1. Зайдите на сайт репозитория
2. Увидите уведомление "Compare & pull request"
3. Создайте Pull Request
4. Опишите изменения
5. Дождитесь ревью и слияния в `main`


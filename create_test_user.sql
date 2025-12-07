-- SQL скрипт для создания тестового пользователя
-- Выполните этот скрипт в Railway PostgreSQL

-- Вставка тестового пользователя
INSERT INTO users (username, email, password, first_name, last_name, created_at)
VALUES (
    'username1',                              -- username
    'test@example.com',                       -- email
    '12345',                                  -- password (простой текст, так как в коде нет BCrypt)
    'Test',                                   -- first_name
    'User',                                   -- last_name
    NOW()                                     -- created_at
)
ON CONFLICT (username) DO NOTHING;            -- Если пользователь уже существует, не делать ничего

-- Проверка, что пользователь создан
SELECT id, username, email, first_name, last_name, created_at 
FROM users 
WHERE username = 'username1';


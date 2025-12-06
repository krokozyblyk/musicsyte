-- Create admin user
-- This script creates an admin user with username "username" and password "durak123"
-- Execute this script after the database is set up

-- Insert admin user if not exists
INSERT INTO users (username, email, password, first_name, last_name, created_at)
VALUES ('username', 'admin@music.com', 'durak123', 'Admin', 'User', NOW())
ON CONFLICT (username) DO UPDATE
SET 
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name;

-- Verify the user was created
SELECT id, username, email, first_name, last_name, created_at 
FROM users 
WHERE username = 'username';



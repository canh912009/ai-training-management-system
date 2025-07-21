-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ai_training_db;
USE ai_training_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    age INT,
    gender ENUM('M', 'F', 'O'),
    region ENUM('N', 'M', 'S'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create audio_training_files table
CREATE TABLE IF NOT EXISTS audio_training_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    content_vietnamese TEXT,
    content_korean TEXT,
    training_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create admin user (password: admin123)
INSERT INTO users (phone, password, is_admin) VALUES
('0123456789', '$2a$12$BRWdAj6Wn0Y4GQ9EZyNxsOaf/72zoKaCIdL4hQCRJCsttRai3aupu', TRUE)
ON DUPLICATE KEY UPDATE password = '$2a$12$BRWdAj6Wn0Y4GQ9EZyNxsOaf/72zoKaCIdL4hQCRJCsttRai3aupu';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_audio_files_user_id ON audio_training_files(user_id);
CREATE INDEX IF NOT EXISTS idx_audio_files_status ON audio_training_files(training_status);
CREATE INDEX IF NOT EXISTS idx_audio_files_created_at ON audio_training_files(created_at);

-- Insert sample data for testing
INSERT INTO users (phone, password, age, gender, region) VALUES
('0987654321', '$2a$12$BRWdAj6Wn0Y4GQ9EZyNxsOaf/72zoKaCIdL4hQCRJCsttRai3aupu', 25, 'M', 'N'),
('0345678901', '$2a$12$BRWdAj6Wn0Y4GQ9EZyNxsOaf/72zoKaCIdL4hQCRJCsttRai3aupu', 30, 'F', 'M'),
('0456789012', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewVyh7myM3/4sJOa', 28, 'M', 'S')
ON DUPLICATE KEY UPDATE phone = phone;
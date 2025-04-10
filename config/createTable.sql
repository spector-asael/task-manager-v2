DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS priority;

CREATE TABLE priority (
    priority_id SERIAL PRIMARY KEY,
    priority_name TEXT NOT NULL
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL CHECK (LENGTH(task_name) >= 3) UNIQUE, 
    task_priority INT NOT NULL, 
    task_description VARCHAR(500),
    completion_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP (0) WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_priority FOREIGN KEY (task_priority) REFERENCES priority (priority_id) ON DELETE CASCADE
);

INSERT INTO priority (priority_name)
VALUES
('Low'),
('Medium'),
('High');
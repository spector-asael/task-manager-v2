DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS priority;

CREATE TABLE priority (
    id SERIAL PRIMARY KEY,
    priority_name TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL CHECK (LENGTH(task_name) >= 3), /* Ensures task name can only be between 3-100 */
    task_priority INT NOT NULL, 
    task_description VARCHAR(500),
    created_at TIMESTAMP (0) WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_priority FOREIGN KEY (task_priority) REFERENCES priority (id) ON DELETE CASCADE
);

INSERT INTO priority (priority_name)
VALUES
('Low'),
('Medium'),
('High');
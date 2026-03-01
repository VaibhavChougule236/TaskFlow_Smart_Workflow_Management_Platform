CREATE DATABASE taskflow_db;
use taskflow_db;
INSERT INTO users (name, email, password, role)
VALUES ('Vaibhav', 'vaibhav@example.com', 'dummy_password', 'USER');


INSERT INTO tasks (title, description, category, priority, due_date, is_done, user_id)
VALUES
('Submit Assignment', 'DBMS assignment submission', 'study', 'high', '2026-03-05', false, 1),

('Team Meeting', 'Weekly project sync meeting', 'work', 'medium', '2026-03-02', false, 1),

('Buy Groceries', 'Milk, Bread, Fruits', 'personal', 'low', '2026-03-03', false, 1),

('Prepare Presentation', 'Sprint demo slides', 'work', 'high', '2026-03-01', false, 1),

('Revise Spring Security', 'JWT and role-based access', 'study', 'medium', '2026-03-04', true, 1);
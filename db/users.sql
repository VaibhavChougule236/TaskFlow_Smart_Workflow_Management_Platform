SELECT * FROM taskflow_db.users;
use taskflow_db;
INSERT INTO users (name, email, password, role)
VALUES (
'Vaibhav',
'vaibhav_admin@taskflow.com',
'$2a$10$7QhF6mK1W8F1Xx2E7V6q7uQz6o4Y2lN0K4tq5G2Q6yK0Xv2xJqH7a',
'ADMIN'
);
--TRUNCATE TABLE users RESTART IDENTITY;
--INSERT INTO users (name) VALUES ('College 1');
--INSERT INTO users (name) VALUES ('College 2');
--INSERT INTO users (name) VALUES ('College 3');

TRUNCATE TABLE users, roles RESTART IDENTITY;
INSERT INTO roles (id, name) VALUES (1, 'Admin');
INSERT INTO users (id, lastname, firstname, email, password, role) VALUES (2,'Jack','Sparrow','jack@sparrow.com', 'pass', 1);


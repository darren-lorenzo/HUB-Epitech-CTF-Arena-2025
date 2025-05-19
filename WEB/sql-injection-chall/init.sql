-- Script d'initialisation de la base SQLite
DROP TABLE IF EXISTS users;
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO users (username, password) VALUES ('admin', 'adminpass');
INSERT INTO users (username, password) VALUES ('user', 'userpass');

DROP TABLE IF EXISTS flag;
CREATE TABLE flag (flag TEXT);
INSERT INTO flag (flag) VALUES ('CTF{sql_injection_success}');

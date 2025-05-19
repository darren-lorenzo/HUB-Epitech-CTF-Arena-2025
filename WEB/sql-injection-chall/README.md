# SQL Injection Challenge

## Description
Une page de login vulnérable à l'injection SQL. Trouve le flag caché dans la base de données !

## Démarrage rapide

1. Installe SQLite3 si besoin :
   ```bash
   sudo apt-get install sqlite3
   ```
2. Initialise la base :
   ```bash
   cd WEB/sql-injection-chall
   sqlite3 database.db < init.sql
   ```
3. Lance un serveur PHP :
   ```bash
   php -S 0.0.0.0:8080
   ```
4. Accède à [http://localhost:8080](http://localhost:8080)

## Objectif
Connecte-toi sans connaître le mot de passe, récupère le flag !

## Solution attendue
Injection SQL classique sur le formulaire de login.

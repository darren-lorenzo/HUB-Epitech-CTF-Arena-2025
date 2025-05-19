# SSRF Challenge

## Description
Une page web permet de récupérer le contenu d'une URL. Trouve comment lire le flag caché sur le serveur !

## Démarrage rapide

1. Lance un serveur PHP dans ce dossier :
   ```bash
   php -S 0.0.0.0:8081
   ```
2. Accède à [http://localhost:8081](http://localhost:8081)

## Objectif
Utilise la vulnérabilité SSRF pour lire le contenu de `flag.txt` via une URL locale (ex: `file:///` ou `http://localhost/flag.txt` selon la config).

## Solution attendue
Exploite la SSRF pour obtenir le flag.

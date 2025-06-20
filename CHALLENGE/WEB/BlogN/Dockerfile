# Utilisez une image PHP avec Apache
FROM php:8.1-apache

# Définissez le répertoire de travail
WORKDIR /var/www/html

# Copiez l'application dans le conteneur
COPY app/ .

# Copiez la configuration Apache personnalisée
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

# Activez le module rewrite d'Apache (utile pour les futurs challenges si besoin)
RUN a2enmod rewrite

# Nettoyage des fichiers par défaut d'Apache pour ne pas interférer
RUN rm /etc/apache2/sites-enabled/000-default.conf

# Activez notre configuration personnalisée
RUN a2ensite 000-default.conf

# Assurez-vous que le répertoire des données est inscriptible par le serveur web
RUN mkdir -p /var/www/html/data /var/www/html/uploads && \
    chown -R www-data:www-data /var/www/html/data /var/www/html/uploads

# Exposez le port 80
EXPOSE 80

# Commande par défaut pour lancer Apache
CMD ["apache2-foreground"]
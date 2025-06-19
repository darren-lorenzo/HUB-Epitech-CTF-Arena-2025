#include <stdio.h>
#include <string.h>
#include <stdlib.h> // Pour exit()

// Cette fonction contient le flag. Elle n'est pas appelée dans le flux normal.
void give_flag() {
    FILE *fp;
    char flag[128];

    fp = fopen("flag.txt", "r");
    if (fp == NULL) {
        printf("Erreur: flag.txt introuvable ou inaccessible. Contactez l'admin du CTF.\n");
        exit(1);
    }
    
    fgets(flag, sizeof(flag), fp);
    printf("\nFélicitations ! Voici votre flag : %s\n", flag);
    fclose(fp);
    exit(0); // Quitte le programme après avoir donné le flag
}

void greet_user() {
    char name[32]; // Buffer de 32 octets pour le nom
    printf("Bienvenue dans le programme de bienvenue !\n");
    printf("Veuillez entrer votre nom : ");
    fflush(stdout); // S'assurer que le prompt est affiché avant la lecture

    // La vulnérabilité est ici : Pas de vérification de taille pour fgets()
    // ou utilisation de gets()
    // Pour une version plus simple encore, on pourrait utiliser gets()
    // gets(name); // <-- TRÈS DANGEREUX, à éviter en production !

    // Utilisons fgets() pour un peu plus de réalisme, mais sans vérification adéquate
    // Ce fgets est toujours vulnérable si l'entrée est plus grande que le buffer
    // et si le reste de la ligne est mis en buffer d'entrée,
    // mais pour un SBO "classique" on préférera gets()
    if (fgets(name, sizeof(name) + 100, stdin) == NULL) { // Lire plus que le buffer
        printf("Erreur de lecture.\n");
        exit(1);
    }
    // Supprimer le newline si présent
    name[strcspn(name, "\n")] = 0; 


    printf("Bonjour, %s ! Ravi de vous voir.\n", name);
}

int main() {
    // Désactiver la mise en mémoire tampon de la sortie standard
    setvbuf(stdout, NULL, _IONBF, 0); 
    setvbuf(stdin, NULL, _IONBF, 0);

    greet_user();

    printf("Fin du programme. Au revoir.\n");
    return 0;
}
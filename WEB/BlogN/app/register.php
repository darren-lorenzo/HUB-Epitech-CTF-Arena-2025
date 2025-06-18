<?php
session_start();

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $message = '<div class="message error">Veuillez remplir tous les champs.</div>';
    } else {
        // Pour ce challenge, nous allons utiliser un stockage très simple dans un fichier
        // Dans un vrai projet, utilisez une base de données avec des mots de passe hachés !
        $users_file = 'data/users.txt'; // Créer un dossier 'data'
        if (!is_dir('data')) {
            mkdir('data', 0755);
        }

        $users = [];
        if (file_exists($users_file)) {
            $users = json_decode(file_get_contents($users_file), true);
        }

        if (isset($users[$username])) {
            $message = '<div class="message error">Ce nom d\'utilisateur existe déjà.</div>';
        } else {
            // Pas de hachage de mot de passe pour simplifier le challenge, mais fortement déconseillé en production !
            $users[$username] = ['password' => $password];
            file_put_contents($users_file, json_encode($users));
            $message = '<div class="message success">Inscription réussie ! Vous pouvez maintenant vous connecter.</div>';
        }
    }
}
?>
<?php include 'templates/header.html'; ?>

<main>
    <h2>Inscription</h2>
    <?php echo $message; ?>
    <form action="register.php" method="post">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required>

        <input type="submit" value="S'inscrire">
    </form>
</main>

<?php include 'templates/footer.html'; ?>
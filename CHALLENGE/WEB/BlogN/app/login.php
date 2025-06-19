<?php
session_start();

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $users_file = 'data/users.txt';
    $users = [];
    if (file_exists($users_file)) {
        $users = json_decode(file_get_contents($users_file), true);
    }

    if (isset($users[$username]) && $users[$username]['password'] === $password) {
        $_SESSION['username'] = $username;
        // Si un chemin d'image de profil est enregistré, le charger
        $_SESSION['profile_pic'] = $users[$username]['profile_pic'] ?? '';
        header('Location: profile.php');
        exit;
    } else {
        $message = '<div class="message error">Nom d\'utilisateur ou mot de passe incorrect.</div>';
    }
}
?>
<?php include 'templates/header.html'; ?>

<main>
    <h2>Connexion</h2>
    <?php echo $message; ?>
    <form action="login.php" method="post">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required>

        <input type="submit" value="Se connecter">
    </form>
</main>

<?php include 'templates/footer.html'; ?>
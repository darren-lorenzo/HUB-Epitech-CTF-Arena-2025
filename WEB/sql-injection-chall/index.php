<?php
// Connexion à la base de données SQLite
$db = new PDO('sqlite:database.db');

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    // Vulnérabilité SQL Injection ici !
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $db->query($query);
    if ($result && $result->fetch()) {
        echo "<h2>Bienvenue, $username !</h2>";
        $flag = $db->query("SELECT flag FROM flag LIMIT 1")->fetch()[0];
        echo "<p>Flag : <b>$flag</b></p>";
    } else {
        echo "<p>Identifiants invalides.</p>";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>SQL Injection Challenge</title></head>
<body>
    <h1>Login</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>

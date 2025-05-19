<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérification des informations de connexion
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Nom d'utilisateur et mot de passe corrects
    if ($username === 'admin' && $password === 'Sup3rS3cr3t') {
        $_SESSION['logged_in'] = true;
        header("Location: admin.php");
        exit;
    } else {
        $error_message = "Nom d'utilisateur ou mot de passe incorrect.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Site Démo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 400px;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        h2 {
            color: #0056b3;
        }
        label {
            font-weight: bold;
            margin-bottom: 10px;
            display: inline-block;
        }
        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }
        button:hover {
            background-color: #0056b3;
        }
        .error {
            color: red;
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        footer {
            margin-top: 20px;
            text-align: center;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Connexion</h2>
        
        <!-- Afficher le message d'erreur si les informations sont incorrectes -->
        <?php if (isset($error_message)) : ?>
            <p class="error"><?php echo $error_message; ?></p>
        <?php endif; ?>
        
        <form method="POST">
            <label for="username">Nom d'utilisateur :</label>
            <input type="text" name="username" required><br>

            <label for="password">Mot de passe :</label>
            <input type="password" name="password" required><br>

            <button type="submit">Se connecter</button>
        </form>
        
        <footer>
            <p>Challenge EpiHack</p>
        </footer>
    </div>
</body>
</html>
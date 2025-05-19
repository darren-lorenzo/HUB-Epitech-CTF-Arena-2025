<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Démo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        h2 {
            color: #0056b3;
        }
        a {
            text-decoration: none;
            color: #007bff;
            margin: 10px;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
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
        <h2>Bienvenue sur le site de démo !</h2>
        <p>Une démo simple pour tester l'inclusion de pages.</p>
        <div>
            <a href="page.php?page=home">Page d'accueil</a> | 
            <a href="page.php?page=contact">Contact</a>
        </div>
        <footer>
            <p>Challenge EpiHack</p>
        </footer>
    </div>
</body>
</html>
<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit;
}

$upload_message = '';
$current_profile_pic = $_SESSION['profile_pic'] ?? '';

if (isset($_POST['upload_profile_pic'])) {
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] == UPLOAD_ERR_OK) {
        $target_dir_base = "uploads/";
        $target_dir_user = $target_dir_base . $_SESSION['username'] . "/";

        // Crée le répertoire utilisateur s'il n'existe pas
        if (!is_dir($target_dir_user)) {
            mkdir($target_dir_user, 0755, true);
        }

        $file_name = basename($_FILES["profile_pic"]["name"]);
        $target_file = $target_dir_user . $file_name;
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Filtre d'extension basique
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            $upload_message = '<div class="message error">Désolé, seuls les fichiers JPG, JPEG, PNG & GIF sont autorisés.</div>';
            $uploadOk = 0;
        }

        // Vérification de la taille (exemple)
        if ($_FILES["profile_pic"]["size"] > 500000) { // 500KB
            $upload_message = '<div class="message error">Désolé, votre fichier est trop grand.</div>';
            $uploadOk = 0;
        }

        // Si tout est ok, tenter l'upload
        if ($uploadOk == 0) {
            $upload_message = '<div class="message error">Votre fichier n\'a pas été uploadé.</div>';
        } else {
            if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $target_file)) {
                $upload_message = '<div class="message success">Le fichier '. htmlspecialchars($file_name). ' a été uploadé.</div>';

                // Sauvegarder le chemin dans les données utilisateur
                $users_file = 'data/users.txt';
                $users = [];
                if (file_exists($users_file)) {
                    $users = json_decode(file_get_contents($users_file), true);
                }
                $users[$_SESSION['username']]['profile_pic'] = $target_file;
                file_put_contents($users_file, json_encode($users));
                $_SESSION['profile_pic'] = $target_file; // Mettre à jour la session
                $current_profile_pic = $target_file; // Mettre à jour l'affichage
            } else {
                $upload_message = '<div class="message error">Désolé, une erreur est survenue lors de l\'upload de votre fichier.</div>';
            }
        }
    } else {
        $upload_message = '<div class="message error">Aucun fichier sélectionné ou erreur d\'upload.</div>';
    }
}
?>
<?php include 'templates/header.html'; ?>

<main>
    <h2>Profil de <?php echo htmlspecialchars($_SESSION['username']); ?></h2>
    
    <?php if ($current_profile_pic): ?>
        <h3>Votre image de profil actuelle :</h3>
        <img src="<?php echo htmlspecialchars($current_profile_pic); ?>" alt="Image de profil" class="profile-img">
    <?php endif; ?>

    <h3>Changer votre image de profil :</h3>
    <?php echo $upload_message; ?>
    <form action="profile.php" method="post" enctype="multipart/form-data">
        <label for="profile_pic">Sélectionner une image :</label>
        <input type="file" name="profile_pic" id="profile_pic" accept="image/*">
        <small>Seuls les fichiers JPG, JPEG, PNG et GIF sont autorisés.</small><br><br>
        <input type="submit" name="upload_profile_pic" value="Uploader l'image">
    </form>
</main>

<?php include 'templates/footer.html'; ?>
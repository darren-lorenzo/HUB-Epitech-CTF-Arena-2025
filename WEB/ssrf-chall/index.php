<?php
// SSRF Challenge: fetch remote content
if (isset($_GET['url'])) {
    $url = $_GET['url'];
    // Vulnérabilité SSRF : pas de filtrage !
    $content = @file_get_contents($url);
    if ($content !== false) {
        echo "<pre>" . htmlspecialchars($content) . "</pre>";
    } else {
        echo "<p>Erreur lors de la récupération de l'URL.</p>";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>SSRF Challenge</title></head>
<body>
    <h1>SSRF Challenge</h1>
    <form method="GET">
        <input type="text" name="url" placeholder="http://example.com" required style="width:300px;">
        <button type="submit">Fetch</button>
    </form>
</body>
</html>

<?php session_start(); ?>
<?php include __DIR__ . '/templates/header.html'; ?>

<main>
    <h2>Bienvenue sur ShopInc !</h2>
    <p style="text-align: center;">Découvrez nos produits révolutionnaires pour simplifier votre quotidien.</p>

    <div class="product-grid">
        <div class="product-item">
            <img src="https://via.placeholder.com/300/FF5733/FFFFFF?text=Gadget+X" alt="Gadget X">
            <h3>Gadget X</h3>
            <p>Le gadget le plus innovant de l'année. Indispensable pour votre maison connectée.</p>
            <div class="price">49.99€</div>
            <a href="view.php?page=product_a" class="button">Voir Détails</a>
        </div>
        <div class="product-item">
            <img src="https://via.placeholder.com/300/33FF57/FFFFFF?text=Drone+Y" alt="Drone Y">
            <h3>Drone Y</h3>
            <p>Capturez des vues aériennes époustouflantes avec notre drone de dernière génération.</p>
            <div class="price">199.99€</div>
            <a href="view.php?page=product_b" class="button">Voir Détails</a>
        </div>
        </div>
</main>

<?php include __DIR__ . '/templates/footer.html'; ?>
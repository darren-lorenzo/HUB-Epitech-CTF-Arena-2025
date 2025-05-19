<?php
session_start();
if (!isset($_SESSION['logged_in'])) {
    echo "Accès interdit";
    exit;
}
echo "Bienvenue admin !<br>Voici votre flag : EPIHACK{f1le_exp0sure_1s_d4ng3r0us}";
?>

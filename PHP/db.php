<?php
$host = "localhost";      // O també pot ser 127.0.0.1
$user = "root";           // Per defecte a XAMPP
$pass = "";               // Sense contrasenya per defecte
$dbname = "promocions_db";   // Nom de la base de dades (canvia-ho si cal)

$conn = new mysqli($host, $user, $pass, $dbname);

// Comprovació d'errors
if ($conn->connect_error) {
    die("❌ Connexió fallida: " . $conn->connect_error);
}

// echo "✅ Connexió amb la base de dades establerta correctament.";
?>

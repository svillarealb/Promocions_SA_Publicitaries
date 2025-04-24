<?php
header("Content-Type: application/json");

// Connexió a la base de dades
include "db.php"; // Assegura't que aquest fitxer conté $conn

$sql = "SELECT * FROM disponibilitat_valles";
$result = $conn->query($sql);

$valles = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $valles[] = $row;
    }
}

echo json_encode($valles);
?>
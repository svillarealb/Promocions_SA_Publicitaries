<?php
session_start();
include 'db.php';

if (!isset($_SESSION['admin'])) {
    echo "not_logged_in";
    exit;
}

$id = $_POST['id'] ?? '';

if (!$id) {
    echo "missing_id";
    exit;
}

// Obtenir la imatge
$stmt = $conn->prepare("SELECT imagen FROM publicaciones WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($imatge);
$stmt->fetch();
$stmt->close();

// Eliminar fitxer del servidor
if ($imatge && file_exists("../uploads/$imatge")) {
    unlink("../uploads/$imatge");
}

// Eliminar de la base de dades
$stmt = $conn->prepare("DELETE FROM publicaciones WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo $stmt->affected_rows > 0 ? "deleted" : "db_error";

$stmt->close();
$conn->close();
?>

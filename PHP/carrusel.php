<?php
include("db.php");

$query = "SELECT titulo, imagen, descripcion FROM publicaciones ORDER BY fecha DESC LIMIT 6";
$result = mysqli_query($conn, $query);

$projects = [];

while ($row = mysqli_fetch_assoc($result)) {
    $projects[] = [
        "titulo" => $row["titulo"],
        "descripcion" => $row["descripcion"],
        "imagen" => "../uploads/" . $row["imagen"]
    ];
}

header('Content-Type: application/json');
echo json_encode($projects);
?>

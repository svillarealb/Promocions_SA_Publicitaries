<?php
include 'db.php'; // Això carrega la connexió $conn amb mysqli

$sql = "SELECT * FROM publicaciones ORDER BY fecha DESC";
$result = $conn->query($sql);

$publicacions = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $publicacions[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($publicacions);

$conn->close();
?>



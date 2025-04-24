<?php
session_start();
include 'db.php'; // Connexió a la BDD

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Si ja hi ha una sessió iniciada
    if (isset($_SESSION['admin'])) {
        echo "already_logged";
        exit;
    }

    // Si s'han enviat dades de login
    if (!empty($_POST['username']) && !empty($_POST['password'])) {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        // Buscar a la base de dades
        $stmt = $conn->prepare("SELECT id FROM admins WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $stmt->store_result();

        // Si coincideix
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id);
            $stmt->fetch();
            $_SESSION['admin'] = $id;
            echo "success";
            exit;
        } else {
            echo "error"; // Credencials incorrectes
            exit;
        }
    }

    // Si no s'han enviat dades
    echo "not_logged";
}
?>

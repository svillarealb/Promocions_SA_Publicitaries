<?php
session_start();
$conn = new mysqli("localhost", "root", "", "promocions_db");

if ($conn->connect_error) {
    die("Error de connexió: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = md5($_POST['password']); // Xifrat bàsic, millorar després

    $sql = "SELECT * FROM admins WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['admin'] = $username;
        echo "success"; // Login correcte
    } else {
        echo "error"; // Credencials incorrectes
    }
}
?>

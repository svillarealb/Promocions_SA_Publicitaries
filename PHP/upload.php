<?php
session_start();
include 'db.php';

header("Content-Type: application/json"); // 🧠 Indiquem que la resposta és JSON

if (!isset($_SESSION['admin'])) {
    echo json_encode(["success" => false, "message" => "⚠️ No tens permís."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"] ?? null;
    $titulo = $_POST["titulo"] ?? '';
    $descripcion = $_POST["descripcion"] ?? '';
    $comentari = $_POST["comentari"] ?? '';
    $imagen = $_FILES["imagen"] ?? null;

    if (!$titulo || !$descripcion || !$comentari) {
        echo json_encode(["success" => false, "message" => "❌ Falten dades."]);
        exit;
    }

    function resumirComentari($comentari, $paraules = 20) {
        $paraulesArray = preg_split('/\s+/', strip_tags($comentari));
        $resum = implode(' ', array_slice($paraulesArray, 0, $paraules));
        return $resum . (count($paraulesArray) > $paraules ? '...' : '');
    }

    $resum_comentari = resumirComentari($comentari, 20);
    $uploadDir = "../uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $nomFinal = null;

    // 🔄 EDITAR PROJECTE
    if ($id) {
        // Si s’ha pujat nova imatge
        if ($imagen && $imagen['size'] > 0) {
            $nomFinal = uniqid() . "_" . basename($imagen["name"]);
            $rutaFinal = $uploadDir . $nomFinal;

            if (!move_uploaded_file($imagen["tmp_name"], $rutaFinal)) {
                echo json_encode(["success" => false, "message" => "❌ Error en pujar la nova imatge."]);
                exit;
            }

            // Esborrar la imatge antiga
            $stmtOld = $conn->prepare("SELECT imagen FROM publicaciones WHERE id = ?");
            $stmtOld->bind_param("i", $id);
            $stmtOld->execute();
            $stmtOld->bind_result($imgAntiga);
            if ($stmtOld->fetch() && file_exists($uploadDir . $imgAntiga)) {
                unlink($uploadDir . $imgAntiga);
            }
            $stmtOld->close();
        } else {
            // Reutilitzar la imatge existent
            $stmtImg = $conn->prepare("SELECT imagen FROM publicaciones WHERE id = ?");
            $stmtImg->bind_param("i", $id);
            $stmtImg->execute();
            $stmtImg->bind_result($nomFinal);
            $stmtImg->fetch();
            $stmtImg->close();
        }

        // Actualitzar
        $stmt = $conn->prepare("UPDATE publicaciones SET titulo=?, descripcion=?, comentario=?, imagen=?, resum_comentari=? WHERE id=?");
        $stmt->bind_param("sssssi", $titulo, $descripcion, $comentari, $nomFinal, $resum_comentari, $id);
        $stmt->execute();

        $resposta = [
            "success" => $stmt->affected_rows > 0,
            "message" => $stmt->affected_rows > 0
                ? "✅ Projecte actualitzat amb èxit!"
                : "ℹ️ No s'ha modificat res."
        ];

        echo json_encode($resposta);
        $stmt->close();
    } else {
        // 🆕 NOU PROJECTE
        if (!$imagen || $imagen['size'] <= 0) {
            echo json_encode(["success" => false, "message" => "❌ Falta la imatge."]);
            exit;
        }

        $nomFinal = uniqid() . "_" . basename($imagen["name"]);
        $rutaFinal = $uploadDir . $nomFinal;

        if (!move_uploaded_file($imagen["tmp_name"], $rutaFinal)) {
            echo json_encode(["success" => false, "message" => "❌ Error en pujar la imatge."]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO publicaciones (titulo, imagen, descripcion, comentario, resum_comentari) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $titulo, $nomFinal, $descripcion, $comentari, $resum_comentari);
        $stmt->execute();

        echo json_encode([
            "success" => $stmt->affected_rows > 0,
            "message" => $stmt->affected_rows > 0
                ? "✅ Projecte pujat correctament!"
                : "❌ Error en guardar el projecte."
        ]);
        $stmt->close();
    }

    $conn->close();
}
?>

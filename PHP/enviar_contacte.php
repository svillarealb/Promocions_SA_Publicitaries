<?php
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $nom = htmlspecialchars($_POST["nombre"]);
//     $correu = htmlspecialchars($_POST["correo"]);
//     $missatge = htmlspecialchars($_POST["mensaje"]);

//     $destinatari = "svillarealb@gmail.com"; 
//     $assumpte = "PAGINA WEB - " . $nom;

//     $cos_missatge = "Has rebut un nou missatge de la pàgina web:\n\n";
//     $cos_missatge .= "Nom: $nom\n";
//     $cos_missatge .= "Correu: $correu\n\n";
//     $cos_missatge .= "Missatge:\n$missatge\n";

//     $headers = "From: $correu";

//     if (mail($destinatari, $assumpte, $cos_missatge, $headers)) {
//         echo "<script>alert('Missatge enviat correctament.'); window.history.back();</script>";
//     } else {
//         echo "<script>alert('Error en enviar el missatge.'); window.history.back();</script>";
//     }
// } else {
//     echo "Accés no autoritzat.";
// }
// Configuració de l'error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../PHPMailer/Exception.php';
require __DIR__ . '/../PHPMailer/PHPMailer.php';
require __DIR__ . '/../PHPMailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? '';
    $email = $_POST['email'] ?? '';
    $missatge = $_POST['missatge'] ?? '';

    if (empty($nom) || empty($email) || empty($missatge)) {
        echo "Falten camps obligatoris.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuració SMTP per Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'svillarealb@gmail.com'; // ✉️ Canvia-ho si cal
        $mail->Password   = 'frqf reoe hcqq ulyq';   // 🔐 App password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // PRIMER CORREU: cap a tu (empresa)
        $mail->CharSet = 'UTF-8';

        $mail->setFrom('svillarealb@gmail.com', 'Promocions SA Publicitàries');
        $mail->addAddress('svillarealb@gmail.com', 'Receptor');

        $mail->Subject = "PAGINA WEB - $nom";
        $mail->Body    = "Missatge rebut de: $nom <$email>\n\n$missatge";
        $mail->send();

        // SEGON CORREU: resposta al client
        $mail->clearAddresses(); // Esborra el primer destinatari
        $mail->addAddress($email, $nom); // A l'usuari
        $mail->Subject = "Confirmació de recepció del teu missatge";
        $mail->Body = "Hola $nom,\n\nHem rebut el teu missatge correctament. Et respondrem tan aviat com puguem.\n\nGràcies per contactar amb nosaltres!\n\nSalutacions,\nL’equip de Promocions SA Publicitàries";

        $mail->send();

        echo "OK";
    } catch (Exception $e) {
        echo "ERROR";
    }
} else {
    echo "❌ Accés no vàlid.";
}

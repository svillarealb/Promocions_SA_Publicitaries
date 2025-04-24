<?php
session_start();
echo isset($_SESSION['admin']) ? 'true' : 'false';
?>

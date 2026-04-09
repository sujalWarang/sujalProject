<?php
$host = "localhost";  // Change if needed
$user = "root";       // Default XAMPP username
$pass = "";           // Default XAMPP password (leave empty)
$dbname = "gaming_store";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

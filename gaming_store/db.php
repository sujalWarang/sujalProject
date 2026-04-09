<?php
$host = "localhost";
$user = "root";  
$pass = "";  
$db_name = "gaming_store";  

$conn = new mysqli($host, $user, $pass, $db_name);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>

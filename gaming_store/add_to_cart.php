<?php
$servername = "localhost";
$username = "root";  // Change if needed
$password = "";
$dbname = "gaming_store"; // Ensure this matches your database

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];  // Get user ID (Assuming user is logged in)
$product_name = $data['product_name'];
$price = $data['price'];
$quantity = $data['quantity'];

$sql = "INSERT INTO cart (user_id, product_name, price, quantity) VALUES ('$user_id', '$product_name', '$price', '$quantity')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Item added to cart successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>

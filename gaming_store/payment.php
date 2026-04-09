<?php
// Connect to the database
$conn = new mysqli("localhost", "root", "", "gaming_store");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from frontend
$data = json_decode(file_get_contents("php://input"), true);
$user_email = $data['email'];
$cart = $data['cart'];

// Insert each purchased item into the database
foreach ($cart as $item) {
    $stmt = $conn->prepare("INSERT INTO purchase_history (user_email, product_name, price) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $user_email, $item['name'], $item['price']);
    $stmt->execute();
    $stmt->close();
}

// Return success response
echo json_encode(["status" => "success", "message" => "Payment successful"]);

$conn->close();
?>

<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "PROJECT");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['userId'];
$cart_items = json_encode($data['cart']);
$total_amount = $data['totalAmount'];
$transaction_id = uniqid("TXN_");

$query = "INSERT INTO payments (user_id, cart_items, total_amount, payment_status, transaction_id) 
          VALUES ('$user_id', '$cart_items', '$total_amount', 'Completed', '$transaction_id')";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true, "transaction_id" => $transaction_id]);
} else {
    echo json_encode(["success" => false, "message" => "Payment failed"]);
}

$conn->close();
?>

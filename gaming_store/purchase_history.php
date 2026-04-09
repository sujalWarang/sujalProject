<?php
$conn = new mysqli("localhost", "root", "", "gaming_store");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT product_name, price FROM purchase_history ORDER BY purchase_date DESC");

$history = [];
while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);
$conn->close();
?>

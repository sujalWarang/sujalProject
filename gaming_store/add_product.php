<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";  // Default XAMPP MySQL user
$password = "";      // Default XAMPP MySQL password
$dbname = "gaming_shop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->brand) && !empty($data->category) && !empty($data->price) && !empty($data->image)) {
    $stmt = $conn->prepare("INSERT INTO products (name, brand, category, price, image, feature) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiss", $data->name, $data->brand, $data->category, $data->price, $data->image, $data->feature);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product added successfully"]);
    } else {
        echo json_encode(["error" => "Failed to add product"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "All fields are required"]);
}

$conn->close();
?>

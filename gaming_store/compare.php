<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gaming_store";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

if (isset($_GET['action']) && $_GET['action'] == "getProducts") {
    $sql = "SELECT id, name FROM products";
    $result = $conn->query($sql);

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode($products);
    exit;
}

if (isset($_POST['product1']) && isset($_POST['product2'])) {
    $product1 = intval($_POST['product1']);
    $product2 = intval($_POST['product2']);

    $sql = "SELECT * FROM products WHERE id IN ($product1, $product2)";
    $result = $conn->query($sql);

    $comparison = [];
    while ($row = $result->fetch_assoc()) {
        $comparison[] = $row;
    }

    echo json_encode($comparison);
    exit;
}

$conn->close();
?>

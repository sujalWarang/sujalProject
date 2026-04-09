<?php
session_start();
$conn = new mysqli("localhost", "root", "", "gaming_store"); // Change database name if needed

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Encrypt password

    // Check if email or phone already exists
    $checkUser = $conn->prepare("SELECT id FROM users WHERE email = ? OR phone = ?");
    $checkUser->bind_param("ss", $email, $phone);
    $checkUser->execute();
    $checkUser->store_result();

    if ($checkUser->num_rows > 0) {
        echo "<script>alert('Email or Phone already registered!'); window.location.href='register.html';</script>";
    } else {
        // Insert new user
        $stmt = $conn->prepare("INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $full_name, $email, $phone, $password);

        if ($stmt->execute()) {
            echo "<script>alert('Registration successful!'); window.location.href='login.html';</script>";
        } else {
            echo "<script>alert('Error: Could not register.');</script>";
        }

        $stmt->close();
    }
    $checkUser->close();
}
$conn->close();
?>


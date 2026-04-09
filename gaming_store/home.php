<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: home.html"); // Redirect to login page if not logged in
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Gaming Store</title>
    <link rel="stylesheet" href="home.css">
</head>
<body>
    <div class="welcome-container">
        <h1>Welcome, <?php echo $_SESSION['user_name']; ?>!</h1>
        <img src="logo-white.png" alt="Gaming Store Logo">
        <p>Welcome to the Gaming Store.</p>
    </div>
</body>
</html>

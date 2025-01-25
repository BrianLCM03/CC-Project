<?php
include('dataconnection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the task details
    $name = $_POST['name'];
    $description = $_POST['description'];

    // Get user cookie
    if (!isset($_COOKIE['user_cookie'])) {
        // Generate a new cookie if it doesn't exist
        $user_cookie = uniqid('user_', true);
        setcookie('user_cookie', $user_cookie, time() + (86400 * 30), "/"); // 30 days expiration
    } else {
        $user_cookie = $_COOKIE['user_cookie'];
    }

    // Save task with user_cookie
    $query = "INSERT INTO tasks (name, description, user_cookie) VALUES ('$name', '$description', '$user_cookie')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>

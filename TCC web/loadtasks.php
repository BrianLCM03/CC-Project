<?php
include('dataconnection.php');

// Get the user cookie
if (!isset($_COOKIE['user_cookie'])) {
    echo json_encode([]);
    exit;
}

$user_cookie = $_COOKIE['user_cookie'];

// Fetch tasks for the specific user
$query = "SELECT * FROM tasks WHERE user_cookie = '$user_cookie'";
$result = mysqli_query($conn, $query);

$tasks = [];
while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description']
    ];
}

echo json_encode($tasks);
?>

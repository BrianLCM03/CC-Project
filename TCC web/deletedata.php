<?php
include('dataconnection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id']; // Task ID

    // Ensure the user is authenticated by their cookie
    if (isset($_COOKIE['user_cookie'])) {
        $user_cookie = $_COOKIE['user_cookie'];

        // Delete the task only if it belongs to the current user
        $query = "DELETE FROM tasks WHERE id = $id AND user_cookie = '$user_cookie'";
        if (mysqli_query($conn, $query)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'User not authenticated.']);
    }
}
?>

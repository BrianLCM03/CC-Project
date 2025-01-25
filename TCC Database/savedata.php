<?php
$host = 'localhost';
$db = 'todolist';
$user = 'root';
$pass = ''; // Update with your database password

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';

    if ($name !== '' && $description !== '') {
        $stmt = $conn->prepare("INSERT INTO tasks (name, description) VALUES (?, ?)");
        $stmt->bind_param('ss', $name, $description);
        $success = $stmt->execute();
        $stmt->close();

        echo json_encode(['success' => $success]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

$conn->close();
?>

<?php
if (!isset($_COOKIE['user_cookie'])) {
    $user_cookie = uniqid('user_', true);
    setcookie('user_cookie', $user_cookie, time() + (86400 * 30), "/"); // 30 days expiration
} else {
    $user_cookie = $_COOKIE['user_cookie'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    
    <div class="container"> 
        <h1>My To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Add a new task...">
        <textarea id="taskDescription" placeholder="Add a description..." rows="3"></textarea>
        <button id="addBtn">Add Task</button>
        <ul id="taskList"></ul>
    </div>

    <!-- Modal for viewing description
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeBtn">&times;</span>
            <h2>Task Details</h2>
            <p><strong>Task Name:</strong> <span id="modalTitle"></span></p>
            <p><strong>Description:</strong> <span id="modalDescription"></span></p>
        </div>
    </div> -->
    <!-- Modal for Edit Task -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeEditBtn">&times;</span>
            <h2>Edit Task</h2>
            <form id="editForm">
                <label for="editTitle">Task Name</label>
                <input type="text" id="editTitle" placeholder="Enter task name" required>
                
                <label for="editDescription">Description</label>
                <textarea id="editDescription" placeholder="Enter task description" required></textarea>
                
                <div class="modal-footer">
                    <button type="button" id="cancelEditBtn">Cancel</button>
                    <button type="submit" id="saveEditBtn">Save Changes</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal for viewing task details -->
    <div id="viewModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeViewModal">&times;</span>
            <h2>Task Details</h2>
            <p><strong>Task Name:</strong> <span id="viewModalTitle"></span></p>
            <p><strong>Description:</strong> <span id="viewModalDescription"></span></p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>

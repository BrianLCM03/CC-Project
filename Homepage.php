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

    <!-- Modal for viewing description -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeBtn">&times;</span>
            <h2>Task Details</h2>
            <p><strong>Task Name:</strong> <span id="modalTitle"></span></p>
            <p><strong>Description:</strong> <span id="modalDescription"></span></p>
        </div>
    </div>
    <script src="script.js"></script>

</body>
</html>

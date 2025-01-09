let taskCount = 0; // Initialize task count to 0

// Add task function
document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskText = taskInput.value.trim();
    const descriptionText = taskDescription.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    taskCount++; // Increment task number

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-number">${taskCount}.</div>
        <div class="task-content">
            <span class="task-title">${taskText}</span>
            <button onclick="viewDetails(this)" data-title="${taskText}" data-description="${descriptionText}">View</button>
        </div>
        <div class="task-actions">
            <input type="checkbox" class="task-checkbox" onclick="markDone(this)">
            <button onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    document.getElementById('taskList').appendChild(li);

    // Clear input fields
    taskInput.value = '';
    taskDescription.value = '';
}

// Delete task function with confirmation
function deleteTask(button) {
    const li = button.closest('li');
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    
    if (isConfirmed) {
        li.remove();
        updateTaskNumbers(); // Re-number tasks after deletion
    }
}

// Update task numbers after deletion
function updateTaskNumbers() {
    const tasks = document.querySelectorAll('#taskList li');
    taskCount = 0; // Reset task count to re-number

    tasks.forEach((task, index) => {
        taskCount = index + 1; // Update task count for each task
        const taskNumber = task.querySelector('.task-number');
        taskNumber.textContent = `${taskCount}.`; // Update the task number
    });
}

// Edit task function
function editTask(button) {
    const li = button.closest('li');
    const span = li.querySelector('.task-title');
    const newTaskText = prompt('Edit your task:', span.textContent);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        span.textContent = newTaskText.trim();
    }
}

// Mark task as done (strikethrough)
function markDone(checkbox) {
    const li = checkbox.closest('li');
    const span = li.querySelector('.task-title');
    if (checkbox.checked) {
        span.style.textDecoration = 'line-through'; // Add strikethrough
    } else {
        span.style.textDecoration = 'none'; // Remove strikethrough
    }
}

// View task details
function viewDetails(button) {
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');
    alert(`Task: ${title}\nDescription: ${description}`);
}

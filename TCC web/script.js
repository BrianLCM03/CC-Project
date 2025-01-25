// let taskCount = 0; // Initialize task count to 0

// Load tasks from the server
document.addEventListener('DOMContentLoaded', loadTasks);

async function loadTasks() {
    const response = await fetch('loadtasks.php');
    if (response.ok) {
        const tasks = await response.json();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear the list before loading

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);
            li.innerHTML = `
                <div class="task-number">${index + 1}.</div>
                <div class="task-content">
                    <span class="task-title">${task.name}</span>
                    <button onclick="viewDetails(this)" data-title="${task.name}" data-description="${task.description}">View</button>
                </div>
                <div class="task-actions">
                    <input type="checkbox" class="task-checkbox" onclick="markDone(this)">
                    <button onclick="editTask(this)">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    } else {
        alert('Failed to load tasks.');
    }
}

// Add task function
document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskText = taskInput.value.trim();
    const descriptionText = taskDescription.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Send data to PHP backend
    const response = await fetch('savedata.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(taskText)}&description=${encodeURIComponent(descriptionText)}`
    });

    if (response.ok) {
        const result = await response.json();
        if (result.success) {
            // Reload the page to reflect changes
            window.location.reload();
        } else {
            alert('Failed to save task. Please try again.');
        }
    } else {
        alert('Error connecting to server.');
    }
}

// Other functions remain the same (deleteTask, updateTaskNumbers, editTask, markDone, viewDetails)


// Delete task function with confirmation
async function deleteTask(button) {
    const li = button.closest('li');
    const id = li.getAttribute('data-id'); // Get task ID from the `data-id` attribute
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    
    if (isConfirmed) {
        // Send the delete request to the backend
        const response = await fetch('deletedata.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${encodeURIComponent(id)}`
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                // Reload the page to reflect changes
                window.location.reload();
            } else {
                alert('Failed to delete task. Please try again.');
            }
        } else {
            alert('Error connecting to the server.');
        }
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

// // Edit task function
// async function editTask(button) {
//     const li = button.closest('li');
//     const id = li.getAttribute('data-id'); // Get task ID from the `data-id` attribute
//     const span = li.querySelector('.task-title');
//     const description = li.querySelector('.task-description')?.textContent || ''; // Add description handling
//     const newTaskText = prompt('Edit your task:', span.textContent);

//     if (newTaskText !== null && newTaskText.trim() !== '') {
//         // Send the updated task to the backend
//         const response = await fetch('editdata.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: `id=${encodeURIComponent(id)}&name=${encodeURIComponent(newTaskText)}&description=${encodeURIComponent(description)}`
//         });

//         if (response.ok) {
//             const result = await response.json();
//             if (result.success) {
//                 // Reload the page to reflect changes
//                 window.location.reload();
//             } else {
//                 alert('Failed to edit task. Please try again.');
//             }
//         } else {
//             alert('Error connecting to the server.');
//         }
//     }
// }

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

// View task details function (opens View Modal)
function viewDetails(button) {
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');

    // Set task details in the modal
    document.getElementById('viewModalTitle').textContent = title;
    document.getElementById('viewModalDescription').textContent = description;

    // Show the modal
    document.getElementById('viewModal').style.display = 'block';
}

// Edit task function (opens Edit Modal)
// Show modal for editing task
function editTask(button) {
    const li = button.closest('li');
    const taskId = li.getAttribute('data-id');
    const taskName = li.querySelector('.task-title').textContent;
    const taskDescription = li.querySelector('.task-description')?.textContent || '';

    // Populate modal with current task details
    document.getElementById('editTitle').value = taskName;
    document.getElementById('editDescription').value = taskDescription;
    document.getElementById('editModal').style.display = "block";

    // Save task changes
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedTaskName = document.getElementById('editTitle').value.trim();
        const updatedDescription = document.getElementById('editDescription').value.trim();

        if (updatedTaskName === '') {
            alert('Please enter a task name.');
            return;
        }

        const response = await fetch('editdata.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${encodeURIComponent(taskId)}&name=${encodeURIComponent(updatedTaskName)}&description=${encodeURIComponent(updatedDescription)}`
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                window.location.reload(); // Reload to update the task list
            } else {
                alert('Failed to update task.');
            }
        } else {
            alert('Error connecting to the server.');
        }
    });
}

// Close modal functionality
document.getElementById('closeEditBtn').onclick = function () {
    document.getElementById('editModal').style.display = "none";
};

// Cancel edit and close modal
document.getElementById('cancelEditBtn').onclick = function () {
    document.getElementById('editModal').style.display = "none";
};

// Close the View Modal
document.getElementById('closeViewModal').onclick = function () {
    document.getElementById('viewModal').style.display = 'none';
};

// Close the modal if clicked outside of it
window.onclick = function (event) {
    if (event.target == document.getElementById('editModal')) {
        document.getElementById('editModal').style.display = 'none';
    } else if (event.target == document.getElementById('viewModal')) {
        document.getElementById('viewModal').style.display = 'none';
    }
};
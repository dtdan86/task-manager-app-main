/**
 * Task Manager Application
 *
 * In this assignment, you will create a task manager application that allows users to add, remove, and mark tasks as completed.
 * You will also implement features to filter tasks by their status.
 *
 * Tasks are stored in an array and the application updates the display by rendering the contents of this array.
 * Your job is to complete the parts of the code base as indicated with the TODOs in order to provide project functionality.
 *
 * Concepts covered in this project:
 * - Higher-order functions
 * - Callbacks
 * - Array methods (map, filter, reduce)
 */

const TaskManager = (function() {
    let tasks = [];
    let nextId = 1;

    // Function to create a new task
    const createTask = (title) => ({
        id: nextId++,
        title,
        status: 'pending'
    });

    // Function to add a task
    // Reference: Unit 2 - Higher-Order Functions and Callbacks
    const addTask = (title) => {
        // Add the new task to the tasks array
        // TODO: Implement this function using the provided createTask function
        tasks.push(createTask(title));
        // Call renderTasks to update the display
        renderTasks();
    };

    // Function to remove a task by id
    // Reference: Unit 2 - Array Methods: map, filter, reduce
    const removeTask = (id) => {
        // Filter tasks array
        // TODO: Implement this function to filter out the task with the specified id
        tasks = tasks.filter(task => task.id !== id);
        // Call renderTasks to update the display
        renderTasks();
    };

    // Function to mark a task as completed
    // Reference: Unit 2 - Array Methods: map, filter, reduce
    const markTaskAsCompleted = (id) => {
        // Map through tasks array to update the task status
        // TODO: Implement this function to update the status of the specified task to 'completed'
        tasks.forEach(task => {
            if (task.id == id) {
                task.status = 'completed';
            }
        });
        

        // Call renderTasks to update the display
        renderTasks();
    };

    // Function to filter tasks by status
    // Reference: Unit 2 - Array Methods: map, filter, reduce
    const filterTasks = (status) => {
        // Return filtered tasks array
        // TODO: Implement this function to return tasks based on their status
        let filterTasks = tasks.filter(task => task.status == status);
        return filterTasks
    };

    // Render tasks to the DOM
    const renderTasks = (filteredTasks = tasks) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'list-group-item';
            taskItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${task.title}</h5>
                        ${task.status === 'completed' ? '<span class="badge bg-success">Completed</span>' : ''}
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm" onclick="TaskManager.markTaskAsCompleted(${task.id})" ${task.status === 'completed' ? 'disabled' : ''}>Complete</button>
                        <button class="btn btn-danger btn-sm" onclick="TaskManager.removeTask(${task.id})">Remove</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // Public API
    return {
        addTask,
        removeTask,
        markTaskAsCompleted,
        filterTasks,
        renderTasks
    };
})();

// Event listeners for the buttons
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value;
    if (title) {
        TaskManager.addTask(title);
        document.getElementById('taskTitle').value = '';
    }
});

// Example filter buttons
document.getElementById('showAllTasksBtn').addEventListener('click', () => {
    TaskManager.renderTasks();
});

document.getElementById('showPendingTasksBtn').addEventListener('click', () => {
    const pendingTasks = TaskManager.filterTasks('pending');
    TaskManager.renderTasks(pendingTasks);
});

document.getElementById('showCompletedTasksBtn').addEventListener('click', () => {
    const completedTasks = TaskManager.filterTasks('completed');
    TaskManager.renderTasks(completedTasks);
});

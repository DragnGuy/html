const taskInput = document.getElementById('taskInput'); 
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
        addTaskToList(taskText);
    });
});

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Do not add an empty task

    addTaskToList(taskText);

    // Save tasks to localStorage
    saveTasksToLocalStorage();

    taskInput.value = '';
}

function addTaskToList(taskText) {
    const li = document.createElement('li');

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        // Remove task from localStorage
        removeTaskFromLocalStorage(taskText);
    });

    li.appendChild(document.createTextNode(taskText)); // Append task text
    li.appendChild(deleteBtn); // Append delete button
    taskList.appendChild(li);
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => li.firstChild.textContent); // Extract only task text
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
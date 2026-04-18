const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Load saved tasks
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('todos')) || [];
  saved.forEach(task => addTask(task.text, task.completed));
};

addBtn.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    addTask(input.value);
    input.value = '';
  }
});

function addTask(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  list.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({ text: li.textContent, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('todos', JSON.stringify(tasks));
}


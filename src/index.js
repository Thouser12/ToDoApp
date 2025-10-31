// === SELETORES ===
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("add-task-btn");
const modalBtn = document.getElementById("todo-btn");
const input = document.querySelector(".todo-input");
const taskContainer = document.getElementById("task-container");
const clearBtn = document.getElementById("clear-tasks");
const progress = document.querySelector(".progress");

// === ESTADO (LocalStorage) ===
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// === FUNÇÕES DE MODAL ===
openModalBtn.onclick = function() {
  modal.style.display = "flex";
}

modalBtn.onclick = function() {
  addTask();
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function closeModal() {
  modal.style.display = "none";
  input.value = "";
}

// === FUNÇÕES DE TAREFAS ===
function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    done: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  closeModal();
}

function toggleTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  tasks[index].done = !tasks[index].done;

  if (tasks[index].done) {
    const [completed] = tasks.splice(index, 1); 
    tasks.push(completed); 
  } else {
    const [uncompleted] = tasks.splice(index, 1);
    tasks.unshift(uncompleted);
  }

  saveTasks();
  renderTasks();
}


function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function clearAllTasks() {
  tasks = [];
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// === RENDERIZAÇÃO ===
function renderTasks() {
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.innerHTML = `<p style="text-align:center; opacity:0.6;">Nenhuma tarefa adicionada.</p>`;
    progress.style.width = "0%";
    return;
  }

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    if (task.done) div.classList.add("done");

    div.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="spacer">
      <span class="material-symbols-outlined complete-btn" title="Concluir">check</span>
      <span class="material-symbols-outlined delete-btn" title="Excluir">delete</span>
      </div>
    `;

    div.querySelector(".complete-btn").onclick = () => toggleTask(task.id);
    div.querySelector(".delete-btn").onclick = () => deleteTask(task.id);

    taskContainer.appendChild(div);
  });

  updateProgress();
}

function updateProgress() {
  const doneTasks = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const percentage = total === 0 ? 0 : (doneTasks / total) * 100;
  progress.style.width = `${percentage}%`;
}

// === EVENTOS ===
clearBtn.onclick = clearAllTasks;
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// === INICIALIZAÇÃO ===
renderTasks();
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

// Carrega tarefas salvas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Salva no navegador
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderiza na tela
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    // Marcar como concluída
    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Botão excluir
    const btn = document.createElement("button");
    btn.textContent = "X";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Adicionar tarefa
form.addEventListener("submit", (e) => {
  e.preventDefault();

  tasks.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
});

// Inicializa
renderTasks();

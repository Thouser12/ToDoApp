// Pegar o modal
var modal = document.getElementById("modal");
// Pegar o botao que abre o modal
var openModalBtn = document.getElementById("add-task-btn");
// Pegar o botao que adiciona a tarefa
var modalBtn = document.getElementById("todo-btn");

// Quando o usuario clicar no botao, abrir o modal
openModalBtn.onclick = function() {
  modal.style.display = "flex";
}

// Quando o usuario clicar no botao de adicionar, adicionar tarefa e fechar o modal
modalBtn.onclick = function() {
  modal.style.display = "none";
}

// Quando o usuario clicar fora do modal, fechar o modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


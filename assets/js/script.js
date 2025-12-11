// Start Select HTML Elements
let todoForm = document.querySelector(".todo-app form");
let todoInput = document.querySelector(".todo-app form input");
let todoButton = document.querySelector(".todo-app form button");
let overlay = document.querySelector(".overlay");
let todoEdit = document.querySelector(".todo-app .todo-edit");
let todoEditInput = document.querySelector(".todo-edit form input");
let todoEditClose = document.querySelector(".todo-edit .head .close");
let todoEditCheck = document.querySelector(".todo-edit .label .check");
let todoEditForm = document.querySelector(".todo-edit form");
let todoResult = document.querySelector(".todo-app .result");
let info = document.querySelector(".todo-app .info span");
let selectedTodoTextLi = null;

console.log(todoResult);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoInput.value.trim() !== "") {
    createResult();
  }


});

function createResult() {
  // Create Todo div
  let todo = document.createElement("div");
  // Set Class Todo On Todo Div
  todo.classList.add("todo");

  // Create todo-text
  let todoText = document.createElement("div");
  // Set Class Todo Text On Todo Text
  todoText.classList.add("todo-text");

  // Craete Todo Text Li
  let todoTextLi = document.createElement("li");
  // Set Todo Text Li A Text Node
  let todoTextLiText = document.createTextNode(todoInput.value);
  // Set Attribute TO Todo Text Li Is Max Length

  // Append todoTextLiText To todoTextLi
  todoTextLi.appendChild(todoTextLiText);

  // Craete Button
  let todoTextButton = document.createElement("button");
  // Craete Todo Text Button Icon Check
  let todoTextIconCheck = document.createElement("i");
  // Set todo Text Button Icon Check A Class
  todoTextIconCheck.className = "bx bx-check check";
  // Craete Todo Text Button Icon Edit
  let todoTextIconEdit = document.createElement("i");
  // Set todo Text Button Icon Edit A Class
  todoTextIconEdit.className = "bx bx-edit edit";
  // Craete Todo Text Button Icon Trash
  let todoTextIconTrash = document.createElement("i");
  // Set todo Text Button Icon Trash A Class
  todoTextIconTrash.className = "bx bx-trash trash";

  // Append Todo Text Button Icons In Parent Element (Button)
  todoTextButton.append(todoTextIconEdit, todoTextIconCheck, todoTextIconTrash);

  // Append Todo Text Button In Todo Text And Append todoTextButton To todoText
  todoText.append(todoTextLi, todoTextButton);

  // Append Todo Text In Todo Div
  todo.appendChild(todoText);

  // Append Todo Div In Result
  todoResult.appendChild(todo);

  updateInfo()
  todoInput.value = ''

  // On Write More 10 Letter
  todoTextLi.addEventListener("input", () => {
    if (todoTextLi.textContent.length > 10) {
      todoTextLi.textContent = todoTextLi.textContent.slice(0, 10);

      let selection = window.getSelection();
      let range = document.createRange();

      range.selectNodeContents(todoTextLi);
      range.collapse(todoTextLi);
      selection.removeAllRanges();
      selection.addRange(todoTextLi);
    }
  });

  // On Todo Text Check
  todoTextButton.querySelectorAll("i").forEach((li) => {
    li.addEventListener("click", () => {
      if (li.classList.contains("bx-check")) {
        handleCheckClick(todoText, li);
      } else if (li.classList.contains("bx-check-circle")) {
        li.classList.replace("bx-check-circle", "bx-check");
        todoText.classList.remove("checked");
      }
      if (li.classList.contains("bx-trash")) {
        handleRemoveClick(todoText, todo);
      }
      if (li.classList.contains("bx-edit")) {
        handleEditClick(todoText, todoTextLi, li);
      } else if (li.classList.contains("bx-save")) {
        li.classList.replace("bx-save", "bx-edit");
      }
    });
  });

  overlay.addEventListener("click", handleCloseTodoEdit);
  todoEditClose.addEventListener("click", handleCloseTodoEdit);
  todoEditCheck.addEventListener("click", () => {
    selectedTodoTextLi.textContent = todoEditInput.value;
    handleCloseTodoEdit();
  });

  //   Handle Check Click
  function handleCheckClick(todoText, li) {
    todoText.classList.add("checked");
    let saveIcon = todoTextButton.querySelector(".bx-save");
    if (saveIcon) saveIcon.classList.replace("bx-save", "bx-edit");
    li.classList.replace("bx-check", "bx-check-circle");
  }

  // Set Info Span Lenght Of Todo List
}

todoEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  overlay.style.display = "none";
  todoEdit.style.display = "none";
  document
    .querySelector(".todo-text button .bx-save")
    .classList.replace("bx-save", "bx-edit");
  selectedTodoTextLi.textContent = todoEditInput.value;
});

//   Handle Edit Click
function handleEditClick(todoText, todoTextLi, li) {
  selectedTodoTextLi = todoTextLi;
  overlay.style.display = "block";
  todoEdit.style.display = "block";
  todoEditInput.value = todoTextLi.textContent;
  todoEditInput.focus();
  todoText.classList.remove("checked");
  li.classList.replace("bx-edit", "bx-save");
  document
    .querySelector(".todo-text button .bx-check-circle")
    .classList.replace("bx-check-circle", "bx-check");
}
function handleCloseTodoEdit() {
  overlay.style.display = "none";
  todoEdit.style.display = "none";
  let saveIcon = document.querySelector(".todo-text button .bx-save");
  if (saveIcon) saveIcon.classList.replace("bx-save", "bx-edit");
}

function handleRemoveClick(todoText, todo) {
  todoText.classList.toggle("removed");

  todoText.addEventListener("transitionend", () => {
    todo.remove();
    info.innerHTML = todoResult.children.length;
  });
}

function updateInfo() {
  info.innerHTML = todoResult.children.length;
}

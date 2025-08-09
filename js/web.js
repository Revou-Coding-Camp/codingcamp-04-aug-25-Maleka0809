const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoListUL = document.getElementById('todo-list');
const deleteAllButton = document.getElementById('delete-all-button');
const filterButton = document.getElementById('filter-button');

let allTodos = [];


todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    AddTodo();
});

function AddTodo() {
    const todoText = todoInput.value.trim();
    const todoDateValue = todoDate.value;

    if (todoText.length > 0 && todoDateValue.length > 0) {
        allTodos.push({
            text: todoText,
            date: todoDateValue,
            done: false
        });
        updateTodolist();
        todoInput.value = "";
        todoDate.value = "";
    } else {
        alert("Tolong diisi yang lengkap");
    }
}


function updateTodolist() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}


function createTodoItem(todo, index) {
    const todoLI = document.createElement("li");
    todoLI.className = "todo";

    const checkboxId = `todo-${index}`;

    todoLI.innerHTML = `
        <input type="checkbox" id="${checkboxId}" ${todo.done ? "checked" : ""}>
        <label class="custom-checkbox" for="${checkboxId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" 
                viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M400-304 240-464l56-56 104 104 
                    264-264 56 56-320 320Z"/>
            </svg>
        </label>
        <label for="${checkboxId}" class="todo-text" style="color: blanchedalmond;">
            ${todo.text} <span style="color:gray;">(${todo.date})</span>
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200
                    v-40h240v40h200v80h-40v520q0 33-23.5
                    56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80
                    v-360h-80v360Zm160 0h80v-360h-80v360Z"/>
            </svg>
        </button>
    `;


    const checkbox = todoLI.querySelector(`#${checkboxId}`);
    checkbox.addEventListener("change", () => {
        allTodos[index].done = checkbox.checked;
    });


    todoLI.querySelector(".delete-button").addEventListener("click", () => {
        allTodos.splice(index, 1);
        updateTodolist();
    });

    return todoLI;
}


function deleteAllTodos() {
    if (confirm("Yakin mau hapus semua todo?")) {
        allTodos = [];
        updateTodolist();
    }
}
deleteAllButton.addEventListener('click', deleteAllTodos);


function filterTodos() {
    const filterType = prompt("Pilih filter: all / done / not-done");
    const todos = document.querySelectorAll('#todo-list li');

    todos.forEach((todoEl, index) => {
        const isDone = allTodos[index].done;

        if (filterType === "done" && !isDone) {
            todoEl.style.display = "none";
        } else if (filterType === "not-done" && isDone) {
            todoEl.style.display = "none";
        } else {
            todoEl.style.display = "";
        }
    });
}
filterButton.addEventListener('click', filterTodos);

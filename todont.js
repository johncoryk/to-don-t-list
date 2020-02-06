let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: true,
    id: Date.now()
  };

  todoItems.push(todo);

  const list = document.querySelector('.todo-list');
  list.insertAdjacentHTML(
    'beforeend',
    `
    <li class="todo-item done" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox" class="tick-btn" checked/>
      <label for="${todo.id}" class="tick"></label>
      <span>${todo.text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" class="delete-todo"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v14h14V5H5zm8.41 7l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"/></svg>
    </li>
  `
  );
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  if (todoItems[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
}

function deleteTodo(key) {
  todoItems = todoItems.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
}

const form = document.querySelector('.todo-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.todo-list');
list.addEventListener('click', event => {
  if (event.target.matches('.tick-btn')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.matches('.delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

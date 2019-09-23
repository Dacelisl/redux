import { createStore } from 'redux';
import { initialState } from './initState';
import { rootReducer } from './reducers/index';
import { actionAddTask, actionDelete, changeFilter } from './Actions';


const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

document.addEventListener("DOMContentLoaded", (event) => {
    initApp();
});

function initApp() {
    const $form = document.getElementById('form');
    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData($form);
        store.dispatch(actionAddTask({
            id: 12,
            text: data.get('text'),
            completed: false
        }));
        const $input = document.getElementById('new-todo');
        $input.value = "";
    });
    setTimeout(() => {
        store.dispatch(actionDelete({ id: 1 }));
    }, 3000);
    setTimeout(() => {
        store.dispatch(changeFilter({ filter: 'ACTIVE' }));
    }, 6000);
    setTimeout(() => {
        store.dispatch(changeFilter({ filter: 'COMPLETED' }));
    }, 10000);
    store.subscribe(handleChange);
    render();
}

function handleChange() {
    render();
}

function render() {
    let todos = store.getState().todos;
    const filter = store.getState().filter;
    if (filter === 'ACTIVE') {
        todos = todos.filter(todo => !todo.completed);
    }
    if (filter === 'COMPLETED') {
        todos = todos.filter(todo => todo.completed);
    }
    renderTodos(todos);
}

function renderTodos(todos) {
    const $container = document.getElementById('todo-list');
    $container.innerHTML = '';
    let todosHtml = '';
    todos.forEach(todo => {
        todosHtml += renderTodo(todo);
    });
    $container.innerHTML = todosHtml;
}

function renderTodo(todo) {
    return `
		<li data-id="${todo.id}" class="${todo.completed}">
				<div class="view">
						<input class="toggle" type="checkbox" ${todo.completed ? 'checked': ''}>
						<label>${todo.text}</label>
						<button class="destroy"></button>
				</div>
		</li>`;
}
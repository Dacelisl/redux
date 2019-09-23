import { createStore, combineReducers } from 'redux';

// your code

let store;

const todos = [{
        id: 1,
        completed: true,
        text: 'Task 1',
    },
    {
        id: 2,
        completed: false,
        text: 'Task 2',
    },
    {
        id: 3,
        completed: true,
        text: 'Task 3',
    },
    {
        id: 4,
        completed: true,
        text: 'Task 4',
    },
]

const initialState = {
    todos,
    filter: 'ALL'
};

document.addEventListener("DOMContentLoaded", (event) => {
    initApp();
});

const reducerFilter = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            {
                let filter = action.payload.filter;
                return filter;
            }
        default:
            return state;

    }
}

const reducerTodos = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TASK':
            {
                return [...state.todos, action.payload];
            }
        case 'DELETE_TASK':
            {
                let id = action.payload.id;
                return state.filter((item) => {
                    return item.id !== id
                })
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    todos: reducerTodos,
    filter: reducerFilter
})

const actionDelete = (payload) => {
    return {
        type: 'DELETE_TASK',
        payload
    }
}
const actionAddTask = (payload) => {
    return {
        type: 'ADD_TASK',
        payload
    }
}
const changeFilter = (payload) => {
    return {
        type: 'CHANGE_FILTER',
        payload
    }
}

function initApp() {
    store = createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
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
    console.log(filter);
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
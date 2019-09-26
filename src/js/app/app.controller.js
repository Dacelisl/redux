import { actionAddTodo, changeFilter, actionDelete, actionToggle } from '../actions/index';
export class AppController {

    constructor(template, store) {
        this.template = template;
        this.store = store;
        this.template.bindAddTodo(this.addTodo.bind(this));
        this.template.bindRemoveTodo(this.deleteTodo.bind(this));
        this.template.bindToggleTodo(this.toggleTodo.bind(this));
        this.store.subscribe(this.showTodos.bind(this));
    }

    setRoute(route) {
        const filter = this.getFilter(route);
        this.store.dispatch(
            changeFilter({ filter })
        )
    }

    getFilter(route) {
        switch (route) {
            case '#/active':
                return 'ACTIVE';
            case '#/completed':
                return 'COMPLETED';
            default:
                return 'ALL';
        }
    }

    toggleTodo(id) {
        this.store.dispatch(
            actionToggle({ id })
        )
    }

    addTodo(data) {
        this.store.dispatch(
            actionAddTodo({
                id: 12,
                text: data.get('text'),
                completed: false
            }));
    }

    deleteTodo(id) {
        this.store.dispatch(
            actionDelete({ id })
        );
    }

    showTodos() {
        const store = this.store.getState();
        let filter = store.filter;
        let todos = store.todos;
        if (filter === 'ACTIVE') {
            todos = todos.filter(todo => !todo.completed);
        }
        if (filter === 'COMPLETED') {
            todos = todos.filter(todo => todo.completed);
        }
        this.template.showTodos(todos);
    }
}
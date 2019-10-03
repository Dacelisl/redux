import { actionAddTodo, changeFilter, actionDelete, actionToggle, loadTodos } from '../actions/index';
import { getVisibleTodos } from './../selectors'
import subscribe from 'redux-subscribe-reselect'
import { success, fail, fetchTodos } from './../effects/effects';

export class AppController {

    constructor(template, store) {
        this.template = template;
        this.store = store;
        this.template.bindAddTodo(this.addTodo.bind(this));
        this.template.bindRemoveTodo(this.deleteTodo.bind(this));
        this.template.bindToggleTodo(this.toggleTodo.bind(this));
        /* this.store.subscribe(this.showTodos.bind(this)); */
        subscribe(this.store, getVisibleTodos, this.showTodos.bind(this));
        /*  this.store.dispatch(success());
         this.store.dispatch(fail()); */
        this.store.dispatch(fetchTodos());
        this.store.dispatch(loadTodos());
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
                title: data.get('text'),
                completed: false
            }));
    }

    deleteTodo(id) {
        this.store.dispatch(
            actionDelete({ id })
        );
    }

    showInitTodos() {
        const state = this.store.getState();
        const todos = getVisibleTodos(state)
        this.showTodos(todos);
    }

    showTodos(todos) {
        if (todos !== undefined) {
            this.template.showTodos(todos);
        }
        /* const state = this.store.getState(); */
        /* let filter = state.filter;
        let todos = state.todos;
        if (filter === 'ACTIVE') {
            todos = todos.filter(todo => !todo.completed);
        }
        if (filter === 'COMPLETED') {
            todos = todos.filter(todo => todo.completed);
        } */
        /* const todos = getVisibleTodos(state) */
    }
}
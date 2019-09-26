import { createStore } from 'redux';
import { initialState } from './initState';
import { rootReducer } from './reducers/index';
import { AppController } from './app/app.controller';
import { AppTemplate } from './app/app.template';
import { $on } from './app/app.helper';
/* import { actionAddTask, actionDelete, changeFilter } from './Actions'; */


document.addEventListener("DOMContentLoaded", (event) => {
    const store = createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    const template = new AppTemplate();
    const controller = new AppController(template, store);
    controller.showTodos();

    const setRoute = () => {
        controller.setRoute(document.location.hash)
    }

    $on(window, 'hashchange', setRoute);
});
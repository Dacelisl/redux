import { createStore, applyMiddleware, compose } from 'redux';
import { initialState } from './initState';
import { rootReducer } from './reducers/index';
import { AppController } from './app/app.controller';
import { AppTemplate } from './app/app.template';
import { $on } from './app/app.helper';
import thunk from 'redux-thunk'

document.addEventListener("DOMContentLoaded", (event) => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
    const template = new AppTemplate();
    const controller = new AppController(template, store);
    controller.showInitTodos();

    const setRoute = () => {
        controller.setRoute(document.location.hash)
    }

    $on(window, 'hashchange', setRoute);
});
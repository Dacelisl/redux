export const actionDelete = (payload) => {
    return {
        type: 'DELETE_TODO',
        payload
    }
}
export const actionAddTodo = (payload) => {
    return {
        type: 'ADD_TODO',
        payload
    }
}
export const changeFilter = (payload) => {
    return {
        type: 'CHANGE_FILTER',
        payload
    }
}
export const loadTodos = (payload) => {
    return {
        type: 'LOAD_TODOS_START',
        payload
    }
}
export const actionToggle = (payload) => {
    return {
        type: 'TOGGLE_TODO',
        payload
    }
}
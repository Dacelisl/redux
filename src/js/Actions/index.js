export const actionDelete = (payload) => {
    return {
        type: 'DELETE_TASK',
        payload
    }
}
export const actionAddTask = (payload) => {
    console.log('payload', payload);
    return {
        type: 'ADD_TASK',
        payload
    }
}
export const changeFilter = (payload) => {
    return {
        type: 'CHANGE_FILTER',
        payload
    }
}
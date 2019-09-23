export const reducerTodos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK':
            console.log('state:', action.payload); {
                return [...state, action.payload];
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
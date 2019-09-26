export const reducerTodos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            {
                return [...state, action.payload];
            }
        case 'DELETE_TODO':
            {
                let id = action.payload.id;
                return state.filter((item) => {
                    return item.id !== id
                })
            }
        case 'TOGGLE_TODO':
            {
                const id = action.payload.id;
                return state.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            completed: !item.completed
                        };
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}
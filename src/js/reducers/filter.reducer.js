export const reducerFilter = (state = '', action) => {
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
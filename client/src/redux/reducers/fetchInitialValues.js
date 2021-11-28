// eslint-disable-next-line import/no-anonymous-default-export
export default (state={}, action) => {
    if (action.type === 'FETCH_INITIAL_VALUES') {
        return action.payload;
    }
    return state;
}


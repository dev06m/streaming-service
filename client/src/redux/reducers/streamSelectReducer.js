// eslint-disable-next-line import/no-anonymous-default-export
export default (state=null, action) => {
    if (action.type === 'SELECT_STREAM') {
        return action.payload;
    }
}


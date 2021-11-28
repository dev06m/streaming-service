import  * as types from '../actions/types';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state={}, action) => {
    switch (action.type) {
        case types.FETCH_STREAMS:
            return  {
                ...state,
                ...action.payload.reduce((newState, stream) => {
                newState[stream.id] = stream
                return newState
            }, {}) }
        case types.FETCH_STREAM:
            return { [action.payload.id]: action.payload };
        case types.CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case types.EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case types.DELETE_STREAM:
            const newState = { ...state };
            delete newState[action.payload]; // action creater dan action gelmiyo
            return newState;
        default:
            return state;
    }
}


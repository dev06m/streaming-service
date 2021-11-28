import streams from '../apis/stream';
import { 
        SIGN_IN, 
        SIGN_OUT, 
        CREATE_STREAM,
        FETCH_STREAMS,
        FETCH_STREAM,
        DELETE_STREAM,
        EDIT_STREAM
    } from "./types";
// import createBrowserHistory from "../../history";
// import { useHistory } from "react-router-dom";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formValues) => async (dispatch, getState) => {
    const response = await streams.post('/streams', {...formValues, userId: getState().auth.userId});
    dispatch({type: CREATE_STREAM, payload: response.data})
    // createBrowserHistory.pus('/');
    return response;
}

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');
    dispatch({type: FETCH_STREAMS, payload: response.data});
}

export const fetchStream = streamId => async dispatch => {
    const response = await streams.get('/streams/' + streamId);
    dispatch({type: FETCH_STREAM, payload: response.data})
}

export const editStream = (streamId, formValues) => async dispatch => {
    const response = await streams.put('/streams/' + streamId, formValues);
    dispatch({type: EDIT_STREAM, payload: response.data});
    return response;
}

export const deleteStream = streamId => async dispatch => {
    // let history = useHistory();
    await streams.delete('/streams/' + streamId);
    dispatch({type: DELETE_STREAM, payload: streamId });
    // history.push('/')
}

export const fetchInitialValues = (streamId) => async dispatch => {
    const response = await streams.get('/streams/' + streamId);
    dispatch({type: 'FETCH_INITIAL_VALUES', payload: response.data})
}

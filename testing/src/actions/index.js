import axios from 'axios';

import { SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH } from 'actions/types';

export const saveComment = comment => {
    return {
        type: SAVE_COMMENT,
        payload: comment
    };
};

export const fetchComments = () => {
    const response = axios.get('https://jsonplaceholder.typicode.com/comments');
    
    // We are setting the action payload to the returned promise
    // - the redux-promise middleware allows us to do this
    return {
        type: FETCH_COMMENTS,
        payload: response
    };
};

export const changeAuth = authenticated => {
    return {
        type: CHANGE_AUTH,
        payload: authenticated
    };
};
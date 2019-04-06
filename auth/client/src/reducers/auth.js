import { AUTH_USER, AUTH_ERROR } from '../actions/types';

// 'authenticated' property will hold the JWT if authenticated, otherwise empty
const initialState = {
    authenticated : '',
    errorMsg : ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload, errorMsg: '' };
        case AUTH_ERROR:
            return { ...state, errorMsg: action.payload };
        default:
            return state;
    }
};
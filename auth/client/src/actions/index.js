/* global localStorage */
import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

// Because we are using Redux Thunk we can either
//  - return an action object (normal case)
//  OR
//  - return a function, which automatically gets called with the 
//    Redux dispatch function as an argument
//  ( allows us to dispatch as many actions as we want and wait for
//    as long as we want 
//      ... all from a single action creator 
//      ... that's the magic of Redux Thunk !!!)
export const signup = (formProps, callback) => async dispatch => {
    // Hit the signup server endpoint and wait for response
    try {
        const response = await axios.post(
            'https://advanced-react-and-redux-gjanes.c9users.io:8081/signup',
            formProps
        );
        
        const { token } = response.data;
        
        dispatch({
            type: AUTH_USER,
            payload: token
        });
        
        // Store the token in local storage
        localStorage.setItem('token', token);
        
        callback();
    } catch (e) {
        console.log('Signup error : ' + e);
        dispatch({
            type: AUTH_ERROR,
            payload: 'Email in use'
        });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    // Hit the signup server endpoint and wait for response
    try {
        const response = await axios.post('https://advanced-react-and-redux-gjanes.c9users.io:8081/signin', formProps);
        const { token } = response.data;
        
        dispatch({
            type: AUTH_USER,
            payload: token
        });
        
        // Store the token in local storage
        localStorage.setItem('token', token );
        
        callback();
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Invalid login credentials'
        });
    }
};

export const signout = () => {
    
    localStorage.removeItem('token');
    
    return {
        type: AUTH_USER,
        payload: ''
    };
};
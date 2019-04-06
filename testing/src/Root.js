import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import reduxPromise from 'redux-promise';

// Import our own version of the redux-promise middleware
import asyncAction from 'middlewares/async';
import stateValidator from 'middlewares/stateValidator';

import reducers from 'reducers';

// Refactored into separate component to allow reuse
// of Provider between the application and tests.
// Initial store state is optional parameter and has empty default
export default ({ children, initialState = {} }) => {
    const store = createStore(
        reducers, 
        initialState, 
        // Using redux-promise middleware allows us to specify a promise
        // as the payload of an action ... redux-promise handles the resolving
        // of the promise before dispatching to the reducers
        // applyMiddleware(reduxPromise)
        applyMiddleware(asyncAction, stateValidator)
    );
    
    return (
        <Provider store={ store }>
            { children }
        </Provider>
    );
};
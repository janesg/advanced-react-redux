/* global localStorage */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import Feature from './components/Feature';

const store = createStore(
    reducers, 
    {
        auth: { 
            authenticated: localStorage.getItem('token'),
            errorMsg: ''
        }  // Initial state
    },     
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={ Welcome } />
                {/* There is an issue with reduxForm wrapped components and routes 
                    reported here: https://github.com/erikras/redux-form/issues/4318 
                    - can't use the following:
                        <Route path="/signup" component={ SignUp } />
                    - throws:
                        Warning: Failed prop type: Invalid prop 'component'... 
                    - using suggested workaround as follows: */}
                <Route path="/signup" render={ () => <SignUp /> } />
                <Route path="/signin" render={ () => <SignIn /> } />
                <Route path="/signout" component={ SignOut } />
                <Route path="/feature" component={ Feature } />
            </App>
        </BrowserRouter>
    </Provider>, 
    document.querySelector('#root')
);

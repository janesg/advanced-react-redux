import tv4 from 'tv4';

import stateSchema from 'reducers/stateSchema';

export default ({ dispatch, getState }) => next => action => {
    // Pass the action on immediately
    next(action);
    
    // We only want to add processing for once the action has been 
    // dispatched through all the middlewares and reducers
    //  - we just add logic here...
    if (!tv4.validate(getState(), stateSchema)) {
        console.warn("Invalid state schema detected : " + tv4.error.message);
    }
};
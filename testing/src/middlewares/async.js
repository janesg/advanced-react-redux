// Template for middleware
// Function which returns a function which returns a function
// export default ({ dispatch }) => {
//     return (next) => {
//         return (action) => {
            
//         }
//     }
// }

// Refactored boilerplate template for middleware
// - equivalent to that above
// export default ({ dispatch }) => next => action => {
            
// };

export default ({ dispatch }) => next => action => {
    // Check to see if action has promise as payload
    // - if does, wait to resolve
    // - else send action onto next middleware
    
    // No direct way of checking for a promise, but presence
    // of a 'then' property on payload is assumed to be adequate check
    if (!action.payload || !action.payload.then) {
        return next(action);
    }
    
    // Wait for promise to resolve
    // - then create new action with the resolved response
    //   (...which has the data property on it)
    action.payload.then(response => {
        // Create new action with all original action's properties and
        // set the new payload to the response
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    });
};

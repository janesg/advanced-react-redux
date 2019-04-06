import { SAVE_COMMENT, FETCH_COMMENTS } from 'actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SAVE_COMMENT:
            return [...state, action.payload];
        case FETCH_COMMENTS:
            // If I want the Chrome debugger to break here...
            // debugger;
            
            // redux-promise middleware ensures that the payload promise
            // has already resolved by time reducer is called
            const comments = action.payload.data.map(comment => comment.name);
            // Add all fetched comments to the existing list of comments
            return [...state, ...comments];
        default:
            return state;
    }
}
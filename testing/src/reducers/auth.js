import { CHANGE_AUTH } from 'actions/types'

// State is a boolean flag indicating whether the user is authenticated or not
export default (state = false, action) => {
    switch(action.type) {
        case CHANGE_AUTH:
            return action.payload;
        default:
            return state;
    }
};
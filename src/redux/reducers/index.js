import { combineReducers } from 'redux'
import goals from './goals.js'


const appReducer = combineReducers({goals:goals});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};

export default appReducer;

import { combineReducers } from 'redux'
import goals from './goals.js'
import bot from './bot1AReducer.js'


const appReducer = combineReducers({goals:goals, bot:bot});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};

export default appReducer;

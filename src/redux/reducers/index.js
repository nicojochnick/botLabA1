import { combineReducers } from 'redux'
import steps from './steps.js'
import bot from './bot1AReducer.js'


const appReducer = combineReducers({steps:steps, bot:bot});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};

export default appReducer;

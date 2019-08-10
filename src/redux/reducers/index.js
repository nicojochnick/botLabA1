import { combineReducers } from 'redux'
import steps from './steps.js'
import bot from './bot1AReducer.js'
import tribes from './tribeReducer'
import boxes from './stepBoxReducer';


const appReducer = combineReducers({steps:steps, bot:bot, tribes: tribes, boxes: boxes});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};

export default appReducer;

import { ADD_STEP, SUBTRACT_TIME, TOGGLE_STEP,} from '../actions'
import update from 'immutability-helper';
import moment from "moment";

const initialState = {
    date: [ moment().format('dddd, MMMM Do')],
    byId: [],
    byHash: {}
};

const goalsSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};

const steps = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STEP':
            return { ...state,
                byId: [action.payload.step.id],
                byHash: {
                    ...state.byHash,
                    [action.payload.step.id]: {
                        name: action.payload.step.name,
                        data: action.payload.step.data,
                        root: action.payload.step.root,
                        tribeID: action.payload.step.tribeID,
                        boxID: action.payload.step.boxID,
                        userID: action.payload.step.userID,
                        deadline: action.payload.step.deadline,
                        open: action.payload.step.open,
                        done: action.payload.step.done,
                        id: action.payload.step.id,
                        steps: action.payload.step.steps,
                        date: action.payload.step.date,
                        info: action.payload.step.info,

                    }
                }
            };

        case 'ADD_CHILD_STEP':
        return update(state, {
            byHash: {
                [action.payload.parentID]: {
                    steps: {$push: action.payload.childID}
                }
            }
        });

        case 'CHANGE_STEP_NAME':
            return update(state, {
                byHash: {
                    [action.payload.id]: {
                        name: {$set: action.payload.text}}}
            });

        case 'CHANGE_STEP_INFO':
            return update(state, {
                byHash: {
                    [action.payload.id]: {
                        info: {$set: action.payload.text}}}
            });

        case 'TOGGLE_OPEN':
            return update(state, {
                byHash: {
                    [action.payload]: {
                        open: {$apply: function (x){return !x;}}}}
                });


        case 'TOGGLE_DONE':
            return update(state, {
            byHash: {
                [action.payload]: {
                    done: {$apply: function (x){return !x;}}}}
        });

        case 'ADD_DATE':
            return update(state, {
                byHash: {
                    [action.payload.currUser]: {
                        data: {$push: [0]
                        }
                    }
                }
            });
        case 'UPDATE_DATE':
            return {...state,
                byHash: {
                ...state.byHash,
                    [action.payload.currUser] : {
                    ...state.byHash[action.payload.currUser],
                        date: [action.payload.date]
                    }
                }
            };


        case 'TOGGLE_STEP':
            return state.map(goal =>
                (goal.id === action.id)
                    ? {...goal, completed: !goal.completed}
                    : goal
            );

        case 'DELETE_STEP':
            const newState = {
                ...state
            };
            const ID = action.payload.currUser;
            console.log(action.payload);
            delete newState.byHash[action.payload];
            return newState;


        case 'ADD_TIME':
           return update(state, {
                byHash: {
                    [action.payload.currUser]: {
                        data: {
                            [action.payload.length-1]:
                                {$set: action.payload.data}
                        }
                    }
                }
            });

        case 'SUBTRACT_TIME':
            return update(state, {
                byHash: {
                    [action.payload.currUser]: {
                        data: {
                            [action.payload.length-1]:
                                {$set: action.payload.data}
                        }
                    }
                }
            });


        default:
            return state;
    }
};

export default steps;

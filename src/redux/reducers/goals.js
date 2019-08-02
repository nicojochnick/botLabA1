import { ADD_GOAL, SUBTRACT_TIME, TOGGLE_GOAL,} from '../actions'
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

const goals = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_GOAL':
            return { ...state,
                byId: [action.payload.goal.id],
                byHash: {
                    ...state.byHash,
                    [action.payload.goal.id]: {
                        days: action.payload.goal.days,
                        view: action.payload.goal.view,
                        points: action.payload.goal.points,
                        data: action.payload.goal.data,
                        done: false,
                        id: action.payload.goal.id,
                        tracking: action.payload.goal.tracking,
                        name: action.payload.goal.name,
                        date: action.payload.goal.date,
                    }
                }
            };
        case 'ADD_DATE':
            return update(state, {
                byHash: {
                    [action.payload.index]: {
                        data: {$push: [0]
                        }
                    }
                }
            });
        case 'UPDATE_DATE':
            return {...state,
                byHash: {
                ...state.byHash,
                    [action.payload.index] : {
                    ...state.byHash[action.payload.index],
                        date: [action.payload.date]
                    }
                }
            };


        case 'TOGGLE_GOAL':
            return state.map(goal =>
                (goal.id === action.id)
                    ? {...goal, completed: !goal.completed}
                    : goal
            );

        case 'DELETE_GOAL':
            const newState = {
                ...state
            };
            const ID = action.payload.index;
            console.log(action.payload);
            delete newState.byHash[action.payload];
            return newState;

        case 'TOGGLE_CHECK':
            return {
                ...state,
                viewCheckbox: !viewCheckbox
            };

        case 'ADD_TIME':
            console.log(action.payload.data);
            //Action contains two vars => id of goal, and time to be added.
           return update(state, {
                byHash: {
                    [action.payload.index]: {
                        data: {
                            [action.payload.length-1]:
                                {$set: action.payload.data}
                        }
                    }
                }
            });

        case 'SUBTRACT_TIME':
            console.log(action.payload.data);
            //Action contains two vars => id of goal, and time to be added.
            return update(state, {
                byHash: {
                    [action.payload.index]: {
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

export default goals;

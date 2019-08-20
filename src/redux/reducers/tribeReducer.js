import update from 'immutability-helper';

const initialState = {
    byId: [],
    byHash: {},

};


const tribes = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TRIBE':
            return { ...state,
                byId: [action.payload.tribe.id],
                byHash: {
                    ...state.byHash,
                    [action.payload.tribe.id]: {
                        name: action.payload.tribe.name,
                        id: action.payload.tribe.id,
                        userID: action.payload.tribe.userID,
                        friendIDS: action.payload.tribe.friendIDS,
                        open: action.payload.tribe.open,
                        info: action.payload.tribe.info,
                        deadline: action.payload.tribe.deadline,
                    }
                }
            };


        case 'CHANGE_TRIBE_NAME':
            return update(state, {
                byHash: {
                    [action.payload.id]: {
                        name: {$set: action.payload.text}}}
            });

        case 'ADD_TRIBE_DEADLINE':
            return update(state, {
                byHash: {
                    [action.payload.index]: {
                        deadline: {$set: action.payload.deadline}
                    }
                }
            });

        case 'CHANGE_TRIBE_INFO':
            return update(state, {
                byHash: {
                    [action.payload.id]: {
                        info: {$set: action.payload.text}}}
            });

        case 'TOGGLE_TRIBE_OPEN':
            return update(state, {
                byHash: {
                    [action.payload]: {
                        open: {$apply: function (x){return !x;}}}}
            });

        case 'DELETE_TRIBE':
            const newState = {
                ...state
            };
            const ID = action.payload.index;
            console.log(action.payload);
            delete newState.byHash[action.payload];
            return newState;


        default:
            return state;
    }
};



export default tribes;

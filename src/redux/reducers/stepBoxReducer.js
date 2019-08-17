import update from 'immutability-helper';

const initialState = {
    byId: [],
    byHash: {},

};


const boxes = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BOX':
            return { ...state,
                byId: [action.payload.box.id],
                byHash: {
                    ...state.byHash,
                    [action.payload.box.id]: {
                        name: action.payload.box.name,
                        id: action.payload.box.id,
                        userID: action.payload.box.userID,
                        tribeID: action.payload.box.tribeID,
                        open: action.payload.box.open,
                        info: action.payload.box.info,
                    }
                }
            };


        case 'CHANGE_BOX_NAME':
            return update(state, {
                byHash: {
                    [action.payload.id]: {
                        name: {$set: action.payload.text}}}
            });

        case 'CHANGE_BOX_INFO':
            return update(state, {
                byHash: {
                    [action.payload.id]: {
                        info: {$set: action.payload.text}}}
            });

        case 'TOGGLE_BOX_OPEN':
            return update(state, {
                byHash: {
                    [action.payload]: {
                        open: {$apply: function (x){return !x;}}}}
            });


        case 'DELETE_BOX':
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

export default boxes;

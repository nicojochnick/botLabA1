import update from 'immutability-helper';


const initialState = {
    count: 0,
    byId: [],
    byHash: {},
    name: "default"
};


const bot = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_RENDER':
            return update(state, {count: {$apply: function (x) {return x + 1;}}});

        case 'CHANGE_NAME':
            return update(state, {name: {$set: action.payload}});

        default:
            return state;
        }

};

export default bot


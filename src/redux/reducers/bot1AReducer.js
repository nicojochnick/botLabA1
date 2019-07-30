import update from 'immutability-helper';


const initialState = {
    count: 0,
    byId: [],
    byHash: {}
};


const bot = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_RENDER':
            return update(state, {count: {$apply: function (x) {return x + 1;}}});

        default:
            return state;
    }

};

export default bot;


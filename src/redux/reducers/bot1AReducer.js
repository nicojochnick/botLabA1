import update from 'immutability-helper';


const initialState = {
    count: 0,
    byId: [],
    userID:' ',
    byHash: {},
    name: "Add a Name",
    profileImage: "",
};


const bot = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_RENDER':
            return update(state, {count: {$apply: function (x) {return x + 1;}}});

        case 'CHANGE_NAME':
            return update(state, {name: {$set: action.payload}});

        case 'ADD_PROFILE_IMAGE':
            return update(state, {profileImage: {$set: action.payload}});

        default:
            return state;
        }

};

export default bot


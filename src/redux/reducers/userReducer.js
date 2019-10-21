import update from 'immutability-helper';


const initialState = {
    user: null,
    currTribe: null

};


const user = (state = initialState, action) => {
    switch(action.type) {

        case 'CURRENT_TRIBE':
            return update(state, {currTribe: {$set: action.payload}});

        case 'UPDATE_USER_INFO':
            return update(state, {user: {$set: action.payload}});

        case 'UPDATE_USER_ID':
            return update(state, {userID: {$set: action.payload}});

        case 'UPDATE_USER_NAME':
            return update(state, {userPhoto: {$set: action.payload}});

        case 'UPDATE_USER_PHOTO':
            return update(state, {userPhoto: {$set: action.payload}});

        default:
            return state;
    }

};

export default user

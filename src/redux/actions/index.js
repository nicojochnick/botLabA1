
/*Add Action Types */

export const ADD_GOAL = 'ADD GOAL';
export const DELETE_GOAL = 'DELETE GOAL';
export const TOGGLE_GOAL = 'TOGGLE GOAL';
export const CHECK_DATE = 'CHECK_DATE';
export const ADD_DATE = 'ADD_DATE';
export const ADD_TIME = 'ADD_TIME';
export const SUBTRACT_TIME = 'SUBTRACT_TIME';
export const TOGGLE_CHECK = 'TOGGLE CHECK';
export const UPDATE_DATE = 'UPDATE_DATE';
export const STORE_RENDER = 'STORE_RENDER';
export const CHANGE_NAME = 'CHANGE_NAME';
export const ADD_PROFILE_IMAGE = 'ADD_PROFILE_IMAGE';


/* action creators */
export function addProfileImage(image) {
    return {type: ADD_PROFILE_IMAGE, payload: image}

}
export function addGoal(goal){
    return { type: 'ADD_GOAL', payload:{goal}}
}

export function checkDate(currdate) {
    return { type: 'CHECK_DATE', payload: currdate}
}

export function toggleGoal(id){
    return {type: 'TOGGLE_GOAL', id}
}

export function addTime(index, data, length){
    return {type: 'ADD_TIME', payload: {index, data, length}}
}

export function subtractTime(index, data, length){
    return {type: 'SUBTRACT_TIME', payload: {index, data, length}}
}

export function addDate(index){
    return {type: 'ADD_DATE', payload: {index}}
}

export function updateDate(index,date){
    return {type: 'UPDATE_DATE', payload: {index, date}}
}

export function deleteGoal(index){
    return {type: 'DELETE_GOAL', payload: index}
}

export function toggleCheck(index){
    return {type: TOGGLE_CHECK, payload: index}
}


export function storeRenderCount(count){
    return {type: STORE_RENDER, payload: count}
}

export function changeName(name){
    return {type: CHANGE_NAME, payload: name}
}


/*Add Action Types */

export const ADD_STEP = 'ADD STEP';
export const DELETE_STEP = 'DELETE STEP';
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
export const TOGGLE_OPEN = 'TOGGLE_OPEN';
export const CHANGE_STEP_NAME = 'CHANGE_STEP_NAME';


/* action creators */
export function addProfileImage(image) {
    return {type: ADD_PROFILE_IMAGE, payload: image}

}
export function addStep(step){
    return { type: 'ADD_STEP', payload:{step}}
}

export function checkDate(currdate) {
    return { type: 'CHECK_DATE', payload: currdate}
}

export function toggleGoal(id){
    return {type: 'TOGGLE_GOAL', id}
}

export function changeStepName(id, text){
    return {type: "CHANGE_STEP_NAME", payload: {text, id}}
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

export function deleteStep(index){
    return {type: 'DELETE_STEP', payload: index}
}

export function toggleCheck(index){
    return {type: TOGGLE_CHECK, payload: index}
}


export function toggleOpen(index){
    return {type: 'TOGGLE_OPEN', payload: index }
}


export function storeRenderCount(count){
    return {type: STORE_RENDER, payload: count}
}

export function changeName(name){
    return {type: CHANGE_NAME, payload: name}
}



import firebase from '@react-native-firebase/app';


/*Add Action Types */

export const ADD_STEP = 'ADD STEP';
export const ADD_CHILD_STEP = 'ADD CHILD STEP';
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
export const CHANGE_STEP_INFO = 'CHANGE_STEP_INFO';
export const TOGGLE_DONE = 'TOGGLE_DONE';


export const ADD_TRIBE = 'ADD_TRIBE';
export const DELETE_TRIBE = 'DELETE_TRIBE';
export const TOGGLE_TRIBE_OPEN = 'TOGGLE_TRIBE_OPEN';
export const CHANGE_TRIBE_NAME = 'CHANGE_TRIBE_NAME';
export const ADD_TRIBE_DEADLINE = 'ADD_TRIBE_DEADLINE';


export const ADD_BOX = 'ADD_BOX';
export const DELETE_BOX = 'DELETE_BOX';



export const  UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const CURRENT_TRIBE = 'CURRENT_TRIBE';


/* action creators */


//Groups

export function changeGroupName(text,id){
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').where('id', '==', id)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update( {"name": text})
                });
            });
    };

}


//USER
export function updateUser(user){
    return { type: 'UPDATE_USER_INFO', payload:{user}}
}

export function updateCurrentTribe(tribeGroupID){
    return { type: 'CURRENT_TRIBE', payload:{tribeGroupID}}
}




//Messaging
export const sendMessage = (userID, messages) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('users').where('userID', '==', userID)
            .get().then(function (querySnapshot) {
                console.log(querySnapshot)
            console.log(userID)
            querySnapshot.forEach(function (doc) {
                console.log(doc.data());
                console.log(userID)
                doc.ref.update({messages: messages})
            });
        });
    };
};




//Comments
export const postCommentDB = (comment) => {
    return (dispatch, getState) => {
        console.log("export External")
        firebase.firestore().collection('comments').add(comment)
    }
};

export const deleteCommentDB = (commentID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('comments').where('commentID', '==', commentID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    };
};



//Steps
export function addProfileImage(image) {
    return {type: ADD_PROFILE_IMAGE, payload: image}
}

export function addStep(step){
    return { type: 'ADD_STEP', payload:{step}}
}

export const addStepDB = (boxID, step) => {
    return (dispatch, getState) => {
        console.log(step);
        firebase.firestore().collection('stepBox').where('id', '==', boxID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({steps: firebase.firestore.FieldValue.arrayUnion(step)})
            });
            dispatch({type: 'ADD_STEP', payload: {step}})
        });
    };
};


export function deleteStep(index){
    return {type: 'DELETE_STEP', payload: index}
}

export const deleteStepDB = (boxID, StepID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('stepBox').where('id', '==', boxID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({steps: doc.data().steps.filter(step => step.id !== StepID)})
            });
            dispatch({type: 'DELETE_STEP', payload: {StepID}})
        });
    };
};

export function addChildStep(parentID, childID) {
    return { type: 'ADD_CHILD_STEP', payload: {parentID, childID}}
}

export function checkDate(currdate) {
    return { type: 'CHECK_DATE', payload: currdate}
}

export function toggleGoal(id){
    return {type: 'TOGGLE_GOAL', id}
}

export function changeStepName(text, id){
    return {type: "CHANGE_STEP_NAME", payload: {text, id}}
}


export const changeStepNameDB = (text, index, boxID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('stepBox').where('id', '==', boxID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({ steps : doc.data().steps.map(step => {
                        if (step.id === index) {
                            step.name = text;
                            return step
                        } else {
                            return step
                        }
                    })})
            });
            dispatch({type: 'CHANGE_STEP_NAME', payload: {text, index}})
        });
    };

};

export function changeStepInfo(text, id){
    return {type: "CHANGE_STEP_INFO", payload: {text, id}}
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


export function toggleCheck(index){
    return {type: TOGGLE_CHECK, payload: index}
}


export function toggleOpen(index){
    return {type: 'TOGGLE_OPEN', payload: index }
}

export function toggleDone(id){
    return {type: 'TOGGLE_DONE', payload: id}
}



export const toggleDoneDB = (index, boxID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('stepBox').where('id', '==', boxID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({ steps : doc.data().steps.map(step => {
                        if (step.id === index) {
                            step.done = !step.done;
                            return step
                        } else {
                            return step
                        }
                    })})
            });
            dispatch({type: 'TOGGLE_DONE', payload: {index}})
        });
    };

};



export function storeRenderCount(count){
    return {type: STORE_RENDER, payload: count}
}

export function changeName(name){
    return {type: CHANGE_NAME, payload: name}
}

///BOX ACTION CREATORS //
export function addBox(box){
    return { type: 'ADD_BOX', payload:{box}}
}

export const addBoxDB = (box) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('stepBox').add(box);
        dispatch({type: 'ADD_BOX', payload:{box}})
    }
};

export function deleteBox(index){
    return {type: 'DELETE_BOX', payload: index}
}

export const deleteBoxDB = (id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('stepBox').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
        dispatch({type: 'DELETE_BOX', payload: id});
    };
};

export const changeBoxNameDB = (text,id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('stepBox').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"name": text})
            });
        });
    };

};

///TRIBE ACTION CREATORS //


export function shareTribeDB(tribeID, timeStamp){
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', tribeID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"posted": timeStamp, "isPosted": true, "isPublic": true})
            });
        });
    };
};

export function unshareTribeDB(tribeID, timeStamp){
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', tribeID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"isPosted": false})
            });
        });
    };
};

export function makePrivate(tribeID){
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', tribeID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"isPosted": false, "isPublic": false})
            });
        });
    };
};


export function addTribe(tribe){
    return { type: 'ADD_TRIBE', payload:{tribe}}
}

export const addTribeDB = (tribe) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').add(tribe);
        dispatch({type: 'ADD_TRIBE', payload:{tribe}})
    }
};


export function changeTribeName(text, id){
    return {type: "CHANGE_TRIBE_NAME", payload: {text, id}}
}

export const changeTribeNameDB = (text,id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"name": text})
            });
            dispatch({type: 'CHANGE_TRIBE_NAME', payload: {text,id}});
        });
    };

};

export const updateHeader = (index,data) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', index)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"header": data})
            });
        });
    };

};



export const deleteTribeDB = (id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();

            });
        });
        dispatch({type: 'DELETE_TRIBE', payload: id});
    };
};


export const changeMetricNameDB = (text,id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"metricName": text})
            });
        });
    };

};

export const changeEndGoal = (text,id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"endGoal": text})
            });
        });
    };

};


export function deleteTribe(index){
    return {type: 'DELETE_TRIBE', payload: index}
}


export function addTribeDeadline(index, deadline){
    return {type: "ADD_TRIBE_DEADLINE", payload: {index, deadline}}

}

export const addTribeDeadlineDB = (index,deadline) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', index)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"deadline":deadline})
            });
            dispatch({type: 'ADD_TRIBE_DEADLINE', payload: {index,deadline}});
        });
    };
};

export const addFriendIDDB = (friend, myID, myfbID, friendfbID) => {
    return (dispatch, getState) => {
        console.log(friend);
        firebase.firestore().collection('users').where('userID', '==', myID)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({friendIDs: firebase.firestore.FieldValue.arrayUnion(friend)})
            })

        });

        firebase.firestore().collection('users').where('userID', '==',friend)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({friendIDs: firebase.firestore.FieldValue.arrayUnion(myID)})
            })

        });

        firebase.firestore().collection('tribes').where('userID', '==', myfbID)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({friendIDs: firebase.firestore.FieldValue.arrayUnion(friend)})
            })
        });


        firebase.firestore().collection('tribes').where('userID', '==', friendfbID)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({friendIDs: firebase.firestore.FieldValue.arrayUnion(myID)})
            })
        });
    };
};





export const removeFriendIDDB = (friendID, myID, fbID, friendFBID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('users').where('userID', '==', myID)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({friendIDs: doc.data().friendIDs.filter(friend => friend !== friendID)})
            })
        });

        return (dispatch, getState) => {
            firebase.firestore().collection('users').where('userID', '==', friendID)
                .get().then(function (querySnapshot) {
                console.log(querySnapshot);
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({friendIDs: doc.data().friendIDs.filter(friend => friend !== myID)})
                })
            });

            firebase.firestore().collection('tribes').where('userID', '==', fbID)
                .get().then(function (querySnapshot) {
                console.log(querySnapshot);
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({friendIDs: doc.data().friendIDs.filter(friend => friend !== friendID)})
                })
            });

            firebase.firestore().collection('tribes').where('userID', '==', friendFBID)
                .get().then(function (querySnapshot) {
                console.log(querySnapshot);
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({friendIDs: doc.data().friendIDs.filter(friend => friend !== myID)})
                })
            });


        };
    };
}
// export const addFriendDB = (friendID, myID) => {
//     return (dispatch, getState) => {
//         console.log(friendID)
//         firebase.firestore().collection('users').where('userID', '==', myID)
//             .get().then(function (querySnapshot) {
//             console.log(querySnapshot);
//             querySnapshot.forEach(function (doc) {
//                 doc.ref.update({friendIDs: firebase.firestore.FieldValue.arrayUnion(friendID)})
//             })
//         });
//     };
// };


export const addDataToTribeDB = (index, data, date, insertCol) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('tribes').where('id', '==', index)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                if (insertCol) {
                    let element = {date: date, data: 0};
                    doc.ref.update({continuousData: firebase.firestore.FieldValue.arrayUnion(element)})
                }
                else {
                    doc.ref.update({
                        continuousData:
                            doc.data().continuousData.map(item => {
                                if (item.date === date) {
                                    item.data = data;
                                    return item
                                } else {
                                    return item
                                }
                            })
                    })
                }
            });
        });
    }
};




export function toggleTribeOpen(index){
    return {type: 'TOGGLE_TRIBE_OPEN', payload: index }
}

///Notifications
export const sendNotification = (notification) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('notifications').add(notification);
    }
};

export const acceptNotificationRequest= (notID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('notifications').where('timeStamp', '==', notID)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({"accepted": true})
            });
        })
    }
};


//TribeGroup
export const addTribeGroup = (group) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').add(group);
    }
};


export const addTribeMember= (memberID, groupID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').where('members', '==', groupID)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({members: firebase.firestore.FieldValue.arrayUnion(memberID)})
            })
        });
    }
};



export const removeTribeMember= (memberID, groupID) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').where('members', '==', groupID)
            .get().then(function (querySnapshot) {
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                doc.ref.update({members: doc.data().friendIDs.filter(mem=> mem !== memberID)})
            })
        });
    }
};


export const deleteTribeGroup = (id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    };
};

export const updateTribeGroupName = (text,id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"name": text})
            });
        });
    };

};


export const updateTribeGroupDescription = (text,id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('groups').where('id', '==', id)
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update( {"description": text})
            });
        });
    };

};






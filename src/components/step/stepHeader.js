import React, {Component} from 'react';
import {View, Text} from 'react-native'
import PropTypes from 'prop-types';


//turns lists of keys to arrays
const goalsSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};


function checkForID(step, ids) {
    for (i = 0; i < ids.length; i++) {
        if (ids[i] === step.id) {
            return true
        }
    }
    return false;
}

const childrenSelector = (steps, ids) => steps.filter(step => checkForID(step, ids));

//*** Take in an array of arrays (all the children),
// and an index,
// and uses depth first recursion to find the first child with done = false
// and returns it//

function depthFirstSearch(children, index, allSteps){
    if ( children[index] === undefined || children.length < 1) {
        console.log("all Done!");
        return {name: ["Done"]}
    } else if (children[index].done === false && children[index].steps.length < 1) {
        return children[index];
    } else if (!children[index].steps.length < 1) {
        let ids = children[index].steps;
        let childArray = childrenSelector(allSteps, ids);
        return depthFirstSearch(childArray, 0, allSteps)

    } else {
        let nextID = index + 1;
        return depthFirstSearch(children, nextID, allSteps)
    }
}


function DFS(children, index, allSteps) {
    let currentChild = children[index];

    if (currentChild.done === true) {
        let onePlus = index + 1 ;
        DFS(children, onePlus, allSteps)
    } else if (currentChild.done === false && currentChild.steps.length < 1) {
        return children[index];
    }
}


// if (children[i].done === false && children[i].steps === undefined) {
//     return children[i]
// } else {
//     let ids = children[i].steps;
//     let childArray = childrenSelector(allSteps, ids);
//     DFS(childArray, allSteps)
// }
// }


export default class StepHeader extends Component {
    render() {
        // console.log(this.props.storeSteps);
        // console.log(this.props.steps);
        // let childrenArray = childrenSelector(this.props.storeSteps, this.props.steps);
        // console.log(childrenArray);
        // let child = DFS(childrenArray, this.props.storeSteps);
        // console.log(child);
        return (
            <View>
                {(true)
                    ? <Text> NI </Text>
                    : <Text> No children </Text>
                }
            </View>
        );
    }
}

StepHeader.propTypes = {
};


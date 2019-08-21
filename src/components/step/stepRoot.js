import {FlatList} from "react-native";
import {styles} from "../theme";
import Step from './step';
import React from 'react';
import {connect} from "react-redux";
import {
    addDate,
    addTime,
    changeStepInfo,
    changeStepName,
    deleteStep,
    subtractTime,
    addStep,
    toggleOpen,
    updateDate, addChildStep, toggleDone, addStepDB,
} from '../../redux/actions';
import moment from "moment";
import * as firebase from "react-native-firebase";

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



export class StepRoot extends React.Component {
    constructor(props) {
        super(props);
        this.changeStepName = this.changeStepName.bind(this);
        this.changeStepInfo = this.changeStepInfo.bind(this);
        this.handleDeleteStep = this.handleDeleteStep.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.checkCheck = this.checkCheck.bind(this);
        this.state = {};
    }

    changeStepName(text, id) {
        this.props.dispatch(changeStepName(text, id));
    }


    changeStepNameDB(text,id){

    }

    handleDeleteStep(id){
        this.props.dispatch(deleteStep(id))
    }

    handleDeleteStepDB(id){

    }

    handleCheck(id, childrenID, allSteps) {
        this.props.dispatch(toggleDone(id));
    }

    handleCheckDB(id){
    }

    changeStepInfo(text, id) {
        console.log(text);
        this.props.dispatch(changeStepInfo(text, id));
    }
    changeStepInfoDB(text,info) {

    }

    handleSwitch(id) {
        //change switch binary
        this.props.dispatch(toggleOpen(id))
    }
    handleSwitchDB(id){

    };

    checkCheck(id, childrenID, allSteps) {
        if (childrenID === undefined || childrenID.length < 1) {
            return false
        } else {
            const children = childrenSelector(childrenID, allSteps);
            for (i = 0; i < children.length - 1; i++) {
                if (children[i].done === false) {
                    return false;
                }
            }
            //this needs to be the parentID!
            this.props.dispatch(toggleDone(id))

        }
    }

    checkCheckDB(id){

    }



    render() {
        // console.log(this.props.storeSteps);
        // const filteredSteps = this.props.storeSteps.filter((item) => item.tribeID === this.props.tribeID);
        // console.log(filteredSteps);
        return (
            < FlatList
                style = {styles.bottomContainer}
                data = {this.props.steps}
                listKey={(item, index) => 'D' + index.toString()}
                renderItem={({item}) => (
                    <Step
                        changeStepName = {this.changeStepName}
                        changeStepInfo = {this.changeStepInfo}
                        handleSwitch = {this.handleSwitch}
                        handleAddStep = {this.props.handleAddStep}
                        handleDeleteStep = {this.handleDeleteStep}
                        handleCheck = {this.handleCheck}
                        checkCheck = {this.checkCheck}

                        editing = {this.props.editing}

                        name = {item.name}
                        info = {item.info}
                        id = {item.id}
                        data = {item.data}
                        root = {item.root}
                        open = {item.open}
                        steps = {item.steps}
                        date = {item.date}
                        done = {item.done}
                        storeSteps = {this.props.storeSteps}
                    />
                )}
            />

        );

    }

}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state /*, ownProps*/) => ({
    storeSteps: goalsSelector(state.steps.byHash)});

export default connect(mapStateToProps, mapDispatchToProps)(StepRoot);















// checkDate() {
//     const curDate = moment().format('dddd, MMMM Do');
//     if (this.props.date[0] !== curDate) {
//         this.props.dispatch(updateDate(this.props.id, curDate));
//         this.props.dispatch(addDate(this.props.id))
//     }
// }
//
// testFunction() {
//     const curDate = moment().format('dddd, MMMM Do');
//     this.props.dispatch(updateDate(this.props.id, curDate));
//     this.props.dispatch(addDate(this.props.id))
// }
//
// addTime() {
//     //NOTE: You have to dispatch this action with TIME and ID.]
//     const length = this.props.data.length;
//     const data = this.props.data.slice(-1)[0] + 15;
//
//     this.props.dispatch(addTime(this.props.id, data, length))
// }
//
// subtractTime() {
//     const length = this.props.data.length;
//     const data = this.props.data.slice(-1)[0] - 15;
//     this.props.dispatch(subtractTime(this.props.id, data,length))
// }

// checkCheck(id, childrenID, allSteps) {
//         if (childrenID === undefined || childrenID.length < 1) {
//             return false
//         } else {
//         const children = childrenSelector(childrenID, allSteps);
//         for (i = 0; i < children.length - 1; i++) {
//             if (children[i].done === false) {
//                 return false;
//             }
//         }
//         //this needs to be the parentID!
//         this.props.dispatch(toggleDone(id))
//
//     }
// }

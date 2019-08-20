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
    updateDate, addChildStep, toggleDone,
} from '../../redux/actions';
import moment from "moment";

///*** This should be like a displayer of steps component that takes the specific filter as a prop ***.


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


        this.state = {};

    }

    checkDate() {
        const curDate = moment().format('dddd, MMMM Do');
        if (this.props.date[0] !== curDate) {
            this.props.dispatch(updateDate(this.props.id, curDate));
            this.props.dispatch(addDate(this.props.id))
        }
    }

    testFunction() {
        const curDate = moment().format('dddd, MMMM Do');
        this.props.dispatch(updateDate(this.props.id, curDate));
        this.props.dispatch(addDate(this.props.id))
    }

    addTime() {
        //NOTE: You have to dispatch this action with TIME and ID.]
        const length = this.props.data.length;
        const data = this.props.data.slice(-1)[0] + 15;

        this.props.dispatch(addTime(this.props.id, data, length))
    }

    subtractTime() {
        const length = this.props.data.length;
        const data = this.props.data.slice(-1)[0] - 15;
        this.props.dispatch(subtractTime(this.props.id, data,length))
    }


    handleAddStep(parentID) {
        const genericStep = {
            name: "add a title",
            data: [0],
            done: false,
            date: moment().format('dddd, MMMM Do'),
            id: moment().format(),
            open: false,
            root: false,
            steps: [],
            info: "add a description"
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addStep(genericStep));
        this.props.dispatch(addChildStep(parentID, [genericStep.id]))
    }

    handleAddStepDB(parentID){
        const genericStep = {
            name: "add a title",
            data: [0],
            done: false,
            date: moment().format('dddd, MMMM Do'),
            id: moment().format(),
            open: false,
            root: false,
            steps: [],
            info: "add a description"
        };

    }

    handleCheck(id, childrenID, allSteps) {
        this.props.dispatch(toggleDone(id));
    }

    handleCheckDB(id){

    }

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


    render() {
        console.log(this.props.storeSteps);
        const filteredSteps = this.props.storeSteps.filter((item) => item.tribeID === this.props.tribeID);
        console.log(filteredSteps);

        return (
            < FlatList
                style = {styles.bottomContainer}
                data = {filteredSteps}
                listKey={(item, index) => 'D' + index.toString()}
                renderItem={({item}) => (
                    <Step

                        changeStepName = {this.props.changeStepName}
                        changeStepInfo = {this.props.changeStepInfo}
                        handleSwitch = {this.props.handleSwitch}
                        handleAddStep = {this.props.handleAddStep}
                        handleDeleteStep = {this.props.handleDeleteStep}
                        handleCheck = {this.props.handleCheck}
                        checkCheck = {this.props.checkCheck}

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
const mapStateToProps = (state /*, ownProps*/) => ({
    storeSteps: goalsSelector(state.steps.byHash)});

export default connect(mapStateToProps)(StepRoot);


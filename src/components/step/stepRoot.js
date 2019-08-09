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
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleAddStep = this.handleAddStep.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.checkCheck = this.checkCheck.bind(this);


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

    handleDelete(id) {
        this.props.dispatch(deleteStep(id))
    }

    printOut(days) {
        if (days) {
            return days.toString;
        }
        return " no days"
    }

    handleSwitch(id) {
        //change switch binary
        this.props.dispatch(toggleOpen(id))
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
        this.props.dispatch(subtractTime(this.props.id, data, length))
    }

    changeStepName(text, id) {
        this.props.dispatch(changeStepName(text, id));
    }

    changeStepInfo(text, id) {
        console.log(text);
        this.props.dispatch(changeStepInfo(text, id));
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

    handleCheck(id, childrenID, allSteps) {
        this.props.dispatch(toggleDone(id));
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
        const roots = this.props.storeSteps.filter(function(item) {
            return item.root === true;
        });
        console.log(this.props.steps);

        return (
            < FlatList style = {styles.bottomContainer}
                data = {roots}
                renderItem={({item}) => (
                    <Step
                        changeStepName = {this.changeStepName}
                        changeStepInfo = {this.changeStepInfo}
                        handleSwitch = {this.handleSwitch}
                        handleAddStep = {this.handleAddStep}
                        handleDelete = {this.handleDelete}
                        handleCheck = {this.handleCheck}
                        checkCheck = {this.checkCheck}
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


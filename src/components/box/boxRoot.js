import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList, View} from 'react-native';
import {styles} from '../theme';
import TribeComponent from '../tribe/tribe';
import Box from './box';
import moment from '../step/stepRoot';
import {
    addBox,
    addChildStep,
    addStep,
    changeStepInfo,
    changeStepName,
    deleteStep,
    toggleDone, toggleOpen,
} from '../../redux/actions';


const boxesSelector = (Obj) => {
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



class BoxRoot extends Component {

    constructor(props) {
        super(props);
        this.handleAddStep = this.handleAddStep.bind(this);
        this.handleDeleteStep = this.handleDeleteStep.bind(this);
        this.changeStepName = this.changeStepName.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.checkCheck = this.checkCheck.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.changeStepInfo = this.changeStepInfo.bind(this);

        this.state = {};

    }

    changeStepName(text, id) {
        this.props.dispatch(changeStepName(text, id));
    }

    changeStepInfo(text, id) {
        console.log(text);
        this.props.dispatch(changeStepInfo(text, id));
    }


    handleAddStep(boxID) {
        const genericStep = {
            name: "add a title",
            data: [0],
            done: false,
            date: moment().format('dddd, MMMM Do'),
            id: moment().format(),
            open: false,
            root: false,
            steps: [],
            info: "add a description",
            boxID: boxID,
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addStep(genericStep));
    }

    handleDeleteStep(id){
        this.props.dispatch(deleteStep(id))
    }

    handleSwitch(id) {
        //change switch binary
        this.props.dispatch(toggleOpen(id))
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
        console.log(this.props.storeBoxes);
        const filteredBoxes = this.props.storeBoxes.filter((item) => item.tribeID === this.props.tribeID);
        console.log(filteredBoxes);
        return (
            <View>
                < FlatList style = {styles.bottomContainer}
                           data = {filteredBoxes}
                           renderItem={({item}) => (
                               <Box
                                   name = {item.name}
                                   info = {item.info}
                                   id = {item.id}
                                   open = {item.open}
                                   tribeID = {this.props.tribeID}

                                   changeBoxName = {this.props.changeBoxName}
                                   handleAddBox = {this.props.handleAddBox}
                                   handleDeleteBox = {this.props.handleDeleteBox}


                                   handleAddStep = {this.handleAddStep}
                                   handleDeleteStep = {this.handleDeleteStep}
                                   changeStepName = {this.changeStepName}
                                   changeStepInfo = {this.changeStepInfo}
                                   handleCheck = {this.handleCheck}
                                   checkCheck = {this.checkCheck}
                                   handleSwitch = {this.handleSwitch}
                               />
                           )}
                />

            </View>
        );
    }
}

BoxRoot.propTypes = {};


const mapStateToProps = (state /*, ownProps*/) => ({
    storeBoxes: boxesSelector(state.boxes.byHash)});

export default connect(mapStateToProps)(BoxRoot);

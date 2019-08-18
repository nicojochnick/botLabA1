import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {styles} from '../theme';
import TribeComponent from './tribe';
import {connect} from 'react-redux';
import moment from 'moment';
import {addBox, deleteBox, changeTribeName, deleteTribe, addTribeDeadline} from '../../redux/actions';

const tribesSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};


class TribeRoot extends Component {
    constructor(props) {
        super(props);
        this.changeBoxName = this.changeBoxName.bind(this);
        this.handleAddBox = this.handleAddBox.bind(this);
        this.handleDeleteBox = this.handleDeleteBox.bind(this);


        this.addTribeDeadline = this.addTribeDeadline.bind(this);


        this.changeTribeName = this.changeTribeName.bind(this);
        this.handleDeleteTribe = this.handleDeleteTribe.bind(this);
        this.computeProgress = this.computeProgress.bind(this);
        this.state = {};

    }

    handleAddBox(tribeID) {
        const genericBox = {
            name: "add a title",
            id: moment().format(),
            tribeID: tribeID,
            open: false,
            info: "add a description"
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addBox(genericBox));
    }

    handleDeleteBox(boxID){
        this.props.dispatch(deleteBox(boxID))

    }

    changeBoxName(boxID){

    }

    changeTribeName(text,index){
        this.props.dispatch(changeTribeName(text,index))
    }

    handleDeleteTribe(tribeID) {
        this.props.dispatch(deleteTribe(tribeID))
    }

    handleDeleteTribeDB(tribeID) {
        this.props.dispatch(deleteTribe(tribe))

    }

//input relevant steps
    computeProgress(tribeID){
        console.log(tribeID);
        console.log(this.props.storeSteps);
        let steps = this.props.storeSteps.filter(function(step) {return step.tribeID === tribeID});
        console.log(steps);
        let total = steps.length;
        let checkSteps = steps.filter( function(step) {return step.done === true});
        console.log(checkSteps);
        let checked = checkSteps.length;
        let progress = checked/total;
        if (progress > 0) {
            return progress
        } else {
            return 0;
        }
    }



    addTribeDeadline(index,date){
        this.props.dispatch(addTribeDeadline(index, date))
    }


    render() {
        console.log(this.props.state);
        console.log(this.props.storeTribes);

        return (
            <View>
                < FlatList style = {styles.bottomContainer}
                           data = {this.props.storeTribes}
                           renderItem={({item}) => (
                               <TribeComponent
                                   name = {item.name}
                                   info = {item.info}
                                   id = {item.id}
                                   open = {item.open}
                                   deadline = {item.deadline}
                                   handleDeleteBox = {this.handleDeleteBox}
                                   handleAddBox = {this.handleAddBox}
                                   changeBoxName = {this.changeBoxName}
                                   tribeID = {item.id}
                                   computeProgress = {this.computeProgress}
                                   addTribeDeadline = {this.addTribeDeadline}

                                   handleDeleteTribe = {this.handleDeleteTribe}
                                   changeTribeName = {this.changeTribeName}
                                />
                           )}
                />

            </View>
        );
    }
}

TribeRoot.propTypes = {};

const mapStateToProps = (state /*, ownProps*/) => ({
    storeTribes: tribesSelector(state.tribes.byHash),
    storeSteps:  tribesSelector(state.steps.byHash),
    state: state

});

export default connect(mapStateToProps)(TribeRoot);



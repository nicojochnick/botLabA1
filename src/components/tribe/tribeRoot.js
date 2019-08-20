import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text} from 'react-native';
import {styles} from '../theme';
import TribeComponent from './tribe';
import {connect} from 'react-redux';
import moment from 'moment';
import * as firebase from 'react-native-firebase';
import {
    addBox,
    deleteBox,
    changeTribeName,
    deleteTribe,
    addTribeDeadline,
    addTribeDB,
    deleteTribeDB,
} from '../../redux/actions';

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
        this.handleDeleteTribeDB = this.handleDeleteTribeDB.bind(this);
        this.computeProgress = this.computeProgress.bind(this);
        this.state = {
            //flat list accepts an array of object
            tribeData: []
        };
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
        this.props.handleDeleteTribeDB(tribeID);

    }
//input relevant steps
    computeProgress(tribeID){
        // console.log(tribeID);
        // console.log(this.props.storeSteps);
        let steps = this.props.storeSteps.filter(function(step) {return step.tribeID === tribeID});
        // console.log(steps);
        let total = steps.length;
        let checkSteps = steps.filter( function(step) {return step.done === true});
        // console.log(checkSteps);
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

    getMyTribes() {
        const db = firebase.firestore();
        // db.settings({ timestampsInSnapshots: true});
        db.collection('tribes').where("userID", '===',this.props.filter).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ tribeData: data })

        });
    }

    componentDidMount(): void {
      this.getMyTribes()

    }

    render() {

        // let filter = this.props.filter;
        // console.log(filter);
        // let tribes = firebase.firestore().collection('tribes');
        // console.log(tribes);
        // //let userTribes = tribes.filter(function(tribe){return tribes.id})
        // let userTribes = tribes.where("userID", '===',filter);
        // console.log(userTribes);
        // console.log(this.props.state);
        // console.log(this.props.storeTribes);
        console.log(this.state.tribeData);


        return (
            <View>
                <FlatList style = {styles.bottomContainer}
                           data = {this.state.tribeData}
                          listKey={(item, index) => 'D' + index.toString()}

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

                                   handleDeleteTribe = {this.handleDeleteTribeDB}
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteTribeDB: (tribe) => dispatch(deleteTribeDB(tribe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TribeRoot);



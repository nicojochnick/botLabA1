import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList, View} from 'react-native';
import {styles} from '../theme';
import TribeComponent from '../tribe/tribe';
import Box from './box';
import moment from 'moment';
import {
    addBox,
    addChildStep,
    addStep, addStepDB,
    changeStepInfo,
    changeStepName, deleteBox, deleteBoxDB,
    deleteStep,
    toggleDone, toggleOpen,
} from '../../redux/actions';
import Step from '../step/step';
import * as firebase from "react-native-firebase";


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
        this.handleAddStepDB = this.handleAddStepDB.bind(this);

        this.changeBoxName = this.changeBoxName.bind(this);
        this.handleDeleteBoxDB = this.handleDeleteBoxDB.bind(this);

        this.state = {
            boxData: []
        };

    }

    handleDeleteBox(boxID){
        this.props.dispatch(deleteBox(boxID))
    }

    handleDeleteBoxDB(boxID){
        this.props.handleDeleteBoxDB(boxID)
    }

    changeBoxName(boxID){
    }

    handleAddStepDB(boxID){
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
        this.props.handleAddStepDB(boxID, genericStep)
    }


    handleSwitch(id) {
        //change switch binary
        this.props.dispatch(toggleOpen(id))
    }


    getBoxes(){
        const db = firebase.firestore();
        // db.settings({ timestampsInSnapshots: true});
        db.collection('stepBox').where("tribeID", '==',this.props.tribeID).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ boxData: data })

        });
    }

    componentDidMount(): void {
        this.getBoxes();
    }


    render() {
        // console.log(this.props.storeBoxes);
        // const filteredBoxes = this.props.storeBoxes.filter((item) => item.tribeID === this.props.tribeID);
        // console.log(filteredBoxes);
        console.log(this.state.boxData);
        return (
            <View>
                < FlatList style = {styles.bottomContainer}
                           data = {this.state.boxData}
                           listKey={(item, index) => 'D' + index.toString()}
                           renderItem={({item}) => (
                               <Box
                                   name = {item.name}
                                   info = {item.info}
                                   id = {item.id}
                                   open = {item.open}
                                   tribeID = {this.props.tribeID}
                                   steps = {item.steps}

                                   handleAddStep = {this.handleAddStepDB}
                                   changeBoxName = {this.changeBoxName}
                                   handleAddBox = {this.props.handleAddBox}
                                   handleDeleteBox = {this.handleDeleteBoxDB}
                                   editing = {this.props.editing}
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddStepDB:(boxID, step) => dispatch(addStepDB(boxID, step)),
        handleDeleteBoxDB:(id) => dispatch(deleteBoxDB(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxRoot);


// handleAddStep(boxID) {
//     const genericStep = {
//         name: "add a title",
//         data: [0],
//         done: false,
//         date: moment().format('dddd, MMMM Do'),
//         id: moment().format(),
//         open: false,
//         root: false,
//         steps: [],
//         info: "add a description",
//         boxID: boxID,
//     };
//     //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
//     this.props.dispatch(addStep(genericStep));
// }

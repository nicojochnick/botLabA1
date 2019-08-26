import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, KeyboardAvoidingView,Text, ActivityIndicator} from 'react-native';
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
    deleteTribeDB, changeTribeNameDB, addTribeDeadlineDB, addBoxDB,
} from '../../redux/actions';

const tribesSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};


class TribeRoot extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = firebase.firestore().collection('tribes');

        this.addTribeDeadline = this.addTribeDeadline.bind(this);
        this.changeTribeName = this.changeTribeName.bind(this);
        this.computeProgress = this.computeProgress.bind(this);

        this.handleAddBoxDB = this.handleAddBoxDB.bind(this);
        this.handleDeleteTribeDB = this.handleDeleteTribeDB.bind(this);
        this.changeTribeNameDB = this.changeTribeNameDB.bind(this);
        this.addTribeDeadlineDB = this.addTribeDeadlineDB.bind(this);


        this.state = {
            //flat list accepts an array of object
            loading: true,
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

    handleAddBoxDB(tribeID){
        const genericBox = {
            name: "add a title",
            id: moment().format(),
            tribeID: tribeID,
            open: false,
            info: "add a description",
            steps : []
        };
        this.props.addBoxDB(genericBox)
    }

    changeTribeName(text,index){
        this.props.dispatch(changeTribeName(text,index))
    }
    changeTribeNameDB(text,index){
        this.props.changeTribeNameDB(text,index)
    }

    handleDeleteTribe(tribeID) {
        this.props.dispatch(deleteTribe(tribeID))
    }

    handleDeleteTribeDB(tribeID) {
        this.props.handleDeleteTribeDB(tribeID);

    }

    computeProgress(tribeID){

        if (tribeID){
            return 0
        }
        let data = [];// db.settings({ timestampsInSnapshots: true});

        let steps = data.filter(function(step) {return step.tribeID === tribeID});
        let total = steps.length;
        let checkSteps = steps.filter( function(step) {return step.done === true});
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
    addTribeDeadlineDB(index,deadline){
        this.props.addTribeDeadlineDB(index,deadline)
    }

    getMyTribes() {
        // db.settings({ timestampsInSnapshots: true});
        this.ref.where("userID", '==',this.props.filter).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ tribeData: data })

        });
    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        this.ref.where("userID", '==',this.props.filter).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ tribeData: data, loading: false })
        });


    };


    render() {


        console.log(this.state.tribeData);

        let loading = this.state.loading;


        return (
            <View>

                { !(loading)
                    ? <KeyboardAvoidingView>
                        <FlatList style = {styles.bottomContainer}
                        data = {this.state.tribeData}
                        listKey={(item, index) => 'D' + index.toString()}
                        renderItem={({item}) => (
                        <TribeComponent
                            name={item.name}
                            info={item.info}
                            id={item.id}
                            open={item.open}
                            deadline={item.deadline}
                            tribeID={item.id}
                            handleAddBox={this.handleAddBoxDB}
                            computeProgress={this.computeProgress}
                            addTribeDeadline={this.addTribeDeadlineDB}
                            handleDeleteTribe={this.handleDeleteTribeDB}
                            changeTribeName={this.changeTribeNameDB}
                        />)}
                        /></KeyboardAvoidingView>

                    : <ActivityIndicator style = {{margin: 30}} size="large" color="#0000ff" />
                }
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
        handleDeleteTribeDB: (tribe) => dispatch(deleteTribeDB(tribe)),
        changeTribeNameDB: (text,index)=> dispatch(changeTribeNameDB(text,index)),
        addTribeDeadlineDB: (index,deadline) => dispatch(addTribeDeadlineDB(index,deadline)),
        addBoxDB: (box) => dispatch(addBoxDB(box)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TribeRoot);



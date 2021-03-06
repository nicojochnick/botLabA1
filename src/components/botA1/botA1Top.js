import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {storeRenderCount} from "../../redux/actions";
import {StepsBot} from './stepsBot'
import {View} from 'react-native'
import {Input} from 'react-native-elements'
import BotA1Component from './botA1Component';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import BoxRoot from '../box/boxRoot';


class BotA1Top extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('tribes');
        this.user = firebase.auth().currentUser;

        this.saveData = this.saveData.bind(this);
        this.addNameToGoal = this.addNameToGoal.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.state = {

            data: {},
            steps: null,
            loading: true,
            tribeData: [],
            friendData: [],
            searchData: null,


        }
    };

    handleEnd({ steps, values }) {
        this.setState({currentStep: StepsBot.test});
        console.log(this.state.currentStep)
    }


    addNameToGoal(data){
        this.state.newGoal["name"] = data;
    }

    saveData (data) {
        this.setState( { data: data})
    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    //TODO Filter by timestamp ID, not FIREBASE ID
    onCollectionUpdate = (snapshot) => {
        console.log("TAKING UPDATE");
        console.log(this.props.friendTribeView);
        console.log(this.props.filter);

        this.ref.where("userID", '==', 0).get().then((snapshot) => {
            console.log("gettingData");
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data())
                return documentSnapshot.data()
            });
            this.setState({tribeData: data, loading: false})
        });
        console.log("here!");

        if (!this.props.coreUserID == null) {
            this.ref.where('friendIDS', 'array-contains', this.props.coreUserID).get().then((snapshot) => {
                console.log("here???");
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(snapshot);
                    return documentSnapshot.data()
                });
                data = this.state.tribeData + data;
                this.setState({tribeData: data, loading: false})
            });
        }

    };


    getStep(){
        let tribeData = this.state.tribeData;
        console.log(tribeData.length)
        return StepsBot.dayPlan
    }


    render() {
        console.log(this.state.currentStep);
        // this.findCurrentStep();
        return (
            <View style = {{height: 300, borderWidth: 3, borderRadius: 10, borderColor: "white", margin: 6, padding: 0}}>
            <BotA1Component steps = {this.getStep()} handleEnd = {this.handleEnd}/>
                <BoxRoot
                    toggleDoneDB={this.toggleDoneDB}
                    tribeID={null}
                    filter={0}
                    handleAddBox={this.handleAddBoxDB}
                    editing={0}
                    canEdit={true}
                    sendHeaderMessage={this.sendHeaderMessage}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.bot.count

});

BotA1Top.propTypes = {};
export default connect(mapStateToProps)(BotA1Top)


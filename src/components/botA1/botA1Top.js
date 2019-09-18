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
import * as firebase from "react-native-firebase";


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

        this.ref.where("userID", '==', this.props.filter).get().then((snapshot) => {
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
        return StepsBot.mainMenu
    }


    render() {
        console.log(this.state.currentStep);
        // this.findCurrentStep();
        return (
            <View style = {{height: 300}}>
            <BotA1Component steps = {this.getStep()} handleEnd = {this.handleEnd}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.bot.count

});

BotA1Top.propTypes = {};
export default connect(mapStateToProps)(BotA1Top)


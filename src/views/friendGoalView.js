import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Card, Button} from 'react-native-elements'
import BotA1Top from '../components/botA1/botA1Top';
import StepRoot from '../components/step/stepRoot';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Identity from '../components/user/identity';
import AddTribe from '../components/tribe/addTribe';
import TribeComponent from '../components/tribe/tribe';
import TribeRoot from '../components/tribe/tribeRoot'

import Users from '../components/test';
import NavSettings from '../components/navSettings';
import TribeGroup from '../components/groups/tribeGroup';
import firebase from 'react-native-firebase';



export default class FriendGoalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myID: null,
            fbID: null,
        }
    }


    componentDidMount(): void {
        let user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            // this.setState({fbID: user.uid})
            uid = user.uid;

        }
        console.log(uid);
        firebase.firestore().collection('users').where('fbID', '==', uid).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data().userID
            });
            this.setState({myID: data})
        });

    };



    render() {
        console.log(this.state.fbID);
        console.log(this.state.myID);
        return (
            <View>
                { (this.state.myID !== null)
                ? <TribeRoot friendTribeView = {true} filter = {this.state.myID}/>
                : null
                }
            </View>
        );
    }
}

FriendGoalView.propTypes = {};


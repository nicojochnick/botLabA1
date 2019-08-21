import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native'
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
import TribeGroup from '../components/tribe/tribeGroup';
import firebase from 'react-native-firebase';


let user = firebase.auth().currentUser;
let name, email, photoUrl, uid, emailVerified;

if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
}





class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editingProfile: false
        }

    }


    render() {
        console.log(uid);


        return (
            <ScrollView>
                <View style = {{flex: 1, flexDirection: "row",paddingTop: 30, paddingBottom: 10,alignItems: "center", backgroundColor: '#4978DD'}}>
                    <Identity size = {"large"} editable = {true}/>
                    <NavSettings/>
                    <AddTribe/>
                </View>
                <TribeRoot filter = {uid} />
            </ScrollView>
        );
    }
}

HomeScreen.propTypes = {};


export default HomeScreen;

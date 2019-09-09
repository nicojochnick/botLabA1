import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, KeyboardAvoidingView, ScrollView,RefreshControl, ActivityIndicator} from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BotA1Component from '../components/botA1/botA1Component';








class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editingProfile: false,
            uid: null,
            refresh: false,
            firstAdd: false,
        }

    }

    componentDidMount(): void {
        console.log(uid);
        let user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            this.setState({uid:user.uid})
        }
    }

    render() {
        console.log(this.state.uid);
        return (
            <KeyboardAwareScrollView>
            <ScrollView>
                <View style = {{flex: 1, flexDirection: "column", alignItems:"flex-end", paddingTop: 50, marginTop: 0, marginBottom: 0, backgroundColor: '#186aed'}}>
                    <View style = {{flex: 1,flexDirection: "row", marginBottom: 0, }}>
                        <AddTribe uid = {this.state.uid}/>
                        <NavSettings/>
                    </View>
                    <View style = {{marginTop: 0}}>
                    <BotA1Top/>
                    </View>

                </View>
                <View style = {{height: 50, backgroundColor: 'transparent'}}/>
                <TribeRoot friendTribeView = {false} filter = {this.state.uid} />
            </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

HomeScreen.propTypes = {};


export default HomeScreen;

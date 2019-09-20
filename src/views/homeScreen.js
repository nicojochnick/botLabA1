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
import CoreChatContainer from '../components/coreChat/coreChatContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BotA1Component from '../components/botA1/botA1Component';
import FriendGoalView from './friendGoalView';
import ActureHeader from '../components/actureHeader';
import SwitchViewTab from '../components/user/switchViewTab';
import Bio from '../components/user/bio';
import FollowOrUnfollow from '../components/user/followOrUnfollow';


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.switchView = this.switchView.bind(this);


        this.state = {
            editingProfile: false,
            uid: null,
            refresh: false,
            firstAdd: false,
            userConnectedID: null,
            userName: ' ',
            coreUserID: null,
            message: null,
            cycle: null,
            notMe: this.props.notMe,
            isGoalSelect: true,
        }

    }

    switchView(){
        let g = !this.state.isGoalSelect;
        this.setState({isGoalSelect: g})

    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

        let user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            this.setState({uid:user.uid});
            uid = user.uid
        }

        firebase.firestore().collection('users').where('fbID', '==', uid).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            console.log(data);
            let user = data[0];
            let messages = user.messages;
            let cycle = user.cycle;
            console.log(cycle)
            console.log(user.userID);
            console.log(messages)

            this.setState({cycle:cycle});
            this.setState({coreUserID: user.userID});
            this.setState({message:messages})
        });
    }


    onCollectionUpdate = (snapshot) => {
        let user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            this.setState({uid:user.uid});
            uid = user.uid
        }

        firebase.firestore().collection('users').where('fbID', '==', uid).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            console.log(data);
            let user = data[0];
            let messages = user.messages;
            let cycle = user.cycle;
            console.log(cycle)
            console.log(user.userID);
            console.log(messages)
            this.setState({cycle:cycle});
            this.setState({coreUserID: user.userID});
            this.setState({message:messages})
        });

    };

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    render() {
        let goalColor = 'darkgrey';
        let tribeColor = '#3676FF';
        if (this.state.isGoalSelect) {
            goalColor = '#3676FF'
            tribeColor = 'darkgrey'
        }
        return (
            <ScrollView>
                <View style = {{flex: 0.1, flexDirection: "column", paddingTop: 35, marginTop: 0, paddingBottom: 10, borderBottomWidth: 0.3}}>
                    <View style = {{flex: 0.1, flexDirection: "row", justifyContent: "center"}}>
                        <Text style = {{fontWeight: "bold", fontSize: 20}}> username</Text>
                    </View>

                    <View style = {{flex: 0.7,flexDirection: "row", marginBottom: 0, marginRight: 15, justifyContent: "flex-end" }}>
                        <Identity size = 'large'/>
                        <NavSettings/>
                        <AddTribe uid = {this.state.uid}/>
                    </View>
                    <View style = {{flex: 0.3, justifyContent: "flex-start", alignContent: "center", flexDirection: "row"}}>
                        <SwitchViewTab goalColor = {goalColor}
                                       tribeColor = {tribeColor}
                                       switchView = {this.switchView}
                        />
                        {(this.state.notMe)
                            ? <FollowOrUnfollow
                                followed = {true}
                            />
                            : null

                        }
                    </View>

                </View>
                {/*<View style = {{marginTop: -10, height: 300, backgroundColor: '#186aed'}}>*/}
                {/*    /!*<BotA1Top messages = {this.state.message} friendTribeView = {false} filter = {this.state.uid} coreUserID = {this.state.coreUserID}/>*!/*/}
                {/*    /!*<CoreChatContainer coreUserID = {this.state.coreUserID} messages = {this.state.message}/>*!/*/}
                {/*</View>*/}
                <View style = {{flex: 1}}>
                    <Text style = {{fontWeight: "bold", margin: 10, marginLeft: 5, fontSize: 20}}> Goals  </Text>
                    <TribeRoot friendTribeView = {false} filter = {this.state.uid} coreUserID = {this.state.coreUserID}  />
                </View>
            </ScrollView>
        );
    }
}

HomeScreen.propTypes = {};


export default HomeScreen;

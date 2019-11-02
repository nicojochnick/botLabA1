import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, KeyboardAvoidingView, ScrollView,RefreshControl, ActivityIndicator, SafeAreaView} from 'react-native';
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
import firebase from '@react-native-firebase/app';
import CoreChatContainer from '../components/coreChat/coreChatContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BotA1Component from '../components/botA1/botA1Component';
import FriendGoalView from './friendGoalView';
import ActureHeader from '../components/actureHeader';
import SwitchViewTab from '../components/user/switchViewTab';
import Bio from '../components/user/bio';
import FollowOrUnfollow from '../components/user/followOrUnfollow';
import {
    addBoxDB, addDataToTribeDB, addFriendDB, addFriendIDDB, addFriendIDToTribeDB, addFriendToTribeDB,
    addTribeDeadlineDB,
    changeEndGoal,
    changeMetricNameDB,
    changeTribeNameDB,
    deleteTribeDB, removeFriendIDDB,
} from '../redux/actions';
import {connect} from 'react-redux';


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        let user = firebase.auth().currentUser;
        this.ref = firebase.firestore().collection('users');
        this.switchView = this.switchView.bind(this);
        this.getTribeMembers = this.getTribeMembers.bind(this);
        this.addFriendIDDB = this.addFriendIDDB.bind(this);
        this.removeFriendIDDB = this.removeFriendIDDB.bind(this);
        this.forceReload = this.forceReload.bind(this);


        this.state = {
            alwaysMe: null,
            editingProfile: false,
            uid: null,
            refresh: false,
            firstAdd: false,
            userConnectedID: null,
            userName: ' ',
            name: null,
            coreUserID: null,
            message: null,
            cycle: null,
            notMe: false,
            isGoalSelect: true,
            profilePicture: null,
            friendIDs: null,
            friendData: [],
            gotMems: false,
        }

    }

    static navigationOptions = ({navigation}) => {
        const notMe = navigation.getParam('notMe', false, );
        const friendID = navigation.getParam('friendID', false, );
        const fbID = navigation.getParam('fbID', false, );
        if (notMe){
            return {
                headerStyle: {
                    backgroundColor: "#2C2C2C",
                },
            }
        }
        return {

            header: null
        }
    };



    switchView(){
        let g = !this.state.isGoalSelect;
        this.setState({isGoalSelect: g})

    }

    getTribeMembers(friendIDS) {
        let fData = [];
        firebase.firestore().collection('users').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data().userID);
                if (friendIDS.includes(doc.data().userID)) {
                    let name = doc.data().name;
                    let picture = doc.data().photoURL;
                    let fbID = doc.data().fbID;
                    let userID = doc.data().userID;
                    let user = {picture: picture, name: name, userID: userID, fbID: fbID};
                    fData.push(user)
                }
            });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        this.setState({friendData: fData, gotMems: true})
    }

    async getTribeMembersFast() {
        let fData = [];
        console.log(this.state.coreUserID)
        await firebase.firestore().collection('users').where('friendIDs', 'array-contains', this.state.coreUserID).get().then((snapshot) => {
            snapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data().userID);
                    let name = doc.data().name;
                    let picture = doc.data().photoURL;
                    let fbID = doc.data().fbID;
                    let userID = doc.data().userID;
                    let user = {picture: picture, name: name, userID: userID, fbID: fbID};
                    fData.push(user)
            });
            console.log(fData)
            this.setState({friendData: fData, gotMems: true})
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    //TODO update friendList of all my tribes
    addFriendIDDB(friendID, myID){
        this.props.addFriendIDDB(friendID,this.state.alwaysMe,this.state.uid)
    };

    removeFriendIDDB(friendID){
        console.log(friendID)
        console.log(this.state.alwaysMe)
        this.props.removeFriendIDDB(friendID,this.state.alwaysMe, this.state.uid)
    }

    componentDidMount(): void {
        const notMe = this.props.navigation.getParam('notMe', false, );
        this.setState({notMe: notMe});
        const friendID = this.props.navigation.getParam('friendID', false, );
        const fbID = this.props.navigation.getParam('fbID', false, );
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

        if (notMe) {
            this.setState({uid: fbID})
            this.setState({coreUserID: friendID})

            let user = firebase.auth().currentUser;
            let name, email, photoUrl, uid, emailVerified;
            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid
            }
            //TODO TAKE THIS OUT
            firebase.firestore().collection('users').where('fbID', '==', uid).get().then((snapshot) => {
                console.log(snapshot);
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(documentSnapshot.data());
                    return documentSnapshot.data()
                });
                console.log(data);
                let user = data[0];
                this.setState({alwaysMe: user.userID});
            });

        } else {
            let user = firebase.auth().currentUser;
            let name, email, photoUrl, uid, emailVerified;
            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                this.setState({uid: user.uid});
                this.setState({alwaysMe: this.props.user.user.userID});
                this.setState({coreUserID:this.props.user.user.userID })

                uid = user.uid
            }
        }
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        firebase.firestore().collection('users').where('fbID', '==', this.state.uid).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            console.log(data);
            let user = data[0];
            let friendIDs = user.friendIDs;
            let name = user.name;
            let username  = user.username;
            let messages = user.messages;
            let cycle = user.cycle;
            let profilePicture = user.photoURL;

            console.log(cycle);
            console.log(user.userID);
            console.log(messages);
            this.setState({cycle:cycle});
            this.setState({coreUserID: user.userID});
            this.setState({message:messages});
            this.setState({name: name});
            this.setState({username: username});
            this.setState({profilePicture: profilePicture });
            this.setState({friendIDs: friendIDs});
            if (!(this.state.notMe)){
                this.setState({alwaysMe: user.userID})
            }
            this.getTribeMembersFast()
        });
    };

    forceReload(){
        this.forceUpdate()
    }

    render() {
        console.log(this.props.user)
        console.log(this.state.friendIDs, this.state.alwaysMe);
        let goalColor = 'darkgrey';
        let tribeColor = '#3676FF';
        if (this.state.isGoalSelect){
            goalColor = '#3676FF';
            tribeColor = 'darkgrey'
        }
        return (
            <KeyboardAwareScrollView style = {{backgroundColor: 'white', marginTop: 0, padding: 0}}>
                <SafeAreaView style = {{flex: 0.1, flexDirection: "column", paddingTop: 0,paddingBottom: 0, backgroundColor: 'white'}}>

                    <View style = {{flex: 1,flexDirection: "row", marginBottom: 0, marginRight: 10, justifyContent: "flex-start" }}>
                        <View style = {{flex:1, marginRight: -20}}>
                        <Identity size = 'medium'
                                  forceReload = {this.forceReload}
                                  notMe = {this.state.notMe}
                                  alwaysMe = {this.state.alwaysMe}
                                  name = {this.state.name}
                                  profilePicture = {this.state.profilePicture}/>
                        </View>
                        { (this.state.notMe && this.state.alwaysMe !== this.state.coreUserID)
                            ? <FollowOrUnfollow
                                followed = {true}
                                friendID = {this.state.coreUserID}
                                removeFriendIDDB = {this.removeFriendIDDB}
                                friendsIDs = {this.state.friendIDs}
                                alwaysMe = {this.state.alwaysMe}
                            />
                            :
                            <View style={ {flexDirection: "row", flex: 0.25,}} >
                            <NavSettings/>
                            < AddTribe
                                uid = {this.state.uid}
                                friendIDs ={this.state.friendIDs}
                                userID = {this.props.user.user.userID}
                                alwaysMe ={this.state.alwaysMe}
                            />
                            </View>
                        }
                    </View>
                    {/*<View style = {{flex: 0.3, justifyContent: "flex-start", alignContent: "center", flexDirection: "row"}}>*/}
                    {/*    <SwitchViewTab goalColor = {goalColor}*/}
                    {/*                   tribeColor = {tribeColor}*/}
                    {/*                   switchView = {this.switchView}*/}
                    {/*    />*/}
                    {/*</View>*/}
                </SafeAreaView>
                {(this.state.isGoalSelect)
                    ?
                    <View style={{flex: 1, backgroundColor: 'white', marginTop: 20}}>
                        <TribeRoot
                            friendTribeView={false}
                            filter={this.state.coreUserID}
                            notMe = {this.state.notMe}
                            coreUserID={this.props.coreUserID}
                            alwaysMe = {this.state.alwaysMe}
                            name = {this.state.name}
                            isFeed = {false}
                            profilePicture = {this.state.profilePicture}
                        />
                    </View>
                    :
                    <View style={{flex: 1}}>

                    </View>
                }
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID) =>dispatch(addFriendIDDB(friendID, myID)),
        removeFriendIDDB: (friendID, myID, fbID) =>dispatch(removeFriendIDDB(friendID, myID))

    }
};

HomeScreen.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
HomeScreen.propTypes = {};


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, ActivityIndicator, RefreshControl, ScrollView, SafeAreaView} from 'react-native';
import {Button, Input, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../components/feed/feedContainer';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import TribeRoot from '../components/tribe/tribeRoot';
import SearchContainer from '../components/search/searchContainer';
import {addFriendIDDB, changeGroupName, removeFriendIDDB, updateUser} from '../redux/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import {connect} from 'react-redux';
import BotA1Component from '../components/botA1/botA1Component';
import BotA1Top from '../components/botA1/botA1Top';
import { useFocusEffect } from '@react-navigation/core';

import AddTribe from '../components/tribe/addTribe';
import { NavigationEvents } from 'react-navigation';
import TribeGroup from '../components/groups/tribeGroup';
import Identity from '../components/user/identity';


class FeedView extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users')
        this.ref2 = firebase.firestore().collection('groups')

        this.user = firebase.auth().currentUser;
        this.state = {
            search: '',
            alwaysMe: null,
            uid: null,
            friendIDs: [],
            loading: true,
            refreshing: false,
            filter: [],
            groupName: null,
            tribeColor: 'lightgrey',
            isAllTribe: true,
            groupID: null,
            group: null,
            groups: [],
            isMemberOpen: false,
            friendData: null,
            memIDs: null,
            getMems: false,
            }
    }
    static navigationOptions = ({navigation}) => {
        return {
           header: null
        }
    };

    updateSearch() {
        this.setState({search});
    };

    saveUser(user){
        this.props.updateUser(user);
        console.log('userDispatch')
    }

    async getMembersFast() {
        let fData = [];
        console.log(this.state.coreUserID)
        await firebase.firestore().collection('users').where('groupIDs', 'array-contains', this.state.groupID).get().then((snapshot) => {
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





    componentDidMount(): void {
        let user = firebase.auth().currentUser;
        this.setState({uid: user.uid});
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate)
            const {navigation} = this.props;
            this.focusListener = navigation.addListener('didFocus', () => {
                console.log("FOCUSED")
                if (this.props.currentGroup !== undefined) {
                    console.log("FOCUSED")
                    this.ref.onSnapshot(this.onCollectionUpdate)
                    if (this.props.currentGroup) {
                        this.setState({
                                groupID: this.props.currentGroup.tribeGroupID
                            }
                        )
                    } else {
                        this.setState({noGroup:true})
                    }
                }
                ;
            });

    }


    componentWillUnmount(): void {
        this.unsubscribe();
        this.unsubscribe2()
        this.focusListener.remove();
    }

    onCollectionUpdate = async (snapshot) => {
        let user = firebase.auth().currentUser;
        await this.ref.where('fbID', '==', user.uid).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            let user = data[0];

            let friendIDs = user.friendIDs;
            let name = user.name;
            let username  = user.username;
            let messages = user.messages;
            let cycle = user.cycle;
            let profilePicture = user.photoURL;
            this.setState({alwaysMe: user.userID});
            this.setState({name: name});
            this.setState({username: username});
            this.setState({profilePicture: profilePicture });
            this.setState({friendIDs: user.friendIDs});
            this.setState({loading: false});
            this.saveUser(user)
        });

        await this.ref2.where('id', '==', this.state.groupID).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            let group = data[0];
            this.setState({memIDs: group.members})
            this.setState({group: group});
            this.setState({groupName: group.name})
            this.getMembersFast()
        });
        let fData = [];

        await this.ref.where('groupIDs', 'array-contains', this.state.groupID).get().then((snapshot) => {
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
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
    };

    doneSaving(){
        this.props.changeGroupName(this.state.groupName,this.state.groupID)
        this.setState({isEditingName: false})
    }

    render() {
        let groups = null
        let groupColor = '#242432'
        if(this.state.isMemberOpen){
            groupColor =  '#3676FF'
        }
        let userID = null;
        if  (this.props.user !== null) {
            userID = this.props.user.user.userID
        }


        console.log(this.props.navigation.isFocused())
        console.log(this.props.currentGroup)
        console.log(this.props.state.user)
        console.log(this.props.state.groupName)
        let letMyFriends = this.state.friendIDs
        let Me = this.state.alwaysMe
        let filter = letMyFriends.push(Me);

        let searchMess = 'add a tribe member by emails';
        if (this.state.isAllTribe){
            searchMess = 'search users by email'
        }
        return (

            <KeyboardAwareScrollView
                style={{paddingTop: 0, paddingBottom:100, backgroundColor: 'white', flex: 1, marginBottom: 0, padding: 0}}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this._onRefresh}
                //     />
                // }
            >
                <SafeAreaView style = {{flexDirection: "row", paddingTop: 30 , justifyContent: "flex-start", alignItems: "flex-start", flex: 1}}>
                    <View style = {{flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start", flex: 2, marginBottom: 10}}>
                        <View style = {{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
                        <Button
                            type = 'clear'
                            containerStyle = {{marginRight: 0}}
                            onPress={() => this.props.navigation.navigate('Menu')}
                            icon = {
                                <Ionicons
                                    name = {'ios-menu'}
                                    size = {45}
                                    style = {{color: 'black'}}
                                    onPress={() => this.props.navigation.navigate('Menu')}

                                />

                            }
                        />
                            <Identity

                                size = 'medium'
                                forceReload = {this.forceReload}
                                notMe = {false}
                                alwaysMe = {this.state.alwaysMe}
                                name = {this.state.name}
                                profilePicture = {this.state.profilePicture}
                            />

                        </View>

                        {(this.state.groupID)
                            ?<View style={{flexDirection: "row", flex: 1, padding: 4, marginTop: 20}}>
                                <TextInput
                                    editable={true}
                                    multiline={true}
                                    placeholder='Untitled    '
                                    value={this.state.groupName}
                                    onChangeText={text => this.setState({groupName: text, isEditingName: true})}
                                    style={{
                                        color: 'black',
                                        margin: 5,
                                        paddingLeft: 0,
                                        marginTop: -15,
                                        fontWeight: 'bold',
                                        fontSize: 38
                                    }}
                                />
                            </View>
                            :null
                        }

                    </View>
                    <View style = {{ marginRight: 10, marginLeft: -5, flex: 0.4, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-end",}}>
                        {(!this.state.loading)
                            ? <Button
                                style={{alignContent: "center", marginTop: 10, marginRight: 0}}
                                onPress={() => this.setState({isMemberOpen: !this.state.isMemberOpen})}
                                icon={
                                    <Ionicons
                                        name={'ios-contacts'}
                                        color={groupColor}
                                        size={35}
                                        onPress={() => this.setState({isMemberOpen: !this.state.isMemberOpen})}
                                        raised={true}
                                    />
                                }
                                type='clear'

                            />
                            : null
                        }
                        <View style = {{marginTop: -5}}>

                        <AddTribe
                        uid = {this.state.uid}
                        friendIDs ={this.state.friendIDs}
                        groupID = {this.state.groupID}
                        userID = {userID}
                        alwaysMe ={this.state.alwaysMe}
                        />
                        </View>
                    </View>
                </SafeAreaView>
                <View>
                {(this.state.isEditingName)
                    ?
                    <Button
                        style={{alignContent: "center", borderRadius: 10, marginTop: -10, marginRight: 0, justifyContent: "center", alignItems: "center"}}
                        title = "Save Name"
                        titleStyle = {{color: "white", fontWeight: "700"}}
                        buttonStyle={{backgroundColor: '#186aed'}}
                        onPress = {()=> this.doneSaving()}

                    />
                    :null
                }
                </View>

                <View>
                    {(this.state.isMemberOpen)
                       ?
                        <View style = {{margin: 6, marginTop: 0, padding: 2, backgroundColor: 'white', borderRadius: 10,shadowColor: "black",
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 20,}}>
                            <Text style = {{margin: 6, fontWeight: "bold", textAlign: "left", color: "black", fontSize: 18,}}> members </Text>
                            <SearchContainer
                                mess = {searchMess}
                                alwaysMe = {this.state.alwaysMe}
                                groupName = {this.state.groupName}
                                groupID = {this.state.groupID}
                            />
                        <TribeGroup
                            alwaysMe = {this.state.alwaysMe}
                            friendData={this.state.friendData}
                            getMems={this.state.getMems}
                            groupID = {this.state.groupID}
                        />
                        </View>
                        :null
                    }
                </View>
                { (this.state.alwaysMe !== null && this.state.groupID )
                   ?
                    <TribeRoot
                        isFeed = {true}
                        notMe={false}
                        groupID = {this.state.groupID}
                        alwaysMe={this.state.alwaysMe}
                    />
                    :
                    <ScrollView>
                    <Text style = {{margin: 20, marginTop: 4, color: "black", alignText: "center", fontWeight: "bold", fontSize: 35 }}>Hi There!</Text>
                    <Text style = {{margin: 20, marginTop: -5, color: "black", alignText: "center", fontWeight: "500", fontSize: 25 }}>Add a Group using the Left Menu Button 😁 </Text>
                    </ScrollView>
                }
            </KeyboardAwareScrollView>
            );
        }
}


const mapStateToProps = (state /*, ownProps*/) => ({
    state: state,
    user: state.user.user,
    currentGroup: state.user.currTribe
});
const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID) =>dispatch(addFriendIDDB(friendID, myID)),
        removeFriendIDDB: (friendID, myID, fbID) =>dispatch(removeFriendIDDB(friendID, myID)),
        updateUser: (user) => dispatch(updateUser(user)),
        changeGroupName: (text, id) => dispatch(changeGroupName(text,id))
    }
};

FeedView.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(FeedView);


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import {Button, Input, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../components/feed/feedContainer';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import TribeRoot from '../components/tribe/tribeRoot';
import SearchContainer from '../components/search/searchContainer';
import {addFriendIDDB, changeGroupName, removeFriendIDDB, updateUser} from '../redux/actions';

import {connect} from 'react-redux';
import BotA1Component from '../components/botA1/botA1Component';
import BotA1Top from '../components/botA1/botA1Top';
import { useFocusEffect } from '@react-navigation/core';

import AddTribe from '../components/tribe/addTribe';
import { NavigationEvents } from 'react-navigation';
import TribeGroup from '../components/groups/tribeGroup';


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
            groupID: this.props.currentGroup.tribeGroupID,
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

        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            console.log("FOCUSED")
            if (this.props.currentGroup !== undefined) {
                console.log("FOCUSED")
                this.ref.onSnapshot(this.onCollectionUpdate)
                this.setState({
                        groupID: this.props.currentGroup.tribeGroupID
                    }
                )
            };
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
            this.setState({alwaysMe: user.userID});
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
        let groupColor = 'white'
        if(this.state.isMemberOpen){
            groupColor =  '#3676FF'
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

            <ScrollView
                style={{paddingTop: 0, paddingBottom:100, backgroundColor: '#282C33', flex: 1, marginBottom: 0}}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this._onRefresh}
                //     />
                // }
            >

                <View style = {{flexDirection: "row", paddingTop: 50 , justifyContent: "flex-start", alignItems: "flex-start", flex: 1}}>
                    <View style = {{flexDirection: "row", flex: 0.6}}>
                    <Button
                        type = 'clear'
                        containerStyle = {{marginRight: 0}}
                        onPress={() => this.props.navigation.navigate('Menu')}
                        icon = {
                            <Ionicons
                                name = {'ios-menu'}
                                size = {40}
                                style = {{color: 'lightgrey'}}
                                onPress={() => this.props.navigation.navigate('Menu')}

                            />

                        }
                    />
                <TextInput
                    editable = {true}
                    value = {this.state.groupName}
                    multiline={true}
                    onChangeText = {text=> this.setState({groupName: text, isEditingName: true})}
                    style = {{color: 'white', margin: 4, paddingLeft: 5, marginTop: 7,  fontWeight: 'bold', fontSize: 30}}

                />

                    </View>
                    <View style = {{ marginRight: 10, margin: -10, flex: 0.4, flexDirection: "row", alignItem: "center", justifyContent: "flex-end",}}>
                        {(this.state.isEditingName)
                            ?
                            <Button
                                style={{ alignContent: "center", marginTop: 20, marginRight: 0}}
                                title = "Save"
                                titleStyle = {{color: "black", fontWeight: "400"}}
                                buttonStyle={{backgroundColor: "lightgrey"}}
                                onPress = {()=> this.doneSaving()}

                            />
                            :null
                        }
                        <Button
                            style={{ alignContent: "center", marginTop: 20, marginRight: 0}}
                            onPress = {() => this.setState({isMemberOpen: !this.state.isMemberOpen})}
                            icon = {
                                <Ionicons
                                    name = {'ios-contacts'}
                                    color = {groupColor}
                                    size = {35}
                                    onPress = {() => this.setState({isMemberOpen: !this.state.isMemberOpen})}
                                    raised = {true}
                                />
                            }
                            type = 'clear'

                        />

                        <AddTribe
                        uid = {this.state.uid}
                        friendIDs ={this.state.friendIDs}
                        groupID = {this.state.groupID}
                        userID = {this.props.user.user.userID}
                        alwaysMe ={this.state.alwaysMe}
                        />
                    </View>
                </View>

                <View>
                    {(this.state.isMemberOpen)
                       ?
                        <View style = {{margin: 6, padding: 2, borderRadius: 10, borderWidth: 1, borderColor: "white"}}>
                            <Text style = {{margin: 6, fontWeight: "bold", textAlign: "left", color: "white", fontSize: 18,}}> members </Text>
                            <SearchContainer
                                mess = {searchMess}
                                alwaysMe = {this.state.alwaysMe}
                                groupName = {this.state.groupName}
                                groupID = {this.state.groupID}
                            />
                        <TribeGroup
                            friendData={this.state.friendData}
                            getMems={this.state.getMems}
                            groupID = {this.state.groupID}
                        />
                        </View>
                        :null
                    }
                </View>
                { (this.state.alwaysMe !== null )
                   ?
                    <TribeRoot
                        isFeed = {true}
                        notMe={false}
                        groupID = {this.state.groupID}
                        alwaysMe={this.state.alwaysMe}
                    />
                    : null
                }
            </ScrollView>
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


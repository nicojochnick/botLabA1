import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../components/feed/feedContainer';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import TribeRoot from '../components/tribe/tribeRoot';
import SearchContainer from '../components/search/searchContainer';
import {addFriendIDDB, removeFriendIDDB, updateUser} from '../redux/actions';

import {connect} from 'react-redux';


class FeedView extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users')
        this.user = firebase.auth().currentUser;
        this.state = {
            search: '',
            alwaysMe: null,
            uid: null,
            friendIDs: [],
            loading: true,
            refreshing: false,
            filter: [],
            tribeName: 'All Tribes',
            tribeColor: 'lightgrey',
            isAllTribe: true
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

    componentDidMount(): void {
        let user = firebase.auth().currentUser;
        this.setState({uid: user.uid});
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        let user = firebase.auth().currentUser;
        this.ref.where('fbID', '==', user.uid).get().then((snapshot) => {
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
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
    }

    render() {

        if (this.props.user.user.tribeID !== null){

        }


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
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <View style = {{flexDirection: "row", marginRight: 5, paddingTop: 50,}}>
                    <Button
                        type = 'clear'
                        onPress={() => this.props.navigation.toggleDrawer()}
                        icon = {
                            <Ionicons
                                name = {'ios-menu'}
                                size = {40}
                                style = {{color: 'lightgrey'}}
                                onPress={() => this.props.navigation.toggleDrawer()}

                            />

                        }
                    />
                <Text style = {{color: this.state.tribeColor, margin: 4, marginTop: 7,  fontWeight: 'bold', fontSize: 33}}> {this.state.tribeName} </Text>
                </View>
                <SearchContainer
                    mess = {searchMess}
                />
                { (this.state.alwaysMe !== null )
                   ?
                    <TribeRoot
                        isFeed = {true}
                        notMe={false}
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
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID) =>dispatch(addFriendIDDB(friendID, myID)),
        removeFriendIDDB: (friendID, myID, fbID) =>dispatch(removeFriendIDDB(friendID, myID)),
        updateUser: (user) => dispatch(updateUser(user))
    }
};

FeedView.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(FeedView);


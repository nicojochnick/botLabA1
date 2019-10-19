import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../components/feed/feedContainer';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import TribeRoot from '../components/tribe/tribeRoot';
import SearchContainer from '../components/search/searchContainer';

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
        });
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        t
    }

    render() {

        console.log(this.state.friendIDs);
        console.log(this.state.alwaysMe);
        let letMyFriends = this.state.friendIDs
        let Me = this.state.alwaysMe
        let filter = letMyFriends.push(Me);
        console.log(filter);
        return (
            <ScrollView
                style={{paddingTop: 50, paddingBottom:100, backgroundColor: '#282C33', flex: 1, marginBottom: 0}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <SearchContainer/>
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

FeedView.propTypes = {};
export default FeedView;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../components/feed/feedContainer';
import firebase from "react-native-firebase";
import TribeRoot from '../components/tribe/tribeRoot';





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
            filter: [],
            }
    }

    updateSearch() {
        this.setState({search});
    };

    getEmails(mail){
        const db = firebase.firestore();
        // db.settings({ timestampsInSnapshots: true});
        db.collection('users').where("email", '==',mail).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ searchData: data })
        });
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
        });
    };

    render() {

        console.log(this.state.friendIDs);
        console.log(this.state.alwaysMe);
        let letMyFriends = this.state.friendIDs
        let Me = this.state.alwaysMe
        let filter = letMyFriends.push(Me);
        console.log(filter);
        return (
            <View style={{paddingTop: 50, backgroundColor: '#E0E7EA'}}>
                <SearchBar
                    lightTheme={true}
                    placeholder='search friends'
                    onChangeText={() => this.updateSearch}
                    clearIcon={
                        <Ionicons
                            name={'ios-close'}
                            size={25}
                        />
                    }
                    searchIcon={
                        <Ionicons
                            name={'ios-search'}
                            size={25}
                        />
                    }
                />
                { (this.state.alwaysMe !== null )
                   ?
                    <TribeRoot
                        filter={letMyFriends}
                        notMe={false}
                        alwaysMe={this.state.alwaysMe}
                    />
                    : null
                }
            </View>
            );
        }
}

FeedView.propTypes = {};
export default FeedView;

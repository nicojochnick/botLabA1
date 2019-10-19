import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Text, ActivityIndicator} from 'react-native'
import NotificationRoot from '../components/notifications/notificationRoot';
import firebase from '@react-native-firebase/app';

class NotificationScreen extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.user = firebase.auth().currentUser;
        this.state = {
            search: '',
            alwaysMe: null,
            uid: null,
            friendIDs: [],
            loading: true,
            filter: [],
            fbID: null,
        }
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
            this.setState({fbID: user.fbID})
            this.setState({loading: false});
        });
    };

    render() {
        return (
            <View style = {{paddingTop: 50, backgroundColor: '#282C33', flex: 1}}>
                {(this.state.loading)
                    ? <ActivityIndicator/>
                    : <NotificationRoot
                        alwaysMe={this.state.alwaysMe}
                        fbID = {this.state.fbID}
                    />
                }
            </View>
        );
    }
}

NotificationScreen.propTypes = {};

export default NotificationScreen;

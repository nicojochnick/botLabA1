import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import NotificationComponent from './notificationComponent';
import firebase from "react-native-firebase";
import UserTag from '../user/userTag';
import UserTagContainer from '../user/userTagContainer';

class NotificationContainer extends Component {
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.state = {
            fromUserName: null,
            fromPhoto: null,
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
        this.ref.where('userID', '==',this.props.fromUserID).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            let user = data[0];
            this.setState({fromUserName: user.name});
            this.setState({fromPhoto: user.photoURL})
            this.setState({fromFBID: user.fbID})
        });
    };


    render() {
        return (
            <UserTagContainer
                action = {this.props.action}
                accepted = {this.props.accepted}
                fromFBID = {this.state.fromFBID}
                fbID = {this.props.fbID}
                message = {this.props.message}
                fromUserID = {this.props.fromUserID}
                toUserID = {this.props.toUserID}
                fromPhoto = {this.state.fromPhoto}
                fromUserName = {this.state.fromUserName}
                notID = {this.props.timeStamp}
            />
        );
    }
}

NotificationContainer.propTypes = {};

export default NotificationContainer;

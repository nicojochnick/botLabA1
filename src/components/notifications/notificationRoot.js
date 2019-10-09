import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View,FlatList} from 'react-native';
import NotificationContainer from './notificationContainer';
import * as firebase from "react-native-firebase";

//Call relevant Data from the commentSystem collection and format it appropratiely into the notification Component
class NotificationRoot extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('notifications');
        this.state = {

        }
    };
    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        this.ref.where("toUserID", '==',this.props.alwaysMe).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ notifications: data, loading: false })
        });
    };



    render() {
        return (
            <FlatList
                data = {this.state.notifications}
                renderItem = {({item}) => (
                    <NotificationContainer
                        message = {item.message}
                        fromUserID = {item.fromUserID}
                        toUserID = {item.toUserID}
                        timeStamp = {item.timeStamp}
                        action = {item.action }
                        alwaysMe = {this.props.alwaysMe}
                        fbID = {this.props.fbID}
                    />
                    )}
            />
        );
    }
}

NotificationRoot.propTypes = {};

export default NotificationRoot;

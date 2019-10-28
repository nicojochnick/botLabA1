import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View,FlatList, Text, ScrollView} from 'react-native';
import NotificationContainer from './notificationContainer';
import firebase from '@react-native-firebase/app';

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
        let sortedArray = null
        if (this.state.notifications!==undefined) {
            let data = this.state.notifications;
             sortedArray = data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        }
        return (
            <ScrollView style = {{backgroundColor: '#282C33'}}>
                <Text style = {{fontSize: 30, color: 'white', fontWeight: "bold", marginBottom: 10}}>  Notifications </Text>
                <View style = {{borderWidth: 1, borderRadius: 10, margin: 6, padding: 3, borderColor: "white"}}>
                <FlatList
                data = {sortedArray}
                renderItem = {({item}) => (
                    <NotificationContainer
                        message = {item.message}
                        fromUserID = {item.fromUserID}
                        toUserID = {item.toUserID}
                        timeStamp = {item.timeStamp}
                        action = {item.action }
                        accepted = {item.accepted}
                        alwaysMe = {this.props.alwaysMe}
                        fbID = {this.props.fbID}
                        groupID = {item.groupID}
                    />
                    )}
            />
                </View>
            </ScrollView>
        );
    }
}

NotificationRoot.propTypes = {};

export default NotificationRoot;

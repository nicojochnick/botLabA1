import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View,FlatList} from 'react-native';
import NotificationContainer from './notificationContainer';

//Call relevant Data from the commentSystem collection and format it appropratiely into the notification Component
class NotificationRoot extends Component {
    render() {
        return (
            <FlatList
                data = {}
                renderItem = {({item}) => (

                    <NotificationContainer

                    />

                    )}
            />
        );
    }
}

NotificationRoot.propTypes = {};

export default NotificationRoot;

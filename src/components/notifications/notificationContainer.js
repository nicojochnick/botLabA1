import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import NotificationComponent from './notificationComponent';

class NotificationContainer extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <NotificationComponent
                username = {this.props.username}
                photoURL = {this.props.photoURL}
                action = {this.props.action}
            />
        );
    }
}

NotificationContainer.propTypes = {};

export default NotificationContainer;

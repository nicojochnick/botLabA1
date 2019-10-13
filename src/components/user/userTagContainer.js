import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserTag from './userTag';
import {acceptNotificationRequest, addFriendIDDB, removeFriendIDDB} from '../../redux/actions';
import {connect} from 'react-redux';

class UserTagContainer extends Component {
    constructor(props){
        super(props)
        this.addFriendIDDB = this.addFriendIDDB.bind(this)
        this.state = {

        }
    }
    addFriendIDDB(fromID, toID, fbID){
        console.log(fbID)
        this.props.addFriendIDDB(fromID,toID,fbID, this.props.fromFBID)
        this.props.acceptNotificationRequest(this.props.notID)
    };

    render() {
        return (
            <UserTag
                name = {this.props.fromUserName}
                avatar = {this.props.fromPhoto}
                action = {this.props.action}
                fbID = {this.props.fbID}
                message = {this.props.message}
                fromUserID = {this.props.fromUserID}
                toUserID = {this.props.toUserID}
                addFriendIDDB = {this.addFriendIDDB}
                accepted = {this.props.accepted}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID, friendFBID) =>dispatch(addFriendIDDB(friendID, myID, fbID, friendFBID)),
        acceptNotificationRequest: (id) => dispatch(acceptNotificationRequest(id)),
        removeFriendIDDB: (friendID, myID, fbID, friendFBID) =>dispatch(removeFriendIDDB(friendID, myID, fbID,friendFBID))
    }
};

export default connect(null, mapDispatchToProps)(UserTagContainer);

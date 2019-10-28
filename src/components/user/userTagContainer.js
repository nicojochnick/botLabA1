import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserTag from './userTag';
import {
    acceptNotificationRequest,
    addFriendIDDB,
    addToGroup,
    removeFriendIDDB, removeFromGroup,
    sendNotification,
} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from 'moment';

class UserTagContainer extends Component {
    constructor(props){
        super(props)
        this.addFriendIDDB = this.addFriendIDDB.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.removeFromGroup = this.removeFromGroup.bind(this);
        this.addToGroup = this.addToGroup.bind(this)

        this.state = {

        }
    }
    removeFromGroup(){
        console.log(this.props.toUserID,this.props.groupID)
        this.props.removeFromGroup(this.props.toUserID, this.props.groupID)

    }
    addFriendIDDB(fromID, toID, fbID){
        console.log(fbID)
        this.props.addFriendIDDB(fromID,toID,fbID, this.props.fromFBID)
        this.props.acceptNotificationRequest(this.props.notID)
    };

    addToGroup(user, group){
        console.log(this.props.toUserID,this.props.groupID)
        this.props.addToGroupDB(this.props.toUserID, this.props.groupID)
        this.props.acceptNotificationRequest(this.props.notID)

    }

    addNotification(fromID, toID, groupName){
        let groupRequest = {
            message : "wants you to join the group: " + this.props.groupName,
            fromUserID : this.props.fromUserID,
            groupID : this.props.groupID,
            toUserID: this.props.toUserID,
            timeStamp: moment().format(),
            action: "requestToAddToGroup",
            accepted: false,
        };
        this.props.sendAdd(groupRequest)
    }

    render() {
        return (
            <UserTag
                name = {this.props.fromUserName}
                groupName = {this.props.groupName}
                addToGroup = {this.addToGroup}
                groupID = {this.props.groupID}
                avatar = {this.props.fromPhoto}
                action = {this.props.action}
                fbID = {this.props.fbID}
                isSearch = {this.props.isSearch}
                isAddToGroup = {this.props.isAddToGroup}
                message = {this.props.message}
                fromUserID = {this.props.fromUserID}
                toUserID = {this.props.toUserID}
                addFriendIDDB = {this.addFriendIDDB}
                accepted = {this.props.accepted}
                sendGroupNotification = {this.addNotification}
                isGroupList = {this.props.isGroupList}
                removeFromGroup = {this.removeFromGroup}
                canRemove = {this.props.canRemove}
                alwaysMe = {this.props.alwaysMe}

            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID, friendFBID) =>dispatch(addFriendIDDB(friendID, myID, fbID, friendFBID)),
        acceptNotificationRequest: (id) => dispatch(acceptNotificationRequest(id)),
        removeFriendIDDB: (friendID, myID, fbID, friendFBID) =>dispatch(removeFriendIDDB(friendID, myID, fbID,friendFBID)),
        sendAdd: (groupRequest) => dispatch(sendNotification(groupRequest)),
        addToGroupDB: (userID, groupID) => dispatch(addToGroup(userID, groupID)),
        removeFromGroup: (userID, groupID) => dispatch(removeFromGroup(userID, groupID))

    }
};

export default connect(null, mapDispatchToProps)(UserTagContainer);

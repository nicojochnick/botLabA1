import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/index';
import {View, TextInput} from 'react-native'
import {ListItem, Button} from 'react-native-elements';
import { withNavigation,} from 'react-navigation';
import {addFriendIDDB, removeFriendIDDB, sendNotification} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from './followOrUnfollow';

class UserTag extends Component {
    constructor(props){
        super(props )
    }

    navigate(userID, fbID) {
        let way = this.props.route;
        if (way==='home'){
            this.props.navigation.navigate('OtherHome', { notMe: true, friendID: userID, fbID: fbID})
        }
        if (way === 'feed') {
            this.props.navigation.navigate('FriendHome', { notMe: true, friendID: userID, fbID: fbID})
        }

    }

    navigateToProfile(userID, fbID) {
        this.props.navigation.navigate('OtherHome', { notMe: true, friendID: userID, fbID: fbID})
    }

    addFriendIDDB(){
        this.props.addFriendIDDB(this.props.fromUserID,this.props.toUserID,this.props.fbID)
    };

    buttonPress(){
        if (this.props.accepted !== true) {
        this.props.addFriendIDDB(this.props.fromUserID, this.props.toUserID, this.props.fbID)
        }
    }

    nav(){
        if(this.props.isSearch) {
            this.props.clearSearch()
        }
        this.navigate(this.props.userID, this.props.fbID)
    }
    sendGroupNotification(fromID, toID){

            let groupRequest = {
                message : "wants you to join the group: " + this.props.groupName,
                fromUserID : fromID,
                toUserID: toID,
                timeStamp: moment().format(),
                action: "requestToAddToGroup",
                accepted: false,
            };
            this.props.sendNotification(groupRequest)

    }


    render() {
        let button = 'accept'
        let color = '#186aed'
        if (this.props.accepted){
            button = 'accepted'
            color = '#31E781'
        }

        return (
            <ListItem
                containerStyle = {{backgroundColor: "#21262C", borderTopWidth:1,borderColor: 'grey'}}
                contentContainerStyle = {{borderWidth: 0}}
                style = {{ margin: 0, padding: 0,}}
                titleStyle = {{fontWeight: "500", color: "white"}}
                title={this.props.name}
                subtitleStyle = {{color: "lightgrey"}}
                subtitle={this.props.message}
                leftAvatar = {
                    { avatarStyle: { borderRadius: 100, borderWidth: 1, borderColor: "white"}, source: {uri: this.props.avatar}}}
                rightElement = {
                    <View>

                        {(this.props.action === "requestToAddToGroup")
                            ? <Button
                                buttonStyle = {{backgroundColor: color}}
                                title ={'Accept'}
                                raised = {true}
                                onPress = {()=> this.props.addToGroup(this.props.groupID, this.props.toUserID)}
                            />
                            : null
                        }

                    {(this.props.action === 'friendRequest')
                        ? <Button
                            buttonStyle = {{backgroundColor: color}}
                            title ={button}
                            raised = {true}
                            onPress = {()=> this.buttonPress()}
                        />
                    : null
                    }
                        {(this.props.action === 'groupAdd')
                            ? <Button
                                buttonStyle = {{backgroundColor: color}}
                                title ={'add user to group'}
                                raised = {true}
                                onPress = {()=> this.sendGroupNotification(this.props.fromID, this.props.toID)}
                            />
                            : null
                        }
                    </View>
                }

                onPress = {() => this.nav()}
            />
        );
    }
}



export default withNavigation(UserTag);

const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID) =>dispatch(addFriendIDDB(friendID, myID)),
        removeFriendIDDB: (friendID, myID, fbID) =>dispatch(removeFriendIDDB(friendID, myID)),
        sendGroupNotification: (groupRequest) => dispatch(sendNotification(groupRequest)),

    }
};

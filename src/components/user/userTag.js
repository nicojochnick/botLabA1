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
        this.state = {
            buttonText: 'send group invite'
        }
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

    sendNotAndUpdateButton(){
        this.props.sendGroupNotification(this.props.fromUserID, this.props.toUserID, this.props.groupName)
        this.setState({buttonText: 'sent'})

    }



    render() {
        let button = 'accept'
        let color = '#186aed'
        if (this.props.accepted){
            button = 'accepted'
            color = '#31E781'
        }
        let uri = 'https://api.adorable.io/avatars/161/' + this.props.fromUserID;

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
                    { avatarStyle: { borderRadius: 100, borderWidth: 1, borderColor: "white"},
                        source: {uri:uri  }
                }}
                rightElement = {
                    <View>

                        {(this.props.action === "requestToAddToGroup")
                            ? <Button
                                buttonStyle = {{backgroundColor: color}}
                                title ={'Accept Invite'}
                                raised = {true}
                                onPress = {()=> this.props.addToGroup(this.props.groupID, this.props.toUserID)}
                            />
                            : null
                        }

                        {(this.props.isGroupList && this.props.canRemove && (this.props.toUserID !== this.props.alwaysMe))
                            ? <Button
                                title={'remove'}
                                type ='clear'
                                onPress={() => this.props.removeFromGroup()}
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
                                title ={this.state.buttonText}
                                raised = {true}
                                onPress = {()=>this.sendNotAndUpdateButton()}
                            />
                            : null
                        }
                    </View>
                }

                onPress = {() => console.log("pressed user tag")}
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

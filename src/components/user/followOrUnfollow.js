import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import {View, Text} from 'react-native'
import moment from 'moment';
import {
    addBoxDB, addDataToTribeDB, addFriendIDToTribeDB, addFriendToTribeDB,
    addTribeDeadlineDB,
    changeEndGoal,
    changeMetricNameDB,
    changeTribeNameDB,
    deleteTribeDB, shareTribeDB, unshareTribeDB, updateHeader,
} from '../../redux/actions';
import {connect} from 'react-redux';

class FollowOrUnfollow extends Component {
    constructor(props){
        super(props);
        this.state = {
            follow: false,
            isRequestSent: false,
            isFollowing: false,
        }
    }

    sendFriendRequest(){
        let friendRequestNotification = {
            message : "wants to join your tribe",
            fromUserID : this.props.alwaysMe,
            toUserID: this.props.friendID,
            timeStamp: moment().format(),
            action: "friendRequest",
            accepted: false,
        };
        // this.props.sending(friendRequestNotification)
    }


    removeFriend() {
        this.props.removeFriendIDDB(this.props.friendID)
    }

    addFriend(){
        this.setState({isRequestSent: true});
        this.sendFriendRequest()
    }

    componentDidMount(): void {
        if (this.props.friendIDS !== undefined) {
            if (this.props.friendIDs.includes(this.props.alwaysMe)) {
                this.setState({isFollowing: true})
            }
        }
    }

    render() {
        console.log(this.props.friendIDs)
        let isF = false;
        if (this.props.friendIDS !== undefined) {
            if (this.props.friendIDs.includes(this.props.alwaysMe)) {
                isF = true

            }
        }
        return (
            <View style = {{flex: 0.5, justifyContent: "flex-end", alignItems: "center"}}>
                {(isF)
                    ?
                    <Button
                        title="Remove from Tribe"
                        buttonStyle = {{backgroundColor: '#186aed', width: 120}}
                        onPress = {() => this.removeFriend()}
                        raised
                    />
                    :
                    <View>
                    {!(this.state.isRequestSent)
                        ? <Button
                            title= "Add to Tribe"
                            raised
                            buttonStyle = {{backgroundColor: '#186aed', width: 120}}
                            onPress = {() => this.addFriend()}
                            />
                        : <Text style = {{fontWeight: "bold", textAlign: "center", fontSize: 15, color: '#186aed', borderWidth: 1, padding:5, borderRadius: 5, borderColor: '#186aed'}}> Request Sent! </Text>
                    }
                    </View>
                    }
            </View>
        );
    }
}

FollowOrUnfollow.propTypes = {};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(null, mapDispatchToProps)(FollowOrUnfollow);

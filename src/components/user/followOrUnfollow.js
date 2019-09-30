import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import {View} from 'react-native'

class FollowOrUnfollow extends Component {
    constructor(props){
        super(props)
    }

    removeFriend() {
        this.props.removeFriendIDDB(this.props.friendID)

    }

    addFriend(){

    }



    render() {
        return (
            <View style = {{flex: 0.5, justifyContent: "flex-end", alignItems: "center"}}>
                {(this.props.followed)
                    ?
                    <Button
                        title="unfollow"
                        onPress = {() => this.removeFriend()}
                    />

                    :
                    <Button
                        title="follow"
                        onPress = {() => this.props.addFriend()}

                    />
                    }
            </View>
        );
    }
}

FollowOrUnfollow.propTypes = {};

export default FollowOrUnfollow;

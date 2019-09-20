import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import {View} from 'react-native'

class FollowOrUnfollow extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = {{flex: 0.5, justifyContent: "flex-end", alignItems: "center"}}>
                {(this.props.followed)
                    ? <Button title="unfollow" />
                    : <Button title="follow" />
                    }
            </View>
        );
    }
}

FollowOrUnfollow.propTypes = {};

export default FollowOrUnfollow;

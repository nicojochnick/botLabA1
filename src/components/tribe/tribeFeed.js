import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'

class TribeFeed extends Component {
    render() {
        return (
            <View>
                <TribeFeedHeader/>
                <TribeFeedBody/>
            </View>
        );
    }
}

TribeFeed.propTypes = {};

export default TribeFeed;

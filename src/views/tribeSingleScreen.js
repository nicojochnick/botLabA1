import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TribeComponent from '../components/tribe/tribe';
import {View} from 'react-native'


class TribeSingleScreen extends Component {
    render() {
        return (
            <View>
            <TribeComponent
            />
            </View>

        );
    }
}

TribeSingleScreen.propTypes = {};

export default TribeSingleScreen;

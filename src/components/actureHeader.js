import React, {Component} from 'react';
import {View, Text} from 'react-native'
import PropTypes from 'prop-types';

class ActureHeader extends Component {
    render() {
        return (
            <View style = {{height: 50, backgroundColor: "'#186aed'"}}>
                <Text style = {{textColor: "white", fontWeight: "bold"}}> Acture </Text>
            </View>
        );
    }
}

ActureHeader.propTypes = {};

export default ActureHeader;

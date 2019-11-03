import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {styles} from '../theme';


class StatBoard extends Component {
    render() {
        return (
            <View style = {[styles.card, {backgroundColor: "#0D7FFF"}]}>
                <Text style = {{color: "#DCECFF", margin: 10, fontWeight: "bold",fontSize: 20}}> stats </Text>

            </View>
        );
    }
}

StatBoard.propTypes = {};

export default StatBoard;

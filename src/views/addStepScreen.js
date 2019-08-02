import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import AddGoal from '../components/addStep';

class AddStepScreen extends Component {
    render() {
        return (
            <View style = {{marginTop: 100}}>
                <AddGoal/>

            </View>
        );
    }
}

AddStepScreen.propTypes = {};

export default AddStepScreen;

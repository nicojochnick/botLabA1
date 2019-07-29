import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import AddGoal from '../components/addGoal';

class CreateView extends Component {
    render() {
        return (
            <View style = {{marginTop: 100}}>
                <AddGoal/>

            </View>
        );
    }
}

CreateView.propTypes = {};

export default CreateView;

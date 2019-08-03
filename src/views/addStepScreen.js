import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import AddStep from '../components/addStep/addStepComponent';
import {styles} from "../components/theme";
import {Button} from 'react-native-elements';
import AddStepContainer from '../components/addStep/addStepContainer';

class AddStepScreen extends Component {
    render() {
        return (

            <AddStepContainer/>
        );
    }
}

AddStepScreen.propTypes = {};

export default AddStepScreen;

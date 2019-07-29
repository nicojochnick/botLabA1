import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Steps} from './steps'
import BotA1Component from './botA1Component';

class BotA1Top extends Component {
    constructor(props) {
        super(props);
        this.saveData = this.saveData.bind(this);
        this.state = {
            data: {},
            currentStep: false,
        }

    };

    saveData (data) {
        this.setState( { data: data})
    }

    findCurrentStep(){
        this.setState( {currentStep: Steps.makeaGoal })
    }

    render() {
        // this.findCurrentStep();
        return (
            <BotA1Component steps = {Steps.makeaGoal} />
        );
    }
}

BotA1Top.propTypes = {};

export default BotA1Top;

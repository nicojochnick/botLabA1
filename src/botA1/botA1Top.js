import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addGoal} from "../redux/actions";
import {Steps} from './steps'
import BotA1Component from './botA1Component';
import {connect} from 'react-redux';

class BotA1Top extends Component {
    constructor(props) {
        super(props);
        this.saveData = this.saveData.bind(this);
        this.addNameToGoal = this.addNameToGoal.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.state = {
            data: {},
            currentStep: this.currentStep(),
            steps: null
        }

    };

    handleEnd({ steps, values }) {


    }

    addNameToGoal(data){
        this.state.newGoal["name"] = data;
    }

    saveData (data) {
        this.setState( { data: data})
    }

    currentStep(){
        return Steps.makeaGoal
    }

    render() {
        this.currentStep();
        console.log(this.state.currentStep);
        // this.findCurrentStep();
        return (
            <BotA1Component steps = {this.state.currentStep} />
        );
    }
}
BotA1Top.propTypes = {};
export default connect()(BotA1Top)


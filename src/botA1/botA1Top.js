import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {storeRenderCount} from "../redux/actions";
import {Steps} from './steps'
import {View} from 'react-native'
import {Input} from 'react-native-elements'
import BotA1Component from './botA1Component';
import {connect} from 'react-redux';

let tick = 0;
class BotA1Top extends Component {
    constructor(props) {
        super(props);
        this.saveData = this.saveData.bind(this);
        this.addNameToGoal = this.addNameToGoal.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.state = {
            data: {},
            currentStep: this.getStep(),
            steps: null
        }

    };



    handleEnd({ steps, values }) {
        this.setState({currentStep: Steps.test});
        console.log(this.state.currentStep)

    }

    addNameToGoal(data){
        this.state.newGoal["name"] = data;
    }

    saveData (data) {
        this.setState( { data: data})
    }

    getStep(){
        if (this.props.count < 2) {
            this.props.dispatch(storeRenderCount());
            return Steps.introduction

        }
        else return Steps.mainMenu

    }



    render() {
        console.log(this.state.currentStep);
        // this.findCurrentStep();
        return (
            <View>

            <BotA1Component steps = {this.state.currentStep} handleEnd = {this.handleEnd}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.bot.count

});

BotA1Top.propTypes = {};
export default connect(mapStateToProps)(BotA1Top)


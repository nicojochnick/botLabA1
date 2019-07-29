import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Steps} from './steps';
import ChatBot from 'react-native-chatbot';
import moment from '../components/addGoal';

class BotA1Component extends Component {
    constructor(props) {
        super(props);
    }


    //Note: to create a goal with just user input, use a callback function which takes value data from steps and dispatches an action to the store.


    render() {
        console.log(this.props.steps.title);

        return (

            <ChatBot
                headerTitle="Speech Recognition"
                recognitionEnable={true}
                botBubbleColor = 'white'
                contentStyle={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
                style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'
                }}
                inputStyle={{backgroundColor: "white"}}
                submitButtonStyle={{backgroundColor: "white",}}
                submitButtonContent= {<Ionicons name = {'md-send'} color = "#6161F7" size = {24}/>}
                bubbleStyle={{fontColor: "grey"}}
                botFontColor= "black"
                hiderHeader = {false}
                optionBubbleColor = "#47C68C"
                optionFontColor={ "white"}
                steps={this.props.steps}
            />
        );
    }
}

BotA1Component.propTypes = {};

export default BotA1Component;

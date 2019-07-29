import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {introduction} from '../botA1/steps'


class BotA1FrontEnd extends Component {
    render() {
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
                steps={introduction}
            />


        );
    }
}

BotA1FrontEnd.propTypes = {};

export default BotA1FrontEnd;

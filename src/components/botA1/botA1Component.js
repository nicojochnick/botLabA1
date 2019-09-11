import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StepsBot} from './stepsBot';
import ChatBot from 'react-native-chatbot';
import moment from '../addStep/addStepComponent';

class BotA1Component extends Component {

    render() {
        console.log(this.props.steps);

        return (
            <ChatBot
                handleEnd={this.props.handleEnd}
                headerTitle="Speech Recognition"
                recognitionEnable={true}
                botBubbleColor = 'white'
                contentStyle={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
                style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
                inputStyle={{backgroundColor: "white"}}
                submitButtonStyle={{backgroundColor: "white",}}
                submitButtonContent= {<Ionicons name = {'md-send'} color = "#6161F7" size = {24}/>}
                bubbleStyle={{fontColor: "grey"}}
                botFontColor= "black"
                hiderHeader = {false}
                optionBubbleColor = '#2ECC71'
                optionFontColor={"white"}
                steps={this.props.steps}
                hideBotAvatar={false}
                hideUserAvatar={true}
            />
        );
    }
}

BotA1Component.propTypes = {};

export default BotA1Component;

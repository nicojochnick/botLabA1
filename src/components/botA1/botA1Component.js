import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StepsBot} from './stepsBot';
import ChatBot from 'react-native-chatbot';
import moment from './addStep/addStepComponent';

class BotA1Component extends Component {

    render() {
        console.log(this.props.steps);

        return (
            <ChatBot
                handleEnd={this.props.handleEnd}
                headerTitle="Speech Recognition"
                recognitionEnable={true}
                botBubbleColor = 'transparent'
                bubbleStyle = {{backgroundColor: "white", fontSize: 30}}
                contentStyle={{backgroundColor: 'transparent', border: 0, padding: 10}}
                style={{backgroundColor: 'transparent', border: 0, padding: 0}}
                inputStyle={{backgroundColor: "white"}}
                submitButtonStyle={{backgroundColor: "white",}}
                submitButtonContent= {<Ionicons name = {'md-send'} color = "#6161F7" size = {24}/>}
                botFontColor= "black"
                hiderHeader = {false}
                optionBubbleColor = 'transparent'
                optionFontColor={"white"}
                steps={this.props.steps}
                hideBotAvatar={false}
                hideUserAvatar={true}
                customStyle = {{backgroundColor: "transparent", borderWidth: 0, border: -30, padding: -40}}
            />
        );
    }
}

BotA1Component.propTypes = {};

export default BotA1Component;

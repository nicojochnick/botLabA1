import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';


class BotA1 extends Component {
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
                steps={[
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}, nice to meet you!',
                        end: true,
                    },
                ]}
            />


        );
    }
}

BotA1.propTypes = {};

export default BotA1;

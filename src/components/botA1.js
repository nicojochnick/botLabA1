import ChatBot from 'react-native-chatbot';

import React, {Component} from 'react';
import PropTypes from 'prop-types';


class BotA1 extends Component {
    render() {
        return (
            <ChatBot
                headerTitle="Speech Recognition"
                recognitionEnable={true}
                botBubbleColor = '#5D92FF'
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

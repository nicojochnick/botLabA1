import React from 'react'
import { GiftedChat, Day } from 'react-native-gifted-chat'
import { Bubble } from 'react-native-gifted-chat'

let sample= [
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
];


export class CoreChatComponent extends React.Component {
    renderBubble (props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'white',
                        padding: 3,
                        marginBottom: -10,
                        marginTop: -10


                    },
                    left: {
                        padding: 3,
                        marginBottom: -10,
                        marginTop: -10


                    }
                }}
                textStyle={{
                    right: {
                        margin: 5,
                        color: 'black',
                    },
                    left: {
                        margin: 5,

                }
                }}
            />
        )
    }

    renderDay(props) {
        return <Day {...props} textStyle={{color: 'transparent'}}/>
    }
    render() {
        return (
            <GiftedChat
                messages={this.props.messages}
                onSend={messages => this.props.onSend(null,messages)}
                locale = ""
                renderBubble={this.renderBubble}
                showUserAvatar={false}
                renderDay={this.renderDay}
                alignTop = {true}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}



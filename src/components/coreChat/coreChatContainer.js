import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CoreChatComponent} from './coreChatComponent';
import {GiftedChat} from 'react-native-gifted-chat';
import * as firebase from "react-native-firebase";
import {sendMessage} from '../../redux/actions';
import {connect} from 'react-redux';

let messagess = [
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

class CoreChatContainer extends Component {

    constructor(props){
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            coreUserID: this.props.coreUserID
        }
    }

    componentWillMount() {

    }

    sendMessage(userID, messages = []) {
        let set = this.props.messages;
        if (set === null ) {
            this.props.sendMessage(this.props.coreUserID, set)
        } else {
            set = GiftedChat.append(this.props.messages, messagess);
            this.props.sendMessage(this.props.coreUserID, set)
        }
    }

    render() {
        console.log(this.state.messages);
        return (
            <CoreChatComponent onSend = {this.sendMessage} messages = {this.props.messages} />
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (userID, messages) => dispatch(sendMessage(userID, messages)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreChatContainer);


CoreChatContainer.propTypes = {};

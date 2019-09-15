import React, {Component} from 'react';
import {Text} from 'react-native'
import PropTypes from 'prop-types';
import {changeName} from '../../../redux/actions';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null
        }
    }

    componentDidMount() {
        const { steps } = this.props;
        const name  = steps.input.value.toLocaleString();
        this.setState({name:name})
    }

    render() {
        console.log(this.state.name);
        return (
           <Text> Response </Text>
        );
    }
}

Chat.propTypes = {};

export default Chat;

import React, {Component} from 'react';
import {Text} from 'react-native'
import PropTypes from 'prop-types';
import {changeName} from '../../../redux/actions';
import * as firebase from "react-native-firebase";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            response: null,
        };
        this.ref = firebase.firestore().collection('users');
    }


    componentDidMount(): void {
        const { steps } = this.props;
        const name  = steps.input.value.toLocaleString();
        this.setState({name:name})
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        this.ref.where("messages", '==',this.props.userID).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ response: data, loading: false })
        });
    };

    render() {
        console.log(this.state.name);
        return (
           null
        );
    }
}

Chat.propTypes = {};

export default Chat;

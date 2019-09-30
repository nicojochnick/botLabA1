import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text} from 'react-native';
import firebase from "react-native-firebase";
import {Button, Avatar} from 'react-native-elements';

class AddComment extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {

        }
    }
    postComment(text, userID, tribeID){
        this.props.postComment(text)
    }
    render() {
        return (
            <View>
                <View style = {{flexDirection: "row", flex: 1, padding: 8, borderTopWidth: 0.2}}>
                    <Avatar
                        source ={{uri: this.user.photoURL}}
                        rounded/>
                    <View
                        style = {{flexDirection: "column"}}>
                        <Text style = {{fontWeight: "bold", marginLeft: 3, fontSize: 17, color: "black", textAlign: "left"}}> {this.user.displayName} </Text>
                        <View style = {{ flexDirection: "row", marginBottom: 8, borderRadius: 10, padding: 3, margin: 5, width: 300, borderWidth: 0.2, borderColor: "grey"}}>
                            <TextInput
                                style = {{color: "black", marginLeft: 3, marginTop: 3, fontSize: 17, width: 240}}
                                multiline = {true}
                                placeholder = 'type something....'
                            />
                            <Button
                                type = 'clear'
                                title = {'post'}
                                titleStyle = {{color: "lightblue", fontSize: 15}}
                                onPress = {(text)=> this.postComment(text)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

AddComment.propTypes = {};

export default AddComment;

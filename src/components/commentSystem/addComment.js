import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text} from 'react-native';
import firebase from '@react-native-firebase/app';
import {Button, Avatar} from 'react-native-elements';

class AddComment extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {
            comment: ''
        }
    }
    postComment(){
        let comment = this.state.comment;
        this.props.postComment(comment)
        this.setState({comment: ''})

    }



    render() {

        return (
            <View>
                <View style = {{flexDirection: "row",paddingTop: 12, borderColor: "#1452FF",flex: 1, paddingLeft: 4, borderTopWidth: 1}}>
                    <Avatar

                        source ={{uri: this.props.userPhoto}}
                        avatarStyle = {{ borderRadius: 100, borderWidth: 1, borderColor: "white"}}

                        rounded/>
                    <View
                        style = {{flexDirection: "column"}}>
                        <Text style = {{fontWeight: "bold", marginLeft: 3, fontSize: 17, color: "white", textAlign: "left"}}> {this.props.username}</Text>
                        <View style = {{ flexDirection: "row", marginBottom: 8, borderRadius: 10, padding: 3, margin: 5, width: 300, borderWidth: 1, borderColor: "white"}}>
                            <TextInput
                                style = {{color: "white", marginLeft: 3, marginTop: 3, fontSize: 17, width: 240, fontWeight: "bold"}}
                                multiline = {true}
                                placeholder = 'type something....'
                                value = {this.state.comment}
                                onChangeText = {(text) => this.setState({ comment: text})}
                            />
                            <Button
                                type = 'clear'
                                title = {'post'}
                                titleStyle = {{color: '#3676FF', fontSize: 15}}
                                onPress = {()=> this.postComment()}
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

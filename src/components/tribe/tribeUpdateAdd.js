import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TextInput} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import firebase from '@react-native-firebase/app';

class TribeUpdateAdd extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {

        }
    }
    postComment(text){
        this.props.postComment(text)
    }
    render() {
        return (
            <View>
                <View style = {{flexDirection: "row", flex: 1 }}>
                    {/*<Avatar*/}
                    {/*    source ={{uri: this.user.photoURL}}*/}
                    {/*    rounded/>*/}
                        <View
                            style = {{flexDirection: "column"}}>
                            {/*<Text style = {{fontWeight: "bold", marginLeft: 3, fontSize: 17, color: "black", textAlign: "left"}}> {this.user.displayName} </Text>*/}
                            <View style = {{ flexDirection: "row", marginBottom: 8, borderRadius: 10, padding: 3, margin: 5, width: 300, borderWidth: 0.2, borderColor: "grey"}}>
                                <TextInput
                                    style = {{color: "black", marginLeft: 3, marginTop: 3, fontSize: 17, width: 240}}
                                    multiline = {true}
                                    placeholder = 'post an update or ask for help....'
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

TribeUpdateAdd.propTypes = {};

export default TribeUpdateAdd;

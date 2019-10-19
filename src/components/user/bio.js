import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View} from 'react-native';
import {styles} from '../theme';
import {Button} from 'react-native-elements';
import firebase from '@react-native-firebase/app';

class Bio extends Component {

    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {
            name: this.user.displayName,
            profileURL: this.user.photoURL,
            editing: false

        }
    }

    activateEdit(text){
        this.setState({editing: true});
        this.setState({name: text});
    }

    doneSaving(){
        this.changeName(this.state.name);
        this.setState({editing: false});


    }

    changeName(text) {
        this.setState({name: text});
        this.user.updateProfile({
            displayName: text
        });
        let uid = this.user.uid;
        firebase.firestore().collection('users').where('fbID', '==', uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({"name": text})
            });
        });

        // this.props.dispatch(changeName(text));
    }
    render() {
        let uri = this.state.profileURL;
        let name = this.state.name;
        return (
            <View>
                <TextInput
                    style = {[styles.identityText, {marginBottom: 0, marginLeft: 0, textAlign: "left"}]}
                    placeholder = {"add name!"}
                    onChangeText={text =>this.activateEdit(text)}
                    value = {name}
                    selectionColor = "black"
                    multiline = {false}
                    maxLength = {20}
                    editable = {this.props.editable}
                />

                { (this.state.editing)
                    ?
                    <Button
                        style={{ alignContent: "center", marginTop: 5, marginRight: 0}}
                        title = "Save"
                        titleStyle = {{color: "black", fontWeight: "400"}}
                        buttonStyle={{backgroundColor: "lightgrey"}}
                        onPress = {()=> this.doneSaving()}

                    />
                    :null
                }
            </View>
        );
    }
}

Bio.propTypes = {};

export default Bio;

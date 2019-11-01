import React from 'react'
import {Image, StyleSheet, Text, TextInput, View, KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements'
import { firebase } from '@react-native-firebase/auth';

import moment from 'moment'


export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null };


    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( function(user) {

                user = firebase.auth().currentUser;
                let fbID = user.uid;
                let email = user.email;
                let userID = moment().format();
                let account = {
                     userID: userID,
                     fbID: fbID,
                    friendIDs: [],
                    groupIDs: [],
                     email: email,
                     name: null,
                     messages: null,
                    photoURL: 'https://api.adorable.io/avatars/' + moment().format()
                };

                firebase.firestore().collection('users').doc(userID).set(account);
                this.props.navigation.navigate('App')

                }
            )
            .catch(error => this.setState({ errorMessage: error.message }))
    };


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Image style={{width: 150, height: 150, borderRadius: 100, borderColor: "white", borderWidth: 2}}
                       source={require('./mllogo2-01.png')} />
                <Text style = {{fontSize:20, margin: 10, fontWeight: "bold", color: "white"}}>Welcome to MonsterList</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <Input
                    placeholder="Email"
                    autoCapitalize="none"
                    containerStyle={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    inputContainerStyle = {{borderColor: "white"}}
                    inputStyle = {{color: "white"}}
                />
                <Input
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    containerStyle={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    inputContainerStyle = {{borderColor: "white"}}
                    inputStyle = {{color: "white"}}

                />
                <Button
                    containerStyle = {{margin: 10}}
                    buttonStyle = {{backgroundColor: "white"}}
                    titleStyle = {{color:'#186aed'}}
                    raised = {true}
                    title="Sign Up"
                    onPress={this.handleSignUp} />
                <Button
                    containerStyle = {{margin: 10}}
                    titleStyle = {{color:'white'}}
                    type = "clear"
                    raised = {false}
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#186aed'
    },
    textInput: {
        color: "white",
        height: 40,
        width: '90%',
        margin: 20
    }
});

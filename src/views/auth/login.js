import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView} from 'react-native'
import {Button, Input} from 'react-native-elements'

import auth from '@react-native-firebase/auth';



export default class Login extends React.Component {


    static navigationOptions = {
        header: null
    };

    state = { email: '', password: '', errorMessage: null };
    handleLogin = () => {
        auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            console.log(errorMessage)
        });
        console.log('handleLogin');

    };
    render() {
        return (
            < KeyboardAvoidingView style={styles.container}>
                <Image style={{width: 150, height: 150, borderRadius: 100, borderColor: "white", borderWidth: 2}}
                       source={require('./mllogo2-01.png')} />
                <Text style = {{fontSize:20, margin: 10, fontWeight: "bold", color: "white"}}>Login</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <Input
                    containerStyle={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    inputContainerStyle = {{borderColor: "white"}}
                    inputStyle = {{color: "white"}}
                />
                <Input
                    secureTextEntry
                    containerStyle={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
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
                    title="Login"
                    onPress={this.handleLogin} />
                <Button
                    containerStyle = {{margin: 10}}
                    titleStyle = {{color:'white'}}
                    type = "clear"
                    raised = {false}
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
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


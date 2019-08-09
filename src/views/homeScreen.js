import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native'
import {Card, Button} from 'react-native-elements'
import BotA1Top from '../components/botA1/botA1Top';
import StepRoot from '../components/step/stepRoot';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Identity from '../components/user/identity';

class HomeScreen extends Component {
    render() {
        return (
            <ScrollView>
                    <View style = {{flex: 1, flexDirection: "row",paddingTop: 30, paddingBottom: 10,alignItems: "center", backgroundColor: '#CFCFCF'}}>
                        <Identity/>
                        <Button
                            icon = {<Ionicons style = {{marginRight: 10,}}
                                      name = {'ios-add'}
                                      color = "white"
                                      disabledStyle = {{color:"grey"}}
                                      size = {60}
                                      onPress = {() => this.props.navigation.navigate('Add')}/> }
                            type = "clear"
                            onPress = {() => this.props.navigation.navigate('Add')}

                        />
                    </View>
                        <StepRoot/>
            </ScrollView>
        );
    }
}

HomeScreen.propTypes = {};

export default HomeScreen;

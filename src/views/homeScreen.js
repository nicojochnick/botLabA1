import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native'
import {Card, Button} from 'react-native-elements'
import BotA1Top from '../botA1/botA1Top';
import StepBoard from '../components/step/stepRoot';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Identity from '../components/identity';

class HomeScreen extends Component {
    render() {
        return (
            <ScrollView>
                <LinearGradient style={{flex: 0.8}} colors={['#3676FF','#5530EC', '#6930EC', '#7730EC']}>
                <View style = {{height: 400}}>
                    <View style = {{flex: 0.3, flexDirection: "row", justifyContent: "space-between", marginTop: 20,alignItems: "center"}}>
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
                    <View style = {{flex: 0.7}}>
                            <BotA1Top/>
                    </View>
                </View>
                </LinearGradient>
                <ScrollView style ={{flex: 1}}>
                    <StepBoard/>
                </ScrollView>
            </ScrollView>
        );
    }
}

HomeScreen.propTypes = {};

export default HomeScreen;

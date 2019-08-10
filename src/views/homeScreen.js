import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native'
import {Card, Button} from 'react-native-elements'
import BotA1Top from '../components/botA1/botA1Top';
import StepRoot from '../components/step/stepRoot';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Identity from '../components/user/identity';
import AddTribe from '../components/tribe/addTribe';
import TribeComponent from '../components/tribe/tribe';
import TribeRoot from '../components/tribe/tribeRoot';

class HomeScreen extends Component {
    render() {
        return (
            <ScrollView>
                    <View style = {{flex: 1, flexDirection: "row",paddingTop: 30, paddingBottom: 10,alignItems: "center", backgroundColor: '#CFCFCF'}}>
                        <Identity size = {"large"}/>
                        <AddTribe/>
                    </View>
                        <TribeRoot/>
            </ScrollView>
        );
    }
}

HomeScreen.propTypes = {};


export default HomeScreen;

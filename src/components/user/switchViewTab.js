import React, {Component} from 'react';
import {View, Text} from 'react-native'
import { Button } from 'react-native-elements';
import SwitchViewButton from './switchViewButton';


class SwitchViewTab extends Component {
    render() {
        return (
            <View style = {{flexDirection: 'row', flex: 0.6, justifyContent: "center"}}>
                <SwitchViewButton switchView = {this.props.switchView} color = {this.props.goalColor} text = {'boards'}/>
                <SwitchViewButton switchView = {this.props.switchView} color = {this.props.tribeColor} text = {'contacts'}/>
            </View>
        );
    }
}

export default SwitchViewTab;

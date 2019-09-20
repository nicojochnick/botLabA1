import React, {Component} from 'react';
import { Button } from 'react-native-elements';
import {View, Text} from 'react-native'
import PropTypes from 'prop-types';

class SwitchViewButton extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style = {{ flex: 0.5, justifyContent: "center", alignItems: "center", alignContent: "center",}}>
                <Button
                title = {this.props.text}
                titleStyle = {{fontWeight: "bold", margin: 0, marginLeft: 5, fontSize: 20, color: this.props.color}}
                type = 'clear'
                onPress = {() => this.props.switchView()}
                />
            </View>

        );
    }
}

SwitchViewButton.propTypes = {};

export default SwitchViewButton;

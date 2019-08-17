import React, {Component} from 'react';
import {View} from 'react-native'
import {Button} from 'react-native-elements'
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


class NavSettings extends Component {

    handleNavSettings(){

    }
    render() {
        return (
            <View>
                <Button
                    icon = {<Icon style = {{marginRight: 10}}
                                      name = {'ellipsis-v'}
                                      color = "white"
                                      disabledStyle = {{color:"grey"}}
                                      size = {30}
                                      onPress = {() => this.handleNavSettings()}/> }
                    type = "clear"
                    onPress = {() => this.handleNavSettings()}

                />

            </View>
        );
    }
}

NavSettings.propTypes = {};

export default NavSettings;

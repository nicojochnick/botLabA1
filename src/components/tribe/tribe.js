import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native'
import {Button} from 'react-native-elements'
import {styles} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepBox from '../box/box';


class TribeComponent extends Component {
    render() {
        console.log(this.props.id);
        return (
            <View style = {styles.goals}>
                <View style = {styles.topGoals}>
                        <TextInput
                            style = {styles.goalText}
                            ref= {(el) => { this.name= el; }}
                            value = {"name"}
                            multiline = {true}
                        />
                        <View style = {{flexDirection: "row"}}>
                            <Button
                                icon =
                                    {<Ionicons style = {{marginLeft: 10,}}
                                                  name = {'ios-add'}
                                                  color = "black"
                                                  disabledStyle = {{color:"grey"}}
                                                  size = {30}
                                                  />
                                }
                                type = "clear"
                                iconRight = {true}

                            />

                            <Button
                                icon = {
                                    <Icon
                                        name= 'eye'
                                        color = '#3676FF'
                                        size = {20}
                                    />
                                }
                                containerStyle = {{marginLeft: 10}}
                                title={ ""}
                                type="clear"
                            />


                        </View>

                    </View>

                    <View>
                        <StepBox
                            tribeID = {this.props.id}
                        />
                    </View>

            </View>
        );
    }
}

export default TribeComponent;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import {Avatar, Button} from 'react-native-elements';
import StepRoot from '../step/stepRoot';
import {addChildStep, addStep} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from "moment"
import {styles} from "../theme";
import Identity from '../user/identity';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



class Box extends Component {

    render() {
        console.log(this.props.tribeID);
        return (
            <View style={styles.goals}>
                    { (false)
                        ? null
                        : <View style = {{flexDirection: "row"}} >
                            <Button
                                icon={
                                    <Icon
                                        name='times'
                                        color='black'
                                        size={15}
                                        onPress={() => this.props.handleDeleteBox(this.props.id)}

                                    />
                                }
                                containerStyle={{}}
                                title={""}
                                type="clear"
                                onPress={() => this.props.handleDeleteBox(this.props.id)}
                            />
                            < Button
                            icon = {<Icon style = {{marginRight: 5}}
                            name = 'plus'
                            color = "black"
                            disabledStyle = {{color: "grey"}}
                            size = {15}
                            onPress = {() => this.props.handleAddStep(this.props.id)}/>}
                            type = "clear"
                            onPress = {() => this.props.handleAddStep(this.props.id)}
                            />
                        </View>
                    }
                <StepRoot
                    tribeID = {this.props.tribeID}
                    handleAddStep = {this.props.handleAddStep}
                    handleSwitch = {this.props.handleSwitch}
                    editing = {this.props.editing}
                    steps = {this.props.steps}
                />
            </View>
        );
    }
}

Box.propTypes = {};

export default connect()(Box);


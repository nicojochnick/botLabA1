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

    handleAddStep(tribeID, boxID) {
        const genericStep = {
            name: "add a title",
            data: [0],
            done: false,
            date: moment().format('dddd, MMMM Do'),
            id: moment().format(),
            open: false,
            root: false,
            steps: [],
            deadline:"",
            userID: "",
            boxId: boxID,
            tribeID: tribeID,
            info: "add a description"
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addStep(genericStep));
    }

    render() {
        console.log(this.props.tribeID);
        return (
            <View style={styles.goals}>
                    { (!this.props.editing)
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
                            onPress = {() => this.handleAddStep(this.props.tribeID)}/>}
                            type = "clear"
                            onPress = {() => this.handleAddStep(this.props.tribeID)}
                            />
                        </View>
                    }
                <StepRoot

                    tribeID = {this.props.tribeID}
                    handleAddStep = {this.props.handleAddStep}
                    handleDeleteStep = {this.props.handleDeleteStep}
                    changeStepName = {this.props.changeStepName}
                    changeStepInfo = {this.props.changeStepInfo}
                    handleCheck = {this.props.handleCheck}
                    checkCheck = {this.props.checkCheck}
                    handleSwitch = {this.props.handleSwitch}
                    editing = {this.props.editing}
                />
            </View>
        );
    }
}

Box.propTypes = {};

export default connect()(Box);


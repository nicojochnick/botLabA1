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

    handleAddStep(tribeID) {
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
                <View style = {{flexDirection: "row"}}>
                    <Identity size = "small"/>
                    <Button
                        icon = {<Ionicons style = {{marginRight: 5}}
                                          name = {'ios-add'}
                                          color = "black"
                                          disabledStyle = {{color:"grey"}}
                                          size = {20}
                                          onPress = {() => this.handleAddStep(this.props.tribeID)}/> }
                        type = "clear"
                        onPress = {() => this.handleAddStep(this.props.tribeID)}
                        />

                    <Button
                        icon = {
                            <Icon
                                name= 'eye'
                                color = '#3676FF'
                                size = {20}
                            />
                        }
                        containerStyle = {{}}
                        title={ ""}
                        type="clear"
                    />
                </View>
                <StepRoot
                    tribeID = {this.props.tribeID}
                />
            </View>
        );
    }
}

Box.propTypes = {};

export default connect()(Box);


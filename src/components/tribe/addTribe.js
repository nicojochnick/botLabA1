import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {addTribe} from '../../redux/actions';
import moment from "moment";

class AddTribe extends Component {

    handleAddTribe() {
        const genericTribe = {
            name: "add a title",
            id: moment().format(),
            userIDs: [],
            open: false,
            info: "add a description"
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addTribe(genericTribe));
    }
    render() {
        return (
            <Button
                icon = {<Ionicons style = {{marginRight: 10,}}
                                  name = {'ios-add'}
                                  color = "white"
                                  disabledStyle = {{color:"grey"}}
                                  size = {60}
                                  onPress = {() => this.handleAddTribe()}/> }
                type = "clear"
                onPress = {() => this.handleAddTribe()}

            />
        );
    }
}

AddTribe.propTypes = {};

export default connect()(AddTribe);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import AddStep from '../components/botA1/addStep/addStepComponent';
import {styles} from "../components/theme";
import {Button} from 'react-native-elements';
import AddStepContainer from '../components/botA1/addStep/addStepContainer';
import Step from '../components/step/step';

class AddStepScreen extends Component {
    render() {

        return (
            < FlatList style = {styles.bottomContainer}
                       data = {this.props.steps}
                       renderItem={({item}) => (
                           <AddStepContainer
                               name = {item.name}
                               id = {item.id}
                               description = {item.description}
                               children = {item.children}
                               root = {item.root}
                               open = {item.open}
                               steps = {item.steps}
                               date = {item.date}
                               done = {item.done}
                           />
                       )}
            />
        );
    }
}

AddStepScreen.propTypes = {};

export default AddStepScreen;

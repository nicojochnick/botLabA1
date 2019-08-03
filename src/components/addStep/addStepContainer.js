import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddStep from './addStepComponent';
import {View} from 'react-native';
import {Button} from 'react-native-elements';

class AddStepContainer extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style = {{marginTop: 90,}}>
                <AddStep/>
                <View style = {{backgroundColor: '#3676FF', alignItems: "center"}}>
                    <Button
                        // TODO Clear props when pressed
                        title = "Save"
                        type = "solid"
                        titleStyle = {{color: '#3676FF'}}
                        buttonStyle = {{backgroundColor: 'white'}}
                        containerStyle = {{width: 100, margin: 10, alignItems: "center"}}
                        raised = {true}
                        onPress={ () => this.Save(this.state.newStep)}
                    />

                </View>

            </View>
        );
    }
}

AddStepContainer.propTypes = {};

export default AddStepContainer;

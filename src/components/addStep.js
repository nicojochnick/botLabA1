import React, {Component} from 'react';
import {styles} from "./theme";
import {CheckBox, Input, Text} from "react-native-elements";
import {Button, ScrollView, View} from "react-native";
import { addStep} from '../redux/actions';
import {connect} from "react-redux";
import moment from "moment";


//NOTE: You need to split this component => the form and adding goal functionality should be separate!!!!!!

class AddStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStep : {
                name: " ",
                days: [],
                data: [0],
                done: false,
                date:  moment().format('dddd, MMMM Do'),
                id:  0,
                open: false,
                steps: [],
                root: false,
            },
        };
        this.baseState = this.state
    }


    //TODO: Use a real ID creator here in production version.

    resetForm = () => {
        this.setState(this.baseState);
    };

    addNameToGoal(data){
        this.state.newStep["name"] = data;
    }

    addID(){
        this.state.newStep['id'] = moment().format();

    }

    Save(step){
        this.resetForm();
        this.addID();
        this.props.dispatch(addStep(step));
        this.forceUpdate();
        this.state.newStep.days = [];
    }


    render() {
        return (
            <ScrollView style = {{}}>
                <Input style = {styles.input}
                       placeholder='Name'
                       shake={true}
                       onChangeText={(text) => this.addNameToGoal(text)}
                       />
                <Button
                    // TODO Clear props when pressed
                    title = "Save"
                    onPress={ () => this.Save(this.state.newStep)}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
    goals: state.goals
});


export default connect(mapStateToProps)(AddStep)

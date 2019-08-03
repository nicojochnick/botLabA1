

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import moment from "moment";
import { addStep} from '../../redux/actions';
import {connect} from 'react-redux';

class AddStepBot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGoal : {
                name: "",
                data: [0],
                done: false,
                date:  moment().format('dddd, MMMM Do'),
                id:  0,
                open: false,
                root: false,
                steps: false,
            },
        };
    }
    //State is not being updated properly AT ALL
    componentDidMount() {
        const { steps } = this.props;
        const title  = steps.title.value.toLocaleString();
        console.log(title);
        this.state.newGoal["name"] = title;
        this.state.newGoal['id'] = moment().format();
        console.log(this.state.newGoal);
        this.Save()
    }

    addNameToGoal(){
        this.state.newGoal["name"] = this.props.title.value;
    }
    addID(){
        this.state.newGoal['id'] = moment().format();
    }
    reset = () => {
        this.setState(this.baseState);
    };

    Save(){
        this.reset();
        this.props.dispatch(addStep(this.state.newGoal));
        this.forceUpdate();


    }

    render() {
        return(
            <Text>  Next, </Text>
        )
    }
}

AddStepBot.propTypes = {};


export default connect()(AddStepBot)










import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import moment from "moment";
import {addGoal} from '../redux/actions';
import {connect} from 'react-redux';

class BotFunctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGoal : {
                name: "",
                days: [],
                data: [0],
                priority: 3,
                done: false,
                points: 0,
                date:  moment().format('dddd, MMMM Do'),
                id:  0
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
        this.props.dispatch(addGoal(this.state.newGoal));
        this.forceUpdate();


    }

    render() {
        return(
            <Text>  Next, </Text>
        )
    }
}

BotFunctions.propTypes = {};


export default connect()(BotFunctions)








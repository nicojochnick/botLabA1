import React, {Component} from 'react';
import {Text} from 'react-native'
import {connect} from 'react-redux';
import {changeName} from '../../redux/actions';

import PropTypes from 'prop-types';
import moment from './addGoalBot';


class EditName extends Component {


    componentDidMount() {
        const { steps } = this.props;
        const name  = steps.name.value.toLocaleString();
        this.props.dispatch(changeName(name))
    }


    render() {
        return(
        <Text>Cool name!</Text>
    )
    }

}

EditName.propTypes = {};

export default connect()(EditName)




import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import ReportMainChart from './reportMainChart'


class ReportMain extends Component {
    render() {
        return (
            <View style = {{backgroundColor: "transparent", border: -20}}>
                <ReportMainChart/>
            </View>
        );
    }
}

ReportMain.propTypes = {};

export default ReportMain;

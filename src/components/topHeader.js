import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'
import NavSettings from './navSettings';
import AddTribe from './tribe/addTribe';

class TopHeader extends Component {
    render() {
        return (
            <View>
                <NavSettings/>
                <AddTribe/>
            </View>
        );
    }
}

TopHeader.propTypes = {};
export default TopHeader;

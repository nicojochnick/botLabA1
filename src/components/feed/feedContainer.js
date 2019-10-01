import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';

// Basic IDEA: fetch all tribes by my id and friend id that have a timestamp in posted field, sort by most recent time first
class FeedContainer extends Component {

    render() {
        return (
           <TribeRoot/>
        );
    }
}

FeedContainer.propTypes = {};

export default FeedContainer;

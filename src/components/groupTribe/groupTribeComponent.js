import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements';

class GroupTribeComponent extends Component {
    render() {
        return (
                <ListItem
                    leftAvatar={{ source: { uri: this.props.tribePhoto}}}
                    title={this.props.tribeName}
                    subtitle={this.props.tribeMembers}
                    bottomDivider
                    onPress = {()=>this.props.navigate()}
                />
        );
    }
}

GroupTribeComponent.propTypes = {};

export default GroupTribeComponent;

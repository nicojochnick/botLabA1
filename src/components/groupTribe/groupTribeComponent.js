import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements';

class GroupTribeComponent extends Component {
    render() {
        return (
                <ListItem
                    containerStyle = {{ backgroundColor: "#2E3134"}}
                    title={this.props.tribeName}
                    subtitle={this.props.tribeMembers.length + ' member(s)'}
                    bottomDivider
                    titleStyle = {{color: "white"}}
                    subtitleStyle = {{color: 'lightgrey'}}
                    onPress = {()=>this.props.navigate()}
                />
        );
    }
}

GroupTribeComponent.propTypes = {};

export default GroupTribeComponent;

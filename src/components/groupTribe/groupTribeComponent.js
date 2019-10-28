import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class GroupTribeComponent extends Component {
    render() {
        return (
                <ListItem
                    containerStyle = {{ backgroundColor: "#2E3134"}}
                    title={this.props.tribeName}
                    subtitle={this.props.tribeMembers.length + ' member(s)'}
                    bottomDivider
                    titleStyle = {{color: "white", fontWeight: "bold", }}
                    subtitleStyle = {{color: 'lightgrey'}}
                    rightIcon = {
                        <Ionicons
                            name={'ios-close'}
                            style={{color: 'white'}}
                            size={22}
                            onPress={() => this.props.removeGroup()}
                        />

                    }

                    onPress = {()=>this.props.navigate(this.props.id, this.props.tribeName)}
                />
        );
    }
}

GroupTribeComponent.propTypes = {};

export default GroupTribeComponent;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/index';
import {ListItem, Button} from 'react-native-elements';

class UserTag extends Component {
    constructor(props){
        super(props )
    }


    render() {
        return (
            <ListItem
                style = {{borderWidth: 1, borderRadius: 5, borderColor:"grey", margin: 10,padding: 2}}
                titleStyle = {{fontWeight: "500"}}
                title={this.props.name}
                leftAvatar = {{source: {uri: this.props.avatar}}}
                rightElement = {
                    <Button/>
                }
            />
        );
    }
}

UserTag.propTypes = {};

export default UserTag;

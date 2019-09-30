import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput} from 'react-native'
import {Avatar, Button, Divider} from 'react-native-elements';

class CommentComponent extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style = {{flexDirection: "row", flex: 1, borderWidth: 0, borderTopWidth: 0.2, padding: 8}}>
                <Avatar
                    source ={{uri: this.props.userphoto}}
                    rounded/>
                    <View
                    style = {{flexDirection: "column"}}>
                        <Text style = {{fontWeight: "bold", marginLeft: 3, fontSize: 17, color: "black", textAlign: "left"}}>
                            {this.props.username}
                        </Text>
                    <View style = {{ flexDirection: "row", marginBottom: 8, borderRadius: 10, padding: 3, margin: 5, width: 300,}}>
                        <Text
                            style = {{color: "black", marginLeft: 3, marginTop: 3, fontSize: 17, width: 240}}
                            multiline = {true}>
                            {this.props.message}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

CommentComponent.propTypes = {};

export default CommentComponent;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput} from 'react-native'
import {Avatar, Button, Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ConfirmDialog} from 'react-native-simple-dialogs';

class CommentComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    openDeleteConfirm(show){
        this.setState({ showDeleteConfirm: show });
    }

    optionYes = () => {
        this.openDeleteConfirm(false);
        setTimeout(
            () => {this.props.deleteComment();
            },
            300,
        );
    };

    optionNo = () => {
        this.openDeleteConfirm(false);
        setTimeout(
            () => {
            },
            300,
        );
    };

    render() {
        console.log(this.props.username);
        return (
            <View style = {{flexDirection: "row", flex: 1, borderWidth: 0, borderTopWidth: 0.2, padding: 5}}>
                <Avatar
                    source ={{uri: this.props.userPhoto}}
                    size = {'smll'}
                    rounded/>
                    <View
                    style = {{flexDirection: "column"}}>
                        <Text style = {{fontWeight: "bold", marginLeft: 10, fontSize: 17, color: "black", textAlign: "left"}}>
                            {this.props.username}
                        </Text>
                    <View style = {{ flexDirection: "row", justifyContent: "space-between", marginBottom: 0, borderRadius: 10, padding: 1, marginLeft: 5, width: 300,}}>
                        <Text
                            style = {{color: "black", marginLeft: 3, marginTop: 0, fontSize: 17, width: 240}}
                            multiline = {true}>
                            {this.props.message}
                        </Text>
                        <View style = {{flexDirection: "column", }}>
                            {this.props.showDelete
                             ? < Ionicons
                                onPress = {()=> this.openDeleteConfirm(true)}
                                name="ios-close-circle-outline"
                                />
                                : null
                            }
                        </View>
                    </View>
                </View>
                <ConfirmDialog
                    title="Please Confirm"
                    message="Are you sure you want to delete your comment?"
                    onTouchOutside={ () => this.openDeleteConfirm(false) }
                    visible={this.state.showDeleteConfirm }
                    negativeButton={{
                        title: "No",
                        onPress: this.optionNo,
                        // disabled: true,
                        titleStyle: {
                            color: "blue",
                            colorDisabled: "aqua",},
                        style: {
                            backgroundColor: "transparent",
                            backgroundColorDisabled: "transparent",},}}
                    positiveButton={
                        {
                            title: "Yes",
                            onPress: this.optionYes,
                        }}/>
            </View>
        );
    }
}

CommentComponent.propTypes = {};

export default CommentComponent;

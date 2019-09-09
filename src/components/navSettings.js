import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements'
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import firebase from 'react-native-firebase';
import {ConfirmDialog} from 'react-native-simple-dialogs';



class NavSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showSignOutConfirm: false,

        }
    }


    signOut(){
        firebase.auth().signOut().then(function() {
            firebase.auth().currentUser = null;
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });

    };


    makeEditable(bool){
        this.setState({editing: bool})
    }

    openSignOutConfirm(show){
        this.setState({ showSignOutConfirm: show});
    }

    Yes = () => {
        this.openSignOutConfirm(false);

        setTimeout(
            () => {this.signOut();
            },
            300,
        );
    };

    No = () => {
        console.log("no pressed!");
        this.openSignOutConfirm(false);
        setTimeout(
            () => {
            },
            300,
        );
    };



    render() {
        return (
            <View>

                <Menu>
                    <MenuTrigger>
                        <Icon style = {{margin: 20}}
                              name = {'ellipsis-v'}
                              color = "white"
                              disabledStyle = {{color:"grey"}}
                              size = {35}/>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => this.makeEditable(true)} text='Edit' />
                        <MenuOption onSelect={() => this.openSignOutConfirm(true)} >
                            <Text style={{color: 'red'}}>Sign Out</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>

                <ConfirmDialog
                    title="Please Confirm"
                    message="Are you sure you want to sign out?"
                    onTouchOutside={ () => this.openSignOutConfirm(false) }
                    visible={this.state.showSignOutConfirm}
                    negativeButton={
                        {
                            title: "No",
                            onPress: this.No,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "Yes",
                            onPress: this.Yes,
                        }
                    }
                />

            </View>
        );
    }
}

NavSettings.propTypes = {};

export default NavSettings;

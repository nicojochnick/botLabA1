import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {Avatar, Button, Input} from 'react-native-elements';
import {styles} from '../theme';
import firebase from "react-native-firebase";


class TribeHeader extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;

    }

    render() {
        let message = '';
        if (this.props.header === undefined){
            message = "nothing"
        } else {
            message = this.props.header.message
        }

        // let share= false;
        // if (this.props.header !== undefined){
        //     share = this.prop.header.isPosted
        // }

        return (
            <View style = {[{height: 80, backgroundColor: '#186aed', paddingBottom: 15, padding: 10}, styles.tribesHeader]}>
                <View style = {{margin: 10, marginTop: 10, flexDirection: "row", flex: 1}}>
                    <View style = {{flexDirection: "row", flex: 0.8}}>
                        <Avatar
                            source ={{uri: this.props.tribeAuthorProfilePicture}}
                            rounded/>
                        <View style = {{flexDirection: "column"}}>
                            <Text style = {{fontWeight: "bold", marginLeft: 3, fontSize: 17, color: "white", textAlign: "left"}}> {this.props.tribeAuthorName} </Text>
                            <Text style = {{color: "white", marginLeft: 3, marginTop: 3, fontSize: 17}}>{message}</Text>
                        </View>
                    </View>
                    <View style ={{flexDirection: "row", flex: 0.2}}>
                        {!(this.props.canEdit)
                            ? null
                            : <Button
                                title = {"Share"}
                                raised
                                containerStyle = {{height:40}}
                                buttonStyle = {{backgroundColor: "white"}}
                                titleStyle = {{color: '#186aed', fontWeight: "bold"}}
                                onPress = {() => this.props.shareTribe(this.props.tribeID)}
                                />
                        }
                    </View>

                </View>
            </View>
        );
    }
}

export default TribeHeader;

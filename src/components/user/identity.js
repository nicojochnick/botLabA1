import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native'
import { Avatar } from 'react-native-elements';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {addProfileImage, changeName, changeStepName} from '../../redux/actions';
import {styles} from '../theme';


class Identity extends Component {

    state = {name: null};

   options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    openImage(options) {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     avatarSource: source,
                // });


                this.props.dispatch(addProfileImage(source))
            }
        })
    }

    changeName(text) {
        this.props.dispatch(changeName(text));
    }

    render() {
        console.log(this.props.botID);

        return (
            <View style = {{flexDirection: "row", alignContent: "center", paddingTop: 10}}>
                <Avatar
                    rounded = {true}
                    containerStyle = {{marginLeft: 10, borderWidth: 2, borderColor: "white"}}
                    size= {this.props.size}
                    source = {{uri:this.props.botID.profileImage.uri }}
                    onPress = {() => this.openImage(this.options)}
                />
                <TextInput
                    style = {styles.identityText}
                    onChangeText={text => this.changeName(text)}
                    value = {this.props.botID.name}
                    selectionColor = "blue"
                    maxLength = {20}
                    editable = {this.props.editable}
                />

            </View>
        );
    }
}

Identity.propTypes = {};

const mapStateToProps = (state) => ({
    botID: state.bot
});



export default connect(mapStateToProps)(Identity);


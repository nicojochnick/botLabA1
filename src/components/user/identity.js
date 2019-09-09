import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native'
import { Avatar } from 'react-native-elements';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {addProfileImage, changeName, changeStepName} from '../../redux/actions';
import {styles} from '../theme';
import firebase from 'react-native-firebase';




class Identity extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {
            name: this.user.displayName,
            profileURL: this.user.photoURL,

        }
    }


   options = {
        title: 'Select Avatar',

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
                const source = response.uri;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

               this.setState({profileURL: source});
                this.user.updateProfile({
                    photoURL: source
                })

                let uid = this.user.uid;
                firebase.firestore().collection('users').where('fbID', '==', uid).get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.update({"photoURL":source})
                    });
                });

            }
        })
    }

    changeName(text) {
        this.setState({name: text});
        this.user.updateProfile({
            displayName: text
        });
        let uid = this.user.uid;
        firebase.firestore().collection('users').where('fbID', '==', uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({"name": text})
            });
        });

        // this.props.dispatch(changeName(text));
    }

    onComponenetDidMount(){
        //add listener snapshot of correct user object
        firebase.firestore().collection('users').onSnapshot(this.onCollectionUpdate)

    }

    render() {

        console.log(this.props.botID);
        let uri = this.state.profileURL;
        let name = this.state.name;

        return (
            <View style = {{flexDirection: "row", alignContent: "center", paddingTop: 10, marginBottom: -10}}>
                <Avatar
                    rounded = {true}
                    containerStyle = {{marginLeft: 10, marginBottom: -50, borderWidth: 2, borderColor: "white"}}
                    size= {this.props.size}
                    source = {{uri: uri}}
                    onPress = {() => this.openImage(this.options)}
                />
                <TextInput
                    style = {[styles.identityText, {marginBottom: -15}]}
                    placeholder = {"add name!"}
                    onChangeText={text => this.changeName(text)}
                    value = {name}
                    selectionColor = "white"
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


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native'
import {Avatar, Button} from 'react-native-elements';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {addProfileImage, changeName, changeStepName} from '../../redux/actions';
import {styles} from '../theme';
import firebase from '@react-native-firebase/app';
import moment from 'moment';



class Identity extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {
            name: null,
            profileURL: null,
            editing: false

        }
    }

    activateEdit(text){
        this.setState({editing: true});
        this.setState({name: text});
    }

    doneSaving(){
        this.changeName(this.state.name);
        this.setState({editing: false});

    }


   options = {
        title: 'Select Avatar',

        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    openImage(options) {
        if (this.props.notMe){
            console.log("cant edit a profile that isnt ur own")
        } else {
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
                    });

                    let uid = this.user.uid;
                    firebase.firestore().collection('users').where('fbID', '==', uid).get().then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            doc.ref.update({"photoURL": source})
                        });
                    });

                }
            })
        }
    }

    async changeName(text) {
        this.setState({name: text});
        this.user.updateProfile({
            displayName: text
        });
        let uid = this.user.uid;
        await firebase.firestore().collection('users').where('fbID', '==', uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({"name": text})
            });
        });

        // this.props.dispatch(changeName(text));
    }

    // componentDidMount(): void {
    //     this.setState({name: this.props.name})
    // }

    changeAvatar(){
        let source = 'https://api.adorable.io/avatars/' + moment().format();
        let uid = this.user.uid;
        firebase.firestore().collection('users').where('fbID', '==', uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({"photoURL": source})
            });
        });
    }

    render() {
        console.log(this.props.botID);
        let name = this.props.name
        if (this.state.editing){
            name = this.state.name
        }

        return (
            <View style = {{marginLeft: 0, flex: 1}}>
            <View style = {{ flex: 1,  marginTop: 15, flexDirection: "row", justifyContent: "flex-start", alignContent: "center", paddingTop: 5, marginBottom: 5, marginLeft: 10}}>
                <Avatar
                    rounded = {true}
                    containerStyle = {{ marginRight: 5, marginLeft: 1, borderWidth: 2, borderColor: 'black',shadowColor: "black",
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 5,}}
                    size= {this.props.size}
                    source = {{uri: this.props.profilePicture}}
                    onPress = {() => this.changeAvatar()}
                />

                <TextInput
                    style = {[styles.identityText, {marginBottom: 0, marginTop: 10, marginLeft: 5, marginRight: 0, textAlign: "left", color:"black", fontSize: 35}]}
                    placeholder = {"add name!"}
                    onChangeText={text =>this.activateEdit(text)}
                    value = {name}
                    selectionColor = "black"
                    multiline = {false}
                    maxLength = {20}
                    editable = {!(this.props.notMe)}
                />
            </View>
                <View style = {{flexDirection: 'row', justifyContent: "center", flex: 0.5}}>
                { (this.state.editing)
                    ?
                    <Button
                        raised
                        style={{alignContent: "center", borderRadius: 10, marginTop: -10, marginRight: 0, justifyContent: "center", alignItems: "center"}}
                        title = "Save Name"
                        titleStyle = {{color: "white", fontWeight: "700"}}
                        buttonStyle={{backgroundColor: '#186aed'}}
                        onPress = {()=> this.doneSaving()}

                    />
                    :null
                }
                </View>
            </View>

        );
    }
}

Identity.propTypes = {};

const mapStateToProps = (state) => ({
    botID: state.bot
});



export default connect(mapStateToProps)(Identity);


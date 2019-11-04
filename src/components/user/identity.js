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
        // source = 'https://i.pravatar.cc/300'
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
            <View style = {{flex: 1, width: '100%', margin: 5}}>
            <View style = {{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: "flex-start", alignItem: "center", paddingTop: 0, marginBottom: 5, marginLeft: 5}}>
                <Avatar
                    rounded = {true}
                    containerStyle = {[styles.card, { marginRight: 0, margin: 0,borderRadius: 100, marginLeft: 1, borderWidth: 2, borderColor: '#1E85FF',}]}
                    size= {this.props.size}
                    source = {{uri: this.props.profilePicture}}
                    onPress = {() => this.changeAvatar()}
                />
                <View style = {{flexDirection: "column"}}>
                <TextInput
                    style = {{marginBottom: 0, fontWeight: "bold", marginTop: 10, marginLeft: 5, marginRight: -5, textAlign: "left", color:"black", fontSize: 25}}
                    placeholder = {"username"}
                    onChangeText={text =>this.activateEdit(text)}
                    value = {name}
                    selectionColor = "black"
                    multiline = {false}
                    maxLength = {20}
                    editable = {!(this.props.notMe)}
                />
                <TextInput
                    style = {{marginBottom: 0, marginTop: 0, marginLeft: 5, marginRight: -5, textAlign: "left", color:"black", fontSize: 20}}
                    placeholder = {"score    "}
                    onChangeText={text =>this.activateEdit(text)}
                    value = {this.props.score}
                    selectionColor = "black"
                    multiline = {false}
                    maxLength = {20}
                    editable = {!(this.props.notMe)}
                />
                </View>
            </View>
                <View style = {{flexDirection: 'row', justifyContent: "flex-start", flex: 1}}>
                { (this.state.editing)
                    ?
                    <Button
                        raised
                        style={{alignContent: "center", borderRadius: 10, marginTop: 0, marginRight: 0, justifyContent: "center", alignItems: "center"}}
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


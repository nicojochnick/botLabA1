import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {Avatar, Button, Input} from 'react-native-elements';
import {styles} from '../theme';
import firebase from '@react-native-firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from '../commentSystem/commentContainer';


class TribeHeader extends Component {
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('users');

        this.user = firebase.auth().currentUser;
        this.state = {
            liked: false,
            heartIcon:'ios-heart-empty',
            heartIconColor: 'grey',
            message: '',
            likes: 0,
            username: null,
            userphoto: null,
            didLike: false,

        }

    }

    //TODO Add the correct touserID



    likeUpdate(){

        if (this.props.didLike === false) {
            this.setState({liked:!this.state.liked});
            this.setState({likes: this.state.likes+1});
            let heartIcon = 'ios-heart';
            let heartIconColor = '#00FF87'
            this.setState({heartIcon: heartIcon})
            this.setState({heartIconColor: heartIconColor})
            this.props.updateLikes(this.props.header, this.props.alwaysMe, this.props.tribeID)

        }


    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        let message = '';
        let likes = 0;
        if (this.props.header === undefined){
            this.setState({ message: 'nothing'});
            this.setState({likes: 0})
        } else {
            message = this.props.header.message
            this.setState({message: message})
            likes = this.props.header.likes.length;
            this.setState({likes:likes})
            let meLike = this.props.header.likes.filter(id => id === this.props.alwaysMe)
            if (meLike.length  > 0) {
                console.log("WE LIKED THIS!")
                let heartIcon = 'ios-heart';
                let heartIconColor = '#00FF87'
                this.setState({didLike: true})
                this.setState({heartIcon: heartIcon})
                this.setState({heartIconColor: heartIconColor})
            }
        }
    }
    componentWillUnmount(): void {
        this.unsubscribe();
    }


    onCollectionUpdate = (snapshot) => {
        this.ref.where('userID', '==', this.props.userID).get().then((snapshot) => {
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            console.log(data);
            let user = data;
            this.setState({username: user.name});
            this.setState({userphoto: user.photoURL});}
        );
    };




    render() {
        console.log(this.props.userID)
        let likeColor = this.state.heartIconColor
        if (!this.props.didLike){
            likeColor = 'lightgrey'

        }


        return (
            <View style = {[{ backgroundColor: 'white', marginTop: 0, marginBottom: 20, borderWidth: 0, borderColor:'2852EE', paddingBottom: 10, padding: 10, margin: 13}, styles.tribesHeader]}>
                <View style = {{margin: 10, marginTop: 10, flexDirection: "row", flex: 1, width: '95%'}}>
                    <View style = {{flexDirection: "row", flex: 0.8}}>
                        <Avatar
                            source ={{uri: this.props.tribeAuthorProfilePicture}}
                            avatarStyle = {{ borderRadius: 100, borderWidth: 1, borderColor: "black"}}

                            rounded/>
                        <View style = {{flexDirection: "column", width: '98%'}}>
                            <Text
                                style = {{fontWeight: "bold", marginLeft: 3, fontSize: 19, color: "black", textAlign: "left"}}> {this.props.tribeAuthorName}  </Text>
                            {(this.props.header.message === null)
                                ? <Text
                                    style={{color: "black", marginLeft: 3, marginTop: 3, fontSize: 18, width: "100%", fontWeight:'600'}}
                                    multiline={true}
                                >
                                    created a new board
                                </Text>


                               : <Text
                                    style={{color: "black", marginLeft: 3, marginTop: 3, fontSize: 18, width: "100%", fontWeight: '600'}}
                                    multiline={true}
                                >
                                    completed: {this.props.header.message}
                                </Text>
                            }
                        </View>
                    </View>
                    <View style ={{flexDirection: "row", marginTop: -5, flex: 0.2, justifyContent: 'flex-end', marginRight: -3}}>
                        { (this.props.isPublic)
                        ? <View>
                            {/*{!(this.props.canEdit )*/}
                             <Button
                                icon = {
                                    <Ionicons
                                        name = {'ios-thumbs-up'}
                                        color = {likeColor}
                                        size = {25}
                                        onPress={()=> this.likeUpdate()}
                                        raised = {true}
                                    />
                                }
                                type = 'clear'
                                title = {this.props.header.likes.length}
                                titleStyle = {{color:"grey", marginLeft: 5, fontWeight: 'bold'}}

                            />
                            {/*: <View>*/}
                            {/*{ !(this.props.isPosted)*/}
                            {/*    ? <Button*/}
                            {/*    title = {"Post"}*/}
                            {/*    raised*/}
                            {/*    containerStyle = {{height: 40}}*/}
                            {/*    buttonStyle = {{backgroundColor: "white"}}*/}
                            {/*    titleStyle = {{color: '#186aed', fontWeight: "bold"}}*/}
                            {/*    onPress = {() => this.props.shareTribe(this.props.tribeID)}*/}
                            {/*    />*/}
                            {/*    :<Button*/}
                            {/*        title = {"Un-Post"}*/}
                            {/*        raised*/}
                            {/*        containerStyle = {{height: 40, width: 90}}*/}
                            {/*        buttonStyle = {{backgroundColor: '#186aed', borderColor: "white", borderWidth: 1}}*/}
                            {/*        titleStyle = {{color: 'white', fontWeight: "bold"}}*/}
                            {/*        onPress = {() => this.props.unshareTribe(this.props.tribeID)}*/}
                            {/*        />*/}
                            {/*}*/}
                            {/*</View>*/}
                            </View>
                        : <Button
                                title = {"Go Live!"}
                                raised
                                containerStyle = {{height: 40, width: 90}}
                                buttonStyle = {{backgroundColor: 'white', borderColor: "white", borderWidth: 1}}
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

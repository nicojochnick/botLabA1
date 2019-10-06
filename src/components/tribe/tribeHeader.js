import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {Avatar, Button, Input} from 'react-native-elements';
import {styles} from '../theme';
import firebase from "react-native-firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';


class TribeHeader extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.state = {
            liked: false,
            heartIcon:'ios-heart-empty',
            heartIconColor: 'white',
            message: '',
            likes: 0

        }

    }


    likeUpdate(){
        this.setState({liked:!this.state.liked});
        this.setState({likes: this.state.likes+1});
        this.props.updateLikes(this.props.header, this.props.alwaysMe,this.props.tribeID )

    }

    componentDidMount(): void {
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
            console.log(meLike);
            console.log(this.props.header);
            console.log(this.props.alwaysMe);
            console.log(meLike);
            if (meLike.length  > 0) {
                console.log("WE LIKED THIS!")
                let heartIcon = 'ios-heart';
                let heartIconColor = '#00FF87'
                this.setState({heartIcon: heartIcon})
                this.setState({heartIconColor: heartIconColor})
            }
        }
    }

    render() {
        return (
            <View style = {[{ backgroundColor: '#186aed', paddingBottom: 15, padding: 10}, styles.tribesHeader]}>
                <View style = {{margin: 10, marginTop: 10, flexDirection: "row", flex: 1}}>
                    <View style = {{flexDirection: "row", flex: 0.8}}>
                        <Avatar
                            source ={{uri: this.props.tribeAuthorProfilePicture}}
                            rounded/>
                        <View style = {{flexDirection: "column"}}>
                            <Text
                                style = {{fontWeight: "bold", marginLeft: 3, fontSize: 17, color: "white", textAlign: "left"}}> {this.props.tribeAuthorName} </Text>
                            <Text
                                style = {{color: "white", marginLeft: 3, marginTop: 3, fontSize: 17, width: "100%"}}
                                numberOfLines={4}
                            >
                                {this.state.message}
                            </Text>
                        </View>
                    </View>
                    <View style ={{flexDirection: "row", flex: 0.2, justifyContent: 'flex-end', marginRight: -3}}>
                        { (this.props.isPublic)
                        ? <View>
                            {!(this.props.canEdit )
                            ? <Button
                                icon = {
                                    <Ionicons
                                        name = {this.state.heartIcon}
                                        color = {this.state.heartIconColor}
                                        size = {25}
                                        onPress={()=> this.likeUpdate()}
                                        raised = {true}
                                    />
                                }
                                type = 'clear'
                                title = {this.state.likes}
                                titleStyle = {{color:"white", marginLeft: 5}}

                            />
                            : <View>
                            { !(this.props.posted)
                                ? <Button
                                title = {"post"}
                                raised
                                containerStyle = {{height: 40}}
                                buttonStyle = {{backgroundColor: "white"}}
                                titleStyle = {{color: '#186aed', fontWeight: "bold"}}
                                onPress = {() => this.props.shareTribe(this.props.tribeID)}
                                />
                                :<Button
                                    title = {"unpost"}
                                    raised
                                    containerStyle = {{height: 40, width: 90}}
                                    buttonStyle = {{backgroundColor: '#186aed', borderColor: "white", borderWidth: 1}}
                                    titleStyle = {{color: 'white', fontWeight: "bold"}}
                                    onPress = {() => this.props.unshareTribe(this.props.tribeID)}
                                    />
                            }
                            </View>
                        }
                            </View>
                        : <Text style = {{color: "white"}} > Goal is Private </Text>
                        }
                    </View>

                </View>
            </View>
        );
    }
}

export default TribeHeader;

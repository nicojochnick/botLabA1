import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, FlatList, TextInput, Text, ActivityIndicator} from 'react-native';
import {Avatar, Button, ListItem, SearchBar, Divider} from 'react-native-elements';
import {styles} from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'react-native-firebase';
import moment from 'moment';




class TribeGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendEmail: null,
            searchHit: false,
            searchMessage: null,
            friendData: null,
            friends: this.props.friends,
            friendIDS: this.props.friendIDS,
            searchData:null,
            gotMems: false
        }

    }


    getEmails(mail){
        const db = firebase.firestore();
        // db.settings({ timestampsInSnapshots: true});
        db.collection('users').where("email", '==',mail).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ searchData: data })
        });
    }

    getTribeMembers(friendIDS) {
        let fData = [];
        firebase.firestore().collection('users').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data().userID);
                if (friendIDS.includes(doc.data().userID)) {
                    let name = doc.data().name;
                    let picture = doc.data().photoURL;
                    let userID = doc.data().userID;
                    let user = {picture: picture, name: name, userID: userID};
                    fData.push(user)
                }
            });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        this.setState({friendData: fData, gotMems: true})
    }



    keyExtractor = (item, index) => index.toString();
    renderItem = ({ item }) => (
        <ListItem
            style = {{borderWidth: 1, borderRadius: 5, borderColor:"grey", margin: 10,padding: 2}}
            title={item.name}
            // listKey = {moment().format()}
            // leftAvatar={{
            //     source: {uri: item.picture}
            // }}

            leftIcon = {
                <Icon style = {{marginRight: 10}}
                              name = {'user-circle'}
                              color = "black"
                              disabledStyle = {{color:"grey"}}
                              size = {30}/>
            }
        />
    );

    componentDidMount(): void {
        console.log(this.props.friendIDS);
        this.getTribeMembers(this.props.friendIDS)
    }

    triggerSearch() {
        console.log(this.state.friendEmail);
        let data = this.state.friendEmail;
        console.log(data);
        this.getEmails(data)
    }

    triggerAdd(){
        this.props.addFriendIDToTribe(this.state.searchData[0].userID, this.props.tribeID);
        this.props.addFriendToTribe(this.state.searchData[0], this.props.tribeID);
        this.setState({searchData: null})
    }

    render() {
        console.log(this.state.searchData)
        console.log(this.state.friendData);

        return (
            <View style = {styles.groupScrollContainer}>
                <View style = {{flexDirection: "row", justifyContent: "flex-start", }}>
                    <Button
                        icon = {<Ionicons style = {{marginRight: 0,}}
                                          name = {'ios-search'}
                                          color = "black"
                                          size = {30}
                                          onPress = {() => this.triggerSearch()}
                        /> }
                        type = "clear"
                        style = {{backgroundColor:"white"}}
                        onPress = {() => this.triggerSearch()}

                    />
                    <TextInput
                        style = {{borderWidth: 1, borderRadius: 5, width: 270, borderColor: "grey", margin: 7, padding: 5}}
                        placeholder = 'type users email'
                        onChangeText = {(text)=> this.setState({friendEmail: text})}
                    />

                </View>
                { (this.state.searchData !== null )
                    ? <View style = {{ margin: 10, borderRadius: 5, borderColor: "grey"}}>
                        {(this.state.searchData !== null || this.state.searchData !== undefined)
                            ?<ListItem
                                style={{borderWidth: 1, borderRadius: 5, borderColor: "grey", margin: 10, padding: 2}}
                                title={this.state.searchData[0].name}
                                // leftAvatar={{
                                //     source: {uri: item.picture}
                                // }}
                                leftIcon={
                                    <Icon style={{marginRight: 10}}
                                          name={'user-circle'}
                                          color="black"
                                          disabledStyle={{color: "grey"}}
                                          size={30}/>
                                }
                                rightIcon={
                                    <Ionicons style = {{}}
                                              name = {'ios-add'}
                                              color = 'black'
                                              disabledStyle = {{color:"grey"}}
                                              size = {25}
                                              onPress = {() => this.triggerAdd()} />
                                }

                            />
                            : <Text> No user found, make sure email is correct</Text>
                        }
                    </View>
                    : null

                }
                <Divider/>
                <ScrollView style = {styles.groupScroll}>
                    { (this.state.gotMems)
                        ?
                        <View>
                        <FlatList
                            listKey="Superunique"
                            // keyExtractor={this.keyExtractor}
                            data={this.props.friends}
                            renderItem={this.renderItem}
                            />
                        </View>
                        : <ActivityIndicator style = {{margin: 30}} size="small" color="#0000ff" />
                    }
                </ScrollView>
            </View>
        );
    }
}

TribeGroup.propTypes = {};

export default TribeGroup;

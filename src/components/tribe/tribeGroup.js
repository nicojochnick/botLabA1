import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView,View, FlatList,TextInput, Text} from 'react-native';
import {Avatar, Button, ListItem, SearchBar, Divider} from 'react-native-elements';
import {styles} from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'react-native-firebase';




class TribeGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendEmail: null,
            searchHit: false,
            searchMessage: null,
            friendData: null,
            searchData:null,
        }

    }


    getUserByEmail(data){
        const db = firebase.firestore();
        db.collection('users').where("email", '==', this.state.friendEmail).get().
        then(function (querySnapshot) {
            let data = querySnapshot.docs.map( function (doc) {
                let friendID = doc.data().userID;
                let name = doc.data().name;
                return {name: name, friendID: friendID};
            });
            this.setState({ boxData: data })
        });

    };

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



    // keyExtractor = (item, index) => index.toString();
    renderItem = ({ item }) => (
        <ListItem
            style = {{borderWidth: 1, borderRadius: 5, borderColor:"grey", margin: 10,padding: 2}}
            title={item.name}
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

    }

    triggerSearch() {
        console.log(this.state.friendEmail);
        let data = this.state.friendEmail;
        console.log(data);
        this.getEmails(data)
        //     console.log(user);
        //     this.setState({searchData: user});
        //     this.setState({searchHit: true})
        // }
    }

    triggerAdd(){
        this.props.addFriendToTribe(this.state.searchData[0].userID, this.props.tribeID)
        this.setState({searchData: null})
    }

    render() {
        console.log(this.state.searchData);

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
                    <FlatList
                        listKey="Superunique"
                        // keyExtractor={this.keyExtractor}
                        data={this.props.tribeFriends}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
            </View>
        );
    }
}

TribeGroup.propTypes = {};

export default TribeGroup;

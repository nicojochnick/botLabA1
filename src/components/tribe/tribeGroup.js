import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, FlatList, TextInput, Text, ActivityIndicator} from 'react-native';
import {Avatar, Button, ListItem, SearchBar, Divider} from 'react-native-elements';
import {styles} from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'react-native-firebase';
import moment from 'moment';
import UserTag from '../user/userTag';




class TribeGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendEmail: null,
            searchHit: false,
            searchMessage: null,
            friendData: this.props.friendData,
            friends: this.props.friends,
            friendIDS: this.props.friendIDS,
            searchData:null,
            gotMems: false,
            open: this.props.open,
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



    keyExtractor = (item, index) => index.toString();
    renderItem = ({ item }) => (
        <ListItem
            style = {{borderWidth: 1, borderRadius: 5, borderColor:"grey", margin: 10,padding: 2}}
            titleStyle = {{fontWeight: "500"}}
            title={item.name}
            // listKey = {moment().format()}
            // leftAvatar={{
            //     source: {uri: item.picture}
            // }}

            leftIcon = {
                <Icon style = {{marginRight: 10}}
                              name = {'user-circle'}
                              color = '#186aed'
                              disabledStyle = {{color:"grey"}}
                              size = {30}/>
            }
        />
    );

    componentDidMount(): void {
        console.log(this.props.friendIDS);
        // this.getTribeMembers(this.props.friendIDS)
        this.setState({open: true})
    }

    triggerSearch() {
        console.log(this.state.friendEmail);
        let data = this.state.friendEmail;
        console.log(data);
        this.getEmails(data)
    }

    triggerAdd(){
        this.props.addFriendIDDB(this.state.searchData[0].userID,this.props.myID);
        // this.props.addFriendDB(this.state.searchData[0], this.props.myID);
        this.setState({searchData: null})
    }

    render() {
        console.log(this.props.friendData)
        return (
            <View>
                    <View>
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
                            style = {{borderWidth: 1, borderRadius: 5, width: 230, borderColor: "grey", margin: 7, padding: 5}}
                            placeholder = 'type users email'
                            onChangeText = {(text)=> this.setState({friendEmail: text.toLowerCase()})}
                        />
                        <Button
                            type = "clear"
                            title = 'close'
                            style = {{backgroundColor:"white"}}
                            onPress = {() => this.props.closeFriendView()}

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
                                              color="blue"
                                              disabledStyle={{color: "grey"}}
                                              size={30}/>
                                    }
                                    rightIcon={
                                        <Ionicons style = {{}}
                                                  name = {'ios-add'}
                                                  color = 'blue'
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
                    <View/>
                    <Divider/>
                    <ScrollView style = {styles.groupScroll}>
                        <View>
                            <FlatList
                                listKey="Superunique"
                                // keyExtractor={this.keyExtractor}
                                data={this.props.friendData}
                                renderItem={ ({item}) => (
                                    <UserTag
                                        avatar = {item.picture}
                                        name = {item.name}
                                        fbID = {item.fbID}
                                    />
                                )}
                                />
                        </View>
                    </ScrollView>
                    </View>
            </View>
        );
    }
}

TribeGroup.propTypes = {};

export default TribeGroup;

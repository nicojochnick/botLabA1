import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListItem, SearchBar, Button} from 'react-native-elements';
import {Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserTag from '../user/userTag';
import UserTagContainer from '../user/userTagContainer';

class SearchComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            friendEmail: null
        }
    }

    clear(){
        this.setState({friendEmail: null})
        this.props.clearSearch()
    }


    render() {
        return (
            <View style = {{flex: 1}}>
                <View>
                <SearchBar
                    lightTheme={true}
                    inputStyle = {{color:"black"}}
                    placeholder= {'add users to group by email'}
                    onChangeText = {(text)=> this.setState({friendEmail: text.toLowerCase()})}
                    value={this.state.friendEmail}
                    clearIcon={
                        <Ionicons
                            name={'ios-close'}
                            size={25}
                            onPress = {()=> this.clear()}
                            color = {'black'}

                        />
                    }
                    searchIcon={
                        <Ionicons
                            name={'ios-search'}
                            size={25}
                            color = {'black'}
                        />
                    }
                />
                </View>
                <View>
                    {(this.state.friendEmail !== null)
                        ? <View style={{flexDirection: "column", justifyContent: 'center', margin: 2}}>
                            {(this.state.friendEmail !== null)
                                ?
                                <Button
                                    containerStyle={{width: 100, justifyContent: "flex-end", margin: 5}}
                                    buttonStyle={{backgroundColor: '#186aed'}}
                                    title='search'
                                    raised
                                    icon={
                                        <Ionicons
                                            style={{marginRight: 5}}
                                            name={'ios-search'}
                                            size={20}
                                            color='white'
                                        />
                                    }
                                    onPress={() => this.props.triggerSearch(this.state.friendEmail)}
                                />
                                : null
                            }
                            {(this.props.searchData !== null)
                                ? <View style={{margin: 0, borderRadius: 5, borderColor: "grey", marginBottom: 2}}>
                                    {(this.props.searchData[0] !== null && this.props.searchData[0] !== undefined)
                                        ?
                                        <UserTagContainer
                                            fromPhoto={this.props.searchData[0].photoURL}
                                            fromUserName={this.props.searchData[0].name}
                                            fbID={this.props.searchData[0].fbID}
                                            toUserID = {this.props.searchData[0].userID}
                                            fromUserID = {this.props.fromUserID}
                                            route={'feed'}
                                            groupName = {this.props.groupName}
                                            isAddToGroup = {true}
                                            isSearch = {true}
                                            clearSearch = {this.props.clearSearch}
                                            action = {'groupAdd'}
                                            groupID = {this.props.groupID}
                                        />
                                        : <Text style={{
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: '#186aed',
                                            justifyContent: "center"
                                        }}>No user found, make sure email is correct</Text>
                                    }
                                </View>
                                : null

                            }
                        </View>
                        : null
                    }

                    </View>

        </View>
        );
    }
}

SearchComponent.propTypes = {};

export default SearchComponent;


{/*<ListItem*/}
{/*    style={{borderWidth: 1, borderRadius: 5, borderColor: "grey", margin: 10, padding: 2}}*/}
{/*    title={this.props.searchData[0].name}*/}
{/*    // leftAvatar={{*/}
{/*    //     source: {uri: item.picture}*/}
{/*    // }}*/}
{/*    leftIcon={*/}
{/*        <Icon style={{marginRight: 10}}*/}
{/*              name={'user-circle'}*/}
{/*              color="blue"*/}
{/*              disabledStyle={{color: "grey"}}*/}
{/*              size={30}/>*/}
{/*    }*/}
{/*    rightIcon={*/}
{/*        <Ionicons style = {{}}*/}
{/*                  name = {'ios-add'}*/}
{/*                  color = 'blue'*/}
{/*                  disabledStyle = {{color:"grey"}}*/}
{/*                  size = {25}*/}
{/*                  onPress = {() => this.triggerAdd()} />*/}

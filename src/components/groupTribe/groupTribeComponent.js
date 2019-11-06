import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, TextInput, ScrollView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AddTribe from '../tribe/addTribe';
import SearchContainer from '../search/searchContainer';
import TribeGroup from '../groups/tribeGroup';
import TribeRoot from '../tribe/tribeRoot';

class GroupTribeComponent extends Component {
    render() {
        return (

            <KeyboardAwareScrollView
                style={{paddingTop: 0, paddingBottom:100, backgroundColor: 'white', flex: 1, marginBottom: 0, padding: 0}}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this._onRefresh}
                //     />
                // }
            >
                <SafeAreaView style = {{flexDirection: "row", paddingTop: 30 , justifyContent: "flex-start", alignItems: "flex-start", flex: 1}}>
                    <View style = {{flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start", flex: 2, marginBottom: 10}}>

                        <View style = {{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
                            {/*<Button*/}
                            {/*    type = 'clear'*/}
                            {/*    containerStyle = {{marginRight: 0}}*/}
                            {/*    onPress={() => this.props.navigation.navigate('Menu')}*/}
                            {/*    icon = {*/}
                            {/*        <Ionicons*/}
                            {/*            name = {'ios-menu'}*/}
                            {/*            size = {45}*/}
                            {/*            style = {{color: 'black'}}*/}
                            {/*            onPress={() => this.props.navigation.navigate('Menu')}*/}

                            {/*        />*/}

                            {/*    }*/}
                            {/*/>*/}
                            {(this.state.groupID)
                                ?<View style={{flexDirection: "row", flex: 1, padding: 4, marginTop: 10}}>
                                    <TextInput
                                        editable={true}
                                        multiline={false}
                                        placeholder='Untitled    '
                                        value={this.state.groupName}
                                        onChangeText={text => this.setState({groupName: text, isEditingName: true})}
                                        style={{
                                            color: 'black',
                                            margin: 5,
                                            paddingLeft: 0,
                                            marginTop: -15,
                                            fontWeight: 'bold',
                                            fontSize: 38
                                        }}
                                    />
                                </View>
                                :null
                            }

                        </View>
                    </View>
                    <View style = {{ marginRight: 10, marginLeft: -5, flex: 0.4, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-end",}}>
                        {(!this.state.loading)
                            ? <Button
                                style={{alignContent: "center", marginTop: 5, marginRight: 0}}
                                onPress={() => this.setState({isMemberOpen: !this.state.isMemberOpen})}
                                icon={
                                    <Ionicons
                                        name={'ios-contacts'}
                                        color={groupColor}
                                        size={35}
                                        onPress={() => this.setState({isMemberOpen: !this.state.isMemberOpen})}
                                        raised={true}
                                    />
                                }
                                type='clear'

                            />
                            : null
                        }
                        <View style = {{marginTop: -10}}>

                            <AddTribe
                                uid = {this.state.uid}
                                friendIDs ={this.state.friendIDs}
                                groupID = {this.state.groupID}
                                userID = {userID}
                                alwaysMe ={this.state.alwaysMe}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <View>
                    {(this.state.isEditingName)
                        ?
                        <Button
                            style={{alignContent: "center", borderRadius: 10, marginTop: -10, marginRight: 0, justifyContent: "center", alignItems: "center"}}
                            title = "Save Name"
                            titleStyle = {{color: "white", fontWeight: "700"}}
                            buttonStyle={{backgroundColor: '#186aed'}}
                            onPress = {()=> this.doneSaving()}

                        />
                        :null
                    }
                </View>

                <View>
                    {(this.state.isMemberOpen)
                        ?
                        <View style = {{margin: 6, marginTop: 0, padding: 2, backgroundColor: 'white', borderRadius: 10,shadowColor: "black",
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 20,}}>
                            <Text style = {{margin: 6, fontWeight: "bold", textAlign: "left", color: "black", fontSize: 18,}}> members </Text>
                            <SearchContainer
                                mess = {searchMess}
                                alwaysMe = {this.state.alwaysMe}
                                groupName = {this.state.groupName}
                                groupID = {this.state.groupID}
                            />
                            <TribeGroup
                                alwaysMe = {this.state.alwaysMe}
                                friendData={this.state.friendData}
                                getMems={this.state.getMems}
                                groupID = {this.state.groupID}
                            />
                        </View>
                        :null
                    }
                </View>
                { (this.state.alwaysMe !== null && this.state.groupID )
                    ?
                    <TribeRoot
                        isFeed = {true}
                        notMe={false}
                        groupID = {this.state.groupID}
                        alwaysMe={this.state.alwaysMe}
                    />
                    :
                    <ScrollView>
                        <Text style = {{margin: 20, marginTop: 4, color: "black", alignText: "center", fontWeight: "bold", fontSize: 35 }}>Hi There!</Text>
                        <Text style = {{margin: 20, marginTop: -5, color: "black", alignText: "center", fontWeight: "500", fontSize: 25 }}>Add a Group using the Left Menu Button 😁 </Text>
                    </ScrollView>
                }
            </KeyboardAwareScrollView>

        );
    }
}

GroupTribeComponent.propTypes = {};

export default GroupTribeComponent;


{/*<ListItem*/}
{/*    containerStyle = {{ backgroundColor: "white"}}*/}
{/*    title={this.props.tribeName}*/}
{/*    subtitle={this.props.tribeMembers.length + ' member(s)'}*/}
{/*    bottomDivider*/}
{/*    titleStyle = {{color: "black", fontWeight: "bold", }}*/}
{/*    subtitleStyle = {{color: '#414141'}}*/}
{/*    rightIcon = {*/}
{/*        <Ionicons*/}
{/*            name={'ios-close'}*/}
{/*            style={{color: 'black'}}*/}
{/*            size={22}*/}
{/*            onPress={() => this.props.removeGroup()}*/}
{/*        />*/}

{/*    }*/}

{/*    onPress = {()=>this.props.navigate(this.props.id, this.props.tribeName)}*/}
{/*/>*/}

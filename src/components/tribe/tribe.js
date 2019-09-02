import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, FlatList, Text, default as Alert, ScrollView} from 'react-native';
import {Button} from 'react-native-elements'
import {styles} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepBox from '../box/box';
import Step from '../step/step';
import BoxRoot from '../box/boxRoot';
import DatePicker from 'react-native-datepicker';
import * as Progress from 'react-native-progress';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import { ConfirmDialog } from 'react-native-simple-dialogs';
import moment from "moment";
import TribeGroup from './tribeGroup';
import * as firebase from "react-native-firebase";


class TribeComponent extends Component {
    constructor(props) {
        super(props);

        this.unsubscribe = null;
        this.ref = firebase.firestore().collection('stepBox');


        this.state = {
            boxData: [],
            open: true,
            showDeleteConfirm: false,
            editing: false,
            fOpen: false,
            name: this.props.name,
            deadline: this.props.deadline,
            loading: true,
            author: this.props.author
        }


    }



    makeEditable(bool){
        this.setState({editing: bool});
    }

    openDeleteConfirm(show){
        this.setState({ showDeleteConfirm: show });
    }

    optionYes = () => {
        this.openDeleteConfirm(false);

        setTimeout(
            () => {this.props.handleDeleteTribe(this.props.id);
            },
            300,
        );
    };

    optionNo = () => {
        this.openDeleteConfirm(false);
        setTimeout(
            () => {
            },
            300,
        );
    };

    doneSaving(){
        this.makeEditable(false);
        this.props.changeTribeName(this.state.name, this.props.id);
        this.props.addTribeDeadline(this.props.tribeID, this.state.deadline)
    }


    onCollectionUpdate = (snapshot) => {
        this.ref.where("tribeID", '==',this.props.tribeID).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ boxData: data, loading: false })
        });
    };

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.props.getTribeMembers(this.props.friendIDS);
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    render() {
        let open = this.state.open;
        let fOpen = this.state.fOpen;
        let dColor = "grey";
        let fColor = "grey";
        if (fOpen) {
            fColor =  '#3676FF';
        }
        if (open) {
            dColor = '#3676FF';
        }
        console.log(this.props.friendIDS);
        console.log(this.props.searchData);
        let myName = this.state.name;
        // if (this.state.editing){
        //     myName = null
        // }
        return (
            <View style = {styles.tribes}>
                <View style = {styles.topTribes}>
                        <TextInput
                            style = {styles.goalTitleText}
                            ref= {(el) => { this.name= el; }}
                            value = {myName}
                            multiline = {true}
                            editable = {this.state.editing}
                            onChangeText = {(text) => this.setState({name:text})}
                        />
                        <View style = {{flexDirection: "row", justifyContent: "space-between", }}>
                            <Button
                                icon = {
                                    <Icon
                                        name= 'users'
                                        color = {fColor}
                                        size = {20}
                                        onPress = {() => this.setState( {f: !fOpen})}
                                    />}
                                containerStyle = {{marginLeft: 10}}
                                title={ ""}
                                type="clear"
                                onPress = {() => this.setState( {fOpen: !fOpen})}
                            />
                            <Button
                                icon = {
                                    <Icon
                                        name= 'chevron-down'
                                        color = {dColor}
                                        size = {20}
                                        onPress = {() => this.setState( {open: !open})}
                                    />}
                                containerStyle = {{marginLeft: 15, marginRight: 15}}
                                title={ ""}
                                type="clear"
                                onPress = {() => this.setState( {open: !open})}
                            />
                            <Menu>
                                <MenuTrigger>
                                    <Icon
                                        style = {{margin: 7}}
                                        name = {'ellipsis-v'}
                                        color = '#3676FF'
                                        disabledStyle = {{color:"grey"}}
                                        size = {29}
                                                      />
                                </MenuTrigger>
                                    <MenuOptions>
                                    <MenuOption onSelect={() => this.makeEditable(true, myName)} text='Edit' />
                                    <MenuOption onSelect={() => this.openDeleteConfirm(true)} >
                                        <Text style={{color: 'red'}}>Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                <View style = {{marginLeft: 10, marginBottom: 10, marginTop: -9}}>
                <Text style = {{fontWeight: "500", color: "grey"}}> by {this.state.author} </Text>
                </View>
                {(!fOpen)
                    ?null
                    :<TribeGroup friendIDS = {this.props.friendIDS}
                                 tribeID = {this.props.id}
                                 getTribeMembers = {this.props.getTribeMembers}
                                 tribeFriends = {this.props.friends}
                                 friendData = {this.props.friendData}
                                 searchData = {this.props.searchData}
                                 addFriendToTribe = {this.props.addFriendToTribe}

                    />
                }
                {!open
                    ? null
                    :
                    <View>
                        <View style = {{flex: 1, justifyContent: "space-between", alignContent: "space-between", marginLeft: 10}}>
                            {(!this.state.editing)
                                ? null
                                // ? <Text style = {styles.titleDeadlineText}> deadline: {this.props.deadline} </Text>
                                : <View style = {{flexDirection: "row"}}>
                                    <Button
                                        style = {{width: '100%', marginTop: 0, marginBottom: 10}}
                                        title = "Add To Do's"
                                        buttonStyle={{backgroundColor: "#4978DD"}}
                                        onPress = {() => this.props.handleAddBox(this.props.id)}
                                    />

                                    <Button
                                        style={{justifyContent: "flex-end", alignContent: "flex-end", marginLeft: 10}}
                                        title = "Save"
                                        buttonStyle={{backgroundColor: "#4978DD"}}
                                        onPress = {()=> this.doneSaving()}
                                    />


                                    {/*<DatePicker*/}
                                    {/*    style={{width: '60%', marginLeft: 10}}*/}
                                    {/*    date={this.state.deadline}*/}
                                    {/*    mode="date"*/}
                                    {/*    placeholder="set a deadline"*/}
                                    {/*    format="YYYY-MM-DD"*/}
                                    {/*    minDate={moment().format('YYYY-MM-DD')}*/}
                                    {/*    maxDate="2025-06-01"*/}
                                    {/*    confirmBtnText="Confirm"*/}
                                    {/*    cancelBtnText="Cancel"*/}
                                    {/*    customStyles={{*/}
                                    {/*        dateIcon: {*/}
                                    {/*            position: 'absolute',*/}
                                    {/*            left: 0,*/}
                                    {/*            top: 4,*/}
                                    {/*            marginLeft: 0*/}
                                    {/*        },*/}
                                    {/*        dateInput: {*/}
                                    {/*            marginLeft: 36*/}
                                    {/*        }*/}
                                    {/*        // ... You can check the source to find the other keys.*/}
                                    {/*    }}*/}
                                    {/*    onDateChange={(date) => {*/}
                                    {/*        this.setState( {deadline: date})*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                </View>
                            }

                            {/*<Progress.Bar*/}
                            {/*    progress={this.props.computeProgress(this.props.id)} width={300} style={{margin: 10}}*/}
                            {/*/>*/}
                        </View>

                        <View>
                            <BoxRoot
                                tribeID = {this.props.tribeID}
                                filter = {this.props.id}
                                handleAddBox = {this.props.handleAddBox}
                                editing = {this.state.editing}
                            />
                        </View>
                    </View>
                }
                <ConfirmDialog
                    title="Please Confirm"
                    message="Are you sure you want to delete your goal?"
                    onTouchOutside={ () => this.openDeleteConfirm(false) }
                    visible={this.state.showDeleteConfirm }
                    negativeButton={{
                            title: "No",
                            onPress: this.optionNo,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },}}
                    positiveButton={
                        {
                            title: "Yes",
                            onPress: this.optionYes,
                        }}/>
            </View>

        );
    }
}

export default TribeComponent;

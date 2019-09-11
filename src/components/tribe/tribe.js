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
import * as shape from 'd3-shape'

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
import {AreaChart, Grid} from 'react-native-svg-charts';


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

    checkDate() {
        const curDate = moment().format('dddd, MMMM Do');
        if (this.props.date[0] !== curDate) {
            //update local database with todays Date
            //add an element to the componenet cloud database
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

    activateEdit(){

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

        return (
            <View style = {styles.tribes}>
                <View style = {styles.topTribes}>
                        <View style = {{width: 180}}>
                        <TextInput
                            style = {styles.goalTitleText}
                            ref= {(el) => { this.name= el; }}
                            value = {myName}
                            multiline = {true}
                            placeholder = {"add a title"}
                            editable = {this.state.editing}
                            onChangeText = {(text) => this.setState({name:text})}
                        />
                        {(this.state.author != null)
                                    ?<Text style = {{fontWeight: "500", color: "grey"}}> by {this.state.author} </Text>
                                    : null
                        }
                        </View>

                        <View style ={{flexDirection: "column", flex: 2, marginTop: -10, marginLeft: -10, marginRight: 0,justifyContent: "flex-end"}}>
                            <TextInput
                                style ={{fontSize: 60, textAlign: "right", fontWeight: "500"}}
                                placeholder = "0"
                            >
                                {this.props.data.pop()}
                            </TextInput>
                            <TextInput
                                style={{fontSize: 15, textAlign: "right", marginTop: -10}}
                                placeholder = "add a metric"

                            >
                                {this.props.metricName}
                            </TextInput>
                        </View>


                        <View style = {{flexDirection: "row", justifyContent: "flex-end", flex: 0.2}}>
                            <Menu>
                                <MenuTrigger>
                                    <Icon
                                        style = {{margin: 0}}
                                        name = {'ellipsis-v'}
                                        color = '#3676FF'
                                        disabledStyle = {{color:"grey"}}
                                        size = {22}
                                                      />
                                </MenuTrigger>
                                    <MenuOptions>
                                    <MenuOption onSelect={() => this.makeEditable(true, myName)} text='Edit'/>
                                        <MenuOption onSelect={() =>  this.setState( {fOpen: !fOpen})} text='Add Partners'/>
                                        <MenuOption onSelect={() => this.openDeleteConfirm(true)} >
                                        <Text style={{color: 'red'}}>Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>






                {(!fOpen)
                    ?null
                    :<TribeGroup friendIDS = {this.props.friendIDS}
                                 friends = {this.props.friends}
                                 tribeID = {this.props.id}
                                 getTribeMembers = {this.props.getTribeMembers}
                                 friendData = {this.props.friendData}
                                 searchData = {this.props.searchData}
                                 addFriendIDToTribe = {this.props.addFriendIDToTribe}
                                 addFriendToTribe = {this.props.addFriendToTribe}

                    />
                }
                {!open
                    ? null
                    :
                    <View>
                        <View>
                            <AreaChart
                                style={{ height: 100 }}
                                data={this.props.data}
                                contentInset={{ top: 20, bottom: 5, left: 20, right: 20}}
                                curve={ shape.curveNatural }
                                svg={{ fill: '#6161F7' }}
                            >
                                <Grid/>
                            </AreaChart>
                        </View>






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


{/*<Button*/}
{/*    icon = {*/}
{/*        <Icon*/}
{/*            name= 'chevron-down'*/}
{/*            color = {dColor}*/}
{/*            size = {20}*/}
{/*            onPress = {() => this.setState( {open: !open})}*/}
{/*        />}*/}
{/*    containerStyle = {{marginLeft: 15, marginRight: 15}}*/}
{/*    title={ ""}*/}
{/*    type="clear"*/}
{/*    onPress = {() => this.setState( {open: !open})}*/}
{/*/>*/}

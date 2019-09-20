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
        this.closeFriendView = this.closeFriendView.bind(this);
        this.state = {
            boxData: [],
            open: true,
            showDeleteConfirm: false,
            editing: false,
            fOpen: false,
            name: this.props.name,
            nameChange: false,
            deadline: this.props.deadline,
            loading: true,
            author: this.props.author,
            metricName: null,
            metricNameChange: false,
            metric: null,
            metricChange: false,
            endGoal: null,
            endGoalChange: false,
        }
    }

    checkDate(curData) {
        const curDate = moment().format("MMM D YY");
        console.log(curData);
        if (curData.date !== curDate) {
            this.props.addDataToTribe(this.props.id, 0, curDate);

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


    closeFriendView() {
        this.setState({fOpen: false})
    }

    doneSaving(){
        const curDate = moment().format("MMM D YY");
        this.makeEditable(false);
        if (this.state.metricChange) {

            this.props.addDataToTribe(this.props.id, this.state.metric, curDate);
            this.setState({metricChange: false})
        }

        if (this.state.nameChange) {
            this.props.changeTribeName(this.state.name, this.props.id);
            this.setState({nameChange: false})

        }

        if (this.state.metricNameChange) {
            this.props.changeMetricName(this.state.metricName, this.props.id);
            this.setState({metricNameChange: false})
            //this.props.addTribeDeadline(this.props.tribeID, this.state.deadline)
        }

        if (this.state.endGoalChange) {
            this.props.changeEndGoal(this.state.endGoal, this.props.id);
            this.setState({endGoalChange: false})

        }
    }

    activateEdit(data, param){
        this.makeEditable(true);

        if ( param === 'name') {
            this.setState({name:data});
            this.setState({nameChange : true})
        }

        if ( param === 'metricName') {
            this.setState({metricName:data});
            this.setState({metricNameChange : true})
        }

        if ( param === 'metric') {
            let int = data;
            int = Number(int);
            console.log(int)
            if (!Number.isNaN(int)){
                this.setState({metricChange: true});
                this.setState({metric: int})
            }
        }

        if (param === 'endGoal') {
            let int = data;
            int = Number(int);
            console.log(int)
            if (!Number.isNaN(int)) {
                this.setState({endGoalChange: true});
                this.setState({endGoal: int})
            }

        }


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

        let currData = this.props.cData[this.props.cData.length - 1];
        this.checkDate(currData)

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }


    computeProgress(ds,goal){
        if (goal===null){
            return 0
        }
        console.log(ds);
        console.log(goal)
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        let sum = arrSum(ds);
        console.log(sum)

        return sum / goal


    }

    computeTotal(ds){
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        return arrSum(ds);

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
        let dataList = [];
        let currData = [0];
        currData = this.props.cData[this.props.cData.length - 1];
        this.props.cData.map(function (item) {
            dataList.push(item.data)
        });


        console.log(dataList)

        return (
            <View style = {styles.tribes}>
                <View style = {styles.topTribes}>
                        <View style = {{width: 200}}>
                        <TextInput
                            style = {styles.goalTitleText}
                            ref= {(el) => { this.name= el; }}
                            value = {myName}
                            placeholder = {"add a title"}
                            editable = {true}
                            onChangeText = {(text) => this.activateEdit(text,'name')}
                        />
                        <View style = {{flexDirection: "row"}}>
                            <Text style = {{fontSize: 20, fontWeight: 500, color: "grey"}}> Goal: </Text>
                            <TextInput
                                style = {{fontSize: 20, fontWeight: 500, color: "blue"}}
                                ref= {(el) => { this.name= el; }}
                                placeholder = {"Add Number"}
                                editable = {true}
                                onChangeText = {(text) => this.activateEdit(text,'endGoal')}
                                >
                                {this.props.endGoal}
                            </TextInput>
                        </View>
                         <View style = {{flexDirection: "row"}}>
                                <Text style = {{fontSize: 20, fontWeight: 500, color: "grey"}}> Total: </Text>
                                <Text style = {{fontSize: 20, fontWeight: 500, color: "lightgreen"}}>
                                    {this.computeTotal(dataList)}
                                </Text>
                         </View>


                        {/*{(this.state.author != null)*/}
                        {/*            ?<Text style = {{fontWeight: "500", color: "grey"}}> by {this.state.author} </Text>*/}
                        {/*            : null*/}
                        {/*}*/}
                        </View>

                        <View style ={{flexDirection: "column", flex: 2, marginTop: -10, marginLeft: -10, marginRight: 0,justifyContent: "flex-end"}}>

                            <TextInput
                                style ={{fontSize: 65, textAlign: "right", fontWeight: "500", marginTop: 5}}
                                placeholder = "0"
                                onChangeText = {(text) => this.activateEdit(text,'metric')}
                            >
                                {currData.data}
                            </TextInput>
                            <View style = {{flexDirection: 'row', flex: 1, alignContent: "flex-end", justifyContent: "flex-end", marginTop: -5}}>
                            <TextInput
                                style={{fontSize: 15, textAlign: "right", marginTop: 5}}
                                placeholder = "add a metric"
                                onChangeText = {(text) => this.activateEdit(text,'metricName')}
                            >
                                {this.props.metricName}
                            </TextInput>
                            <Text style = {{textAlign: "right", marginTop: 5, marginRight: 0, }}> Today </Text>
                            </View>
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
                                        <MenuOption onSelect={() =>  this.setState( {fOpen: !fOpen})} text='Partners'/>
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
                                 open = {fOpen}
                                 closeFriendView = {this.closeFriendView}
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
                    <View style = {{marginTop: -10}}>
                        <Progress.Bar
                            progress={this.computeProgress(dataList, this.props.endGoal)} width={330} style={{margin: 10}}
                        />
                        { (dataList.length > 2 || dataList[1] !== 0)
                            ?
                            <View style = {{marginTop: 0}}>
                                <AreaChart
                                    style={{ height: 90 }}
                                    data={dataList}
                                    contentInset={{ top: 20, bottom: 5, left: 20, right: 20}}
                                    curve={ shape.curveNatural }
                                    svg={{ fill: '#186aed' }}
                                >
                                    <Grid/>
                                </AreaChart>
                            </View>
                            : null
                            }
                        <View>
                            <BoxRoot
                                tribeID = {this.props.tribeID}
                                filter = {this.props.id}
                                handleAddBox = {this.props.handleAddBox}
                                editing = {this.state.editing}
                            />
                        </View>


                        <View style = {{flex: 1, justifyContent: "space-between", alignContent: "space-between", marginLeft: 10}}>
                            {(!this.state.editing)
                                ? null
                                // ? <Text style = {styles.titleDeadlineText}> deadline: {this.props.deadline} </Text>
                                : <View style = {{flexDirection: "row"}}>
                                    <Button
                                        style = {{width: '100%', marginTop: 0, marginBottom: 10}}
                                        title = "Add Task Set"
                                        buttonStyle={{backgroundColor: '#186aed'}}
                                        onPress = {() => this.props.handleAddBox(this.props.id)}
                                    />

                                    <Button
                                        style={{justifyContent: "flex-end", alignContent: "flex-end", marginLeft: 10}}
                                        title = "Save"
                                        buttonStyle={{backgroundColor: '#186aed'}}
                                        onPress = {()=> this.doneSaving()}
                                    />

                                </View>
                            }

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

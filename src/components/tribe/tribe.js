import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, FlatList, Text, default as Alert, Switch, ScrollView} from 'react-native';
import {Button, Divider} from 'react-native-elements';
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
import TribeGroup from '../groups/tribeGroup';
import * as firebase from "react-native-firebase";
import {AreaChart, Grid} from 'react-native-svg-charts';
import TribeHeader from './tribeHeader';
import CoreChatContainer from '../coreChat/coreChatContainer';
import {CoreChatComponent} from '../coreChat/coreChatComponent';
import TribeUpdateAdd from './tribeUpdateAdd';
import SocialTribeTab from './socialTribeTab';
import CommentTopStack from '../commentSystem/commentTopStack'
import {
    addBox,
    addBoxDB, addDataToTribeDB, addFriendIDToTribeDB, addFriendToTribeDB, addTribeDeadline,
    addTribeDeadlineDB,
    changeEndGoal,
    changeMetricNameDB, changeTribeName,
    changeTribeNameDB, deleteTribe,
    deleteTribeDB, sendNotification, shareTribeDB, unshareTribeDB, updateHeader,
} from '../../redux/actions';
import {connect} from 'react-redux';


class TribeComponent extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = firebase.firestore().collection('stepBox');
        this.user = firebase.auth().currentUser;
        this.closeFriendView = this.closeFriendView.bind(this);
        this.sendHeaderMessage = this.sendHeaderMessage.bind(this);
        this.sendLikeNotification = this.sendLikeNotification.bind(this);

        this.computeProgress = this.computeProgress.bind(this);

        this.updateHeader = this.updateHeader.bind(this);
        this.shareTribe = this.shareTribe.bind(this);
        this.unshareTribe = this.unshareTribe.bind(this);

        this.updateLikes = this.updateLikes.bind(this);
        this.goLive = this.goLive.bind(this);

        this.handleAddBoxDB = this.handleAddBoxDB.bind(this);
        this.handleDeleteTribeDB = this.handleDeleteTribeDB.bind(this);
        this.changeTribeNameDB = this.changeTribeNameDB.bind(this);
        this.addTribeDeadlineDB = this.addTribeDeadlineDB.bind(this);

        this.addDataToTribeDB = this.addDataToTribeDB.bind(this);

        this.editMetric = this.editMetric.bind(this);
        this.changeEndGoal = this.changeEndGoal.bind(this);

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
            canEdit: true,
            headerMessage: null,
            headerOpen: false,

            tribeAuthorName: null,
            tribeAuthorProfilePicture: null,

            isOpen: false,
            isCommentOpen: false,
        }
    }






    handleAddBox(tribeID) {
        const genericBox = {
            name: "add a title",
            id: moment().format(),
            tribeID: tribeID,
            open: false,
            info: "add a description"
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addBox(genericBox));
    }

    shareTribe(tribeID) {
        let timeStamp = moment().format();
        this.props.shareTribeDB(tribeID, timeStamp)
    }
    unshareTribe(tribeID) {
        let timeStamp = moment().format();
        this.props.unshareTribeDB(tribeID, timeStamp)
    }

    handleAddBoxDB(tribeID) {
        const genericBox = {
            name: "add a title",
            id: moment().format(),
            tribeID: tribeID,
            open: false,
            info: "add a description",
            steps: [],
            deadline: null,
            userID: this.props.myID,
            update: [],
        };
        this.props.addBoxDB(genericBox)
    }

    updateLikes(header, userID, tribeID) {
        header.likes.push(userID);
        this.props.updateHeader(tribeID, header)
    }




    changeTribeNameDB(text, index) {
        this.props.changeTribeName(text, index)
    }

    editMetric(text, index) {
        this.props.editMetric(text, index)
    }


    handleDeleteTribeDB(tribeID) {
        this.props.handleDeleteTribeDB(tribeID);
    }


    addTribeDeadlineDB(index, deadline) {
        this.props.addTribeDeadlineDB(index, deadline)
    }

    updateHeader(tribeID, data, type) {
        console.log(data);
        let message = '';
        let timeStamp = moment().format();
        let send = {message: message, timeStamp: timeStamp, likes: []};
        if (type === 'addedData') {
            let num = data.number;
            console.log(num);
            let metric = data.metricName;
            if (metric) {
                message = 'did ' + num + " " + metric + " today!"
            } else {
                message = 'add a metric to your goal!'
            }
            send.message = message;
            this.updateHeader(tribeID, send)
        }
    }

    addDataToTribeDB(index, data, date, insertCol, metric) {
        this.props.addDataToTribeDB(index, data, date, insertCol);
        console.log(data)
        let num = data;
        if (data > 0 && insertCol === false) {
            let data = {number: num, metricName: metric};
            this.updateHeader(index, data, 'addedData')
        }
    }

    sendLikeNotification(){
        let like = {
            message : "commented on your goal",
            fromUserID : this.props.alwaysMe,
            toUserID: this.props.friendID,
            timeStamp: moment().format(),
            action: "like",
        };

        this.props.sendNotification(like)
    }



    computeProgress(tribeID) {

        if (tribeID) {
            return 0
        }
        let data = [];// db.settings({ timestampsInSnapshots: true});

        let steps = data.filter(function (step) {
            return step.tribeID === tribeID
        });
        let total = steps.length;
        let checkSteps = steps.filter(function (step) {
            return step.done === true
        });
        let checked = checkSteps.length;
        let progress = checked / total;
        if (progress > 0) {
            return progress
        } else {
            return 0;
        }
    }


    changeEndGoal(text, tribeID) {
        this.props.changeEndGoal(text, tribeID)
    }


    checkDate(curData) {
        const curDate = moment().format("MMM D YY");
        console.log(curData);
        if (curData.date !== curDate) {
            console.log('SENT')
            this.addDataToTribeDB(this.props.id, 0, curDate,true);
        }
    }

    sendHeaderMessage(data){
        this.setState({headerOpen: true});
        this.setState({headerMessage: data})
        // let dataList = [];
        // let message = null;
        // let currData = this.props.cData[this.props.cData.length - 1];
        // this.props.cData.map(function (item) {
        //     dataList.push(item.data)
        // });
        // if (currData.data === 0) {
        //     message = 'no' + " " + this.props.metricName + " " + 'today :(';
        //     this.setState({headerMessage: message})
        // }

        // steps = steps.filter(function(item){
        //     return item.done === false
        // });
        // let message = steps.shift().name;
        // this.setState({message: message})
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
            () => {this.handleDeleteTribeDB(this.props.id);
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

    openTribe(){
        this.setState({isOpen: !this.state.isOpen})
    }

    doneSaving(){
        const curDate = moment().format("MMM D YY");
        if (this.state.metricChange) {
             console.log("COOL")
            this.addDataToTribeDB(this.props.id, this.state.metric, curDate, false, this.props.metricName);
            this.setState({metricChange: false})
        }

        if (this.state.nameChange) {
            this.changeTribeNameDB(this.state.name, this.props.id);
            this.setState({nameChange: false})

        }

        if (this.state.metricNameChange) {
            this.editMetric(this.state.metricName, this.props.id);
            this.setState({metricNameChange: false})
            //this.props.addTribeDeadline(this.props.tribeID, this.state.deadline)
        }

        if (this.state.endGoalChange) {
            this.changeEndGoal(this.state.endGoal, this.props.id);
            this.setState({endGoalChange: false})

        }
        this.setState({editing: false})
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
                console.log('CHANGED')
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

    goLive(){

    }

    componentDidMount(): void {
        let user = firebase.auth().currentUser;
        if (user.uid !== this.props.userID){
            this.setState({canEdit: false })
        }
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        // this.props.getTribeMembers(this.props.friendIDS);
        let currData = this.props.cData[this.props.cData.length - 1];
        this.checkDate(currData);
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        this.ref.where("tribeID", '==',this.props.tribeID).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ boxData: data, loading: false })
        });
        firebase.firestore().collection('users').where('fbID', '==', this.props.userID).get().then((snapshot) => {
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(documentSnapshot.data());
                    return documentSnapshot.data()
                });
                let user = data[0];
                this.setState({tribeAuthorName: user.name});
                this.setState({tribeAuthorProfilePicture: user.userPhoto});
            }
        );
    };

    computeProgress(ds,goal){
        if (goal===null){
            return 0
        }

        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        let sum = arrSum(ds);
        return sum / goal
    }

    computeTotal(ds){
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        return arrSum(ds);

    }

    render() {
        let canEdit = this.state.canEdit
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

        let marginTop = -25;

        return (
            <View style = {{marginTop: 5}}>
                {(this.props.header)
                    ?<TribeHeader
                        posted = {this.props.posted}
                        isPublic = {this.props.isPublic}
                        header = {this.props.header}
                        shareTribe = {this.shareTribe}
                        unshareTribe = {this.unshareTribe}
                        tribeID = {this.props.tribeID}
                        canEdit = {canEdit}
                        alwaysMe = {this.props.alwaysMe}
                        updateLikes = {this.updateLikes}
                        tribeAuthorName = {this.state.tribeAuthorName}
                        tribeAuthorProfilePicture = {this.state.tribeAuthorProfilePicture}
                    />
                    :null
                }
            <View style = {[styles.tribes, {marginTop: marginTop}]}>
                <View style = {styles.topTribes}>
                        <View style = {{width: 200}}>
                        <TextInput
                            style = {styles.goalTitleText}
                            ref= {(el) => { this.name= el; }}
                            value = {myName}
                            placeholder = {"add a title"}
                            editable = {canEdit}
                            onChangeText = {(text) => this.activateEdit(text,'name')}
                        />
                        <View style = {{flexDirection: "row"}}>
                            <Text style = {{fontSize: 20, fontWeight: 500, color: "grey"}}> Goal: </Text>
                            <TextInput
                                style = {{fontSize: 20, fontWeight: 500, color: "blue"}}
                                ref= {(el) => { this.name= el; }}
                                placeholder = {"Add Number"}
                                editable = {canEdit}
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
                        </View>

                        <View style ={{flexDirection: "column", flex: 2, marginTop: -10, marginLeft: -10, marginRight: 0,justifyContent: "flex-end"}}>

                            <TextInput
                                style ={{fontSize: 65, textAlign: "right", fontWeight: "500", marginTop: 5}}
                                placeholder = "0"
                                editable = {canEdit}
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
                    {(canEdit)
                        ?
                        <View style={{flexDirection: "row", justifyContent: "flex-end", flex: 0.2}}>
                            <Menu>
                                <MenuTrigger>
                                    <Icon
                                        style={{margin: 0}}
                                        name={'ellipsis-v'}
                                        color='#3676FF'
                                        disabledStyle={{color: "grey"}}
                                        size={22}
                                    />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => this.makeEditable(true, myName)} text='Edit'/>
                                    <MenuOption onSelect={() => this.setState({fOpen: !fOpen})}>
                                        <Text style={{color: "navy"}}>Make Private </Text>
                                    </MenuOption>
                                    <MenuOption onSelect={() => this.openDeleteConfirm(true)}>
                                        <Text style={{color: 'red'}}>Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                        : null
                    }
                    </View>

                        {/*<Progress.Bar*/}
                        {/*    progress={this.computeProgress(dataList, this.props.endGoal)} width={330} style={{margin: 10, marginBottom: 20}}*/}
                        {/*/>*/}
                        <View>

                {(false)
                    ? null
                    :<View style={{marginTop: -10}}>
                        {(false)
                            ?
                            <View style={{marginTop: 0}}>
                                <AreaChart
                                    style={{height: 90}}
                                    data={dataList}
                                    contentInset={{top: 20, bottom: 5, left: 20, right: 20}}
                                    curve={shape.curveNatural}
                                    svg={{fill: '#186aed'}}
                                >
                                    <Grid/>
                                </AreaChart>
                            </View>
                            : null
                        }
                        <View>
                            <BoxRoot
                                tribeID={this.props.tribeID}
                                filter={this.props.id}
                                handleAddBox={this.handleAddBoxDB}
                                editing={this.state.editing}
                                canEdit={canEdit}
                                sendHeaderMessage={this.sendHeaderMessage}
                            />
                        </View>

                        <View style={{margin: 5, alignItems: "flex-end"}}>
                            {(!this.state.editing)
                                ? null
                                // ? <Text style = {styles.titleDeadlineText}> deadline: {this.props.deadline} </Text>
                                : <View style={{flexDirection: "row", justifyContent: "flex-start",}}>
                                    <Button
                                        style={{width: '100%', marginTop: 0, marginBottom: 0}}
                                        title="Add Milestones"
                                        buttonStyle={{backgroundColor: '#186aed'}}
                                        onPress={() => this.handleAddBoxDB(this.props.id)}
                                    />
                                    <Button
                                        style={{marginLeft: 10}}
                                        title="Save"
                                        buttonStyle={{backgroundColor: '#186aed'}}
                                        onPress={() => this.doneSaving()}
                                    />
                                </View>
                            }
                            <Divider style={{marginTop: 2, marginBottom: 10}}/>
                        </View>
                        <SocialTribeTab/>
                    </View>
                }
                <View style = {{borderTopWidth: 0.5}}>
                    <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style = {{flexDirection: "row", margin: 5}}>
                        <Ionicons
                            name = {'ios-contacts'}
                            color = {this.state.heartIconColor}
                            size = {25}
                            raised = {true}
                        />
                        <Text> 12 </Text>
                        <Ionicons
                            name = {'ios-chatbubbles'}
                            color = {this.state.heartIconColor}
                            size = {25}
                            raised = {true}
                            onPress={()=>this.setState({isCommentOpen: !this.state.isCommentOpen})}
                            style = {{marginLeft: 5}}
                        />
                        <Text> 12 </Text>
                        </View>
                        {/*<Button*/}
                        {/*    icon = {*/}
                        {/*        <Ionicons*/}
                        {/*            name = {'ios-arrow-down'}*/}
                        {/*            color = {this.state.heartIconColor}*/}
                        {/*            size = {25}*/}
                        {/*            onPress={()=> this.openTribe()}*/}
                        {/*            raised = {true}*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    iconRight = {true}*/}
                        {/*    raised*/}
                        {/*    onPress={()=>this.openTribe()}*/}
                        {/*    containerStyle = {{margin: 5, marginTop: -10}}*/}
                        {/*    buttonStyle = {{backgroundColor: "white"}}*/}
                        {/*    title = {'More'}*/}
                        {/*    titleStyle = {{color:"black", marginRight: 5}}*/}
                        {/*/>*/}

                    </View>
                <View style = {{flexDirection: "row",justifyContent: "flex-end"}}>
                    {(this.state.isCommentOpen)
                        ?<CommentTopStack
                            tribeID={this.props.tribeID}
                            tribeAuthorName={this.state.tribeAuthorName}
                            tribeAuthorProfilePicture={this.state.tribeAuthorProfilePicture}
                            userID={this.props.userID}
                            alwaysMe={this.props.alwaysMe}
                        />
                        :null

                    }

                </View>
                </View>
                        </View>


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
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteTribeDB: (tribe) => dispatch(deleteTribeDB(tribe)),
        changeTribeName: (text,index)=> dispatch(changeTribeNameDB(text,index)),
        editMetric: (text,index) => dispatch(changeMetricNameDB(text,index)),
        changeEndGoal: (text,index) => dispatch(changeEndGoal(text, index)),
        addTribeDeadlineDB: (index,deadline) => dispatch(addTribeDeadlineDB(index,deadline)),
        addBoxDB: (box) => dispatch(addBoxDB(box)),
        addFriendToTribeDB: (friend, tribeID) =>dispatch(addFriendToTribeDB(friend, tribeID)),
        addFriendIDToTribeDB: (friendID, tribeID) =>dispatch(addFriendIDToTribeDB(friendID, tribeID)),
        addDataToTribeDB: (index, data, date, insertCol) => dispatch(addDataToTribeDB(index,data,date,insertCol)),
        updateHeader: (index, data) => dispatch(updateHeader(index,data)),
        shareTribeDB: (tribeID, timeStamp) => dispatch(shareTribeDB(tribeID, timeStamp)),
        unshareTribeDB: (tribeID, timeStamp) => dispatch(unshareTribeDB(tribeID, timeStamp)),
        sendNotification: (comment) => dispatch(sendNotification(comment)),

    }
};


export default connect(null, mapDispatchToProps)(TribeComponent);



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

// {(!fOpen)
//     ?null
//     :<TribeGroup friendIDS = {this.props.friendIDS}
//                  friends = {this.props.friends}
//                  open = {fOpen}
//                  closeFriendView = {this.closeFriendView}
//                  tribeID = {this.props.id}
//                  getTribeMembers = {this.props.getTribeMembers}
//                  friendData = {this.props.friendData}
//                  searchData = {this.props.searchData}
//                  addFriendIDToTribe = {this.props.addFriendIDToTribe}
//                  addFriendToTribe = {this.props.addFriendToTribe}
//
//     />
// }

//TOTALS
{/*<View style = {{flexDirection: "row"}}>*/}
{/*    <Text style = {{fontSize: 20, fontWeight: 500, color: "grey"}}> Goal: </Text>*/}
{/*    <TextInput*/}
{/*        style = {{fontSize: 20, fontWeight: 500, color: "blue"}}*/}
{/*        ref= {(el) => { this.name= el; }}*/}
{/*        placeholder = {"Add Number"}*/}
{/*        editable = {canEdit}*/}
{/*        onChangeText = {(text) => this.activateEdit(text,'endGoal')}*/}
{/*        >*/}
{/*        {this.props.endGoal}*/}
{/*    </TextInput>*/}
{/*</View>*/}
{/* <View style = {{flexDirection: "row"}}>*/}
{/*        <Text style = {{fontSize: 20, fontWeight: 500, color: "grey"}}> Total: </Text>*/}
{/*        <Text style = {{fontSize: 20, fontWeight: 500, color: "lightgreen"}}>*/}
{/*            {this.computeTotal(dataList)}*/}
{/*        </Text>*/}
{/* </View>*/}

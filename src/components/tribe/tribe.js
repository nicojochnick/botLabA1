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
import CountDown from 'react-native-countdown-component';


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
import firebase from '@react-native-firebase/app';
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
    deleteTribeDB, sendNotification, shareTribeDB, toggleDoneDB, unshareTribeDB, updateHeader,
} from '../../redux/actions';
import {connect} from 'react-redux';


class TribeComponent extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = firebase.firestore().collection('stepBox');
        this.ref2 = firebase.firestore().collection('users');
        this.ref3 = firebase.firestore().collection('tribes');
        this.user = firebase.auth().currentUser;
        this.closeFriendView = this.closeFriendView.bind(this);
        this.sendHeaderMessage = this.sendHeaderMessage.bind(this);
        this.sendLikeNotification = this.sendLikeNotification.bind(this);
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

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

        this.toggleDoneDB = this.toggleDoneDB.bind(this)

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
            endGoal: this.props.endGoal,
            endGoalChange: false,
            canEdit: true,
            headerMessage: null,
            headerOpen: false,


            didLike: false,
            likedColor: 'white',


            header: this.props.header,

            tribeAuthorName: null,
            tribeAuthorProfilePicture: null,

            isOpen: false,
            isCommentOpen: false,
            tribeColor: '#186aed'
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
        this.props.shareTribeDB(this.props.id, timeStamp)
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
        this.setState({didLike: true});
        header.likes.push(userID);
        this.sendLikeNotification();
        this.props.updateHeader(tribeID, header)

    }

    sendLikeNotification(){
        let like = {
            message : "liked your goal - " + this.state.name,
            fromUserID : this.props.alwaysMe,
            toUserID: this.props.userID,
            timeStamp: moment().format(),
            action: "like",
            accepted: false,
        };

        this.props.sendNotification(like)
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

    updateHeader(tribeID, data, type, stepName) {
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
        if (type === 'milestone'){
            message = stepName;
            send.message = message;
            this.props.updateHeader(tribeID, send)
            this.setState({header:send, didLike: false, likeColor: "white"})
        }
    }

    toggleDoneDB(id, boxID, name){
        if (this.state.canEdit) {
            this.props.toggleDoneDB(id, boxID);
            this.updateHeader(this.props.tribeID, 0, 'milestone', name)
            this.shareTribe()
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
            console.log("HERE")
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
                this.setState({endGoalChange: true});
                this.setState({endGoal: data})
        }

    }

    goLive(){
        this.props.shareTribe()

    }

    componentDidMount(): void {
        if (this.props.user.user.userID !== this.props.userID){
            this.setState({canEdit: false })
        }
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.unsubscribe = this.ref2.onSnapshot(this.onCollectionUpdate);
        this.unsubscribe = this.ref3.onSnapshot(this.onCollectionUpdate);

        // this.props.getTribeMembers(this.props.friendIDS);
        let currData = this.props.cData[this.props.cData.length - 1];
        this.checkDate(currData);
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        firebase.firestore().collection('users').where('userID', '==', this.props.userID).get().then((snapshot) => {
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(documentSnapshot.data());
                    return documentSnapshot.data()
                });
                let user = data[0];
                this.setState({tribeAuthorName: user.name});
                this.setState({tribeAuthorProfilePicture: user.photoURL});
            }
        );
        this.ref.where("tribeID", '==',this.props.tribeID).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ boxData: data, loading: false })
        });

        this.ref3.where("id", '==',this.props.id).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            })
            console.log(data)
            this.setState(
                {
                    name: data[0].name
                })
        });

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
        let dataList = [];
        let currData = [0];
        currData = this.props.cData[this.props.cData.length - 1];
        this.props.cData.map(function (item) {
            dataList.push(item.data)
        });

        let marginTop = -25;

        return (
            <View style = {{marginTop:10}}>
                {(this.props.header)
                    ?<TribeHeader
                        didLike = {this.state.didLike}
                        likeColor = {this.state.likeColor}
                        isPosted={this.props.isPosted}
                        posted = {this.props.posted}
                        isPublic = {this.props.isPublic}
                        header = {this.props.header}
                        shareTribe = {this.shareTribe}
                        unshareTribe = {this.unshareTribe}
                        tribeID = {this.props.tribeID}
                        canEdit = {canEdit}
                        userID = {this.props.userID}
                        alwaysMe = {this.props.alwaysMe}
                        updateLikes = {this.updateLikes}
                        tribeAuthorName = {this.state.tribeAuthorName}
                        tribeAuthorProfilePicture = {this.state.tribeAuthorProfilePicture}
                    />
                    :null
                }
            <View style = {[styles.tribes, {marginTop: marginTop, padding: 0, backgroundColor: "#3E4145"}]}>
                    <View style = {{flexDirection: "row", justifyContent: "flex-start", margin: 5, width: '100%',}}>
                        <View style = {{flex: 1, flexDirection: "column", width: '100%', alignContent: "flex-start", justifyContent: "flex-start"}}>
                        <TextInput
                            style = {styles.goalTitleText}
                            ref= {(el) => { this.name= el; }}
                            value = {this.state.name}
                            placeholder = {"add a title!"}
                            editable = {canEdit}
                            onChangeText = {(text) => this.activateEdit(text,'name')}
                        />
                        <View style = {{flexDirection: "column", width: '100%', marginTop: 3}}>
                            <View style = {{flexDirection: "row"}}>
                            <Text style = {{fontWeight: 500, fontSize: 16, color: "white", textAlign: "left", marginTop: 0}}>GOAL:  </Text>
                            <TextInput
                                    style = {{fontSize: 16, fontWeight: 700, color: 'white'}}
                                    ref= {(el) => { this.name= el; }}
                                    placeholder = {"ADD"}
                                    value = {this.state.endGoal}
                                    editable = {canEdit}
                                    onChangeText = {(text) => this.activateEdit(text,'endGoal')}
                                />
                            </View>
                            <Text style = {{fontWeight: 600, fontSize: 16, color: "#5BADFF", textAlign: "left", marginTop: 0}}>TOTAL: {this.computeTotal(dataList)}</Text>

                        </View>
                        </View>
                        <View style ={{ flexDirection: "row", width: '30%', justifyContent: "flex-end", alignItems: 'flex-start', marginTop: 0, marginRight: 5}}>
                            {(canEdit)
                                    ?
                                    <View style = {{flexDirection:"row", justifyContent: "center"}}>
                                        <Menu>
                                            <MenuTrigger>
                                                <Ionicons
                                                    style={{margin: 7}}
                                                    name={'ios-settings'}
                                                    color={this.state.tribeColor}
                                                    disabledStyle={{color: "grey"}}
                                                    size={30}
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

                                            {(!this.state.editing)
                                                ? null
                                                // ? <Text style = {styles.titleDeadlineText}> deadline: {this.props.deadline} </Text>
                                                : <View style={{flexDirection: "row", justifyContent: "center",}}>
                                                    <Button
                                                        title="Save"
                                                        buttonStyle={{backgroundColor: '#186aed'}}
                                                        onPress={() => this.doneSaving()}
                                                    />
                                                </View>
                                            }
                                            <Divider style={{marginTop: 2, marginBottom: 0}}/>
                                    </View>
                                    : null
                                }
                        </View>
                    </View>
                <View>
                    <View>
                    <View style = {{flexDirection: "row", justifyContent: "space-around"}}>
                        <View style = {{flexDirection: "column", shadowOffset: {width: 0, height: 2}, shadowColor:"black", shadowOpacity: 2, margin: 2,padding: 5,width: '30%'}}>
                            <TextInput
                                style ={{fontSize: 35, textAlign: "center", fontWeight: 600, marginTop: 0, color: "white"}}
                                placeholder = "0"
                                editable = {canEdit}
                                onChangeText = {(text) => this.activateEdit(text,'metric')}
                            >
                                {currData.data}
                            </TextInput>
                            <Divider/>
                            <Text style = {{fontWeight: 600, fontSize: 15, color: "white", textAlign: "center", marginTop: 5}}>TODAY </Text>
                        </View>
                        <View style={{width: 250, marginTop: -20, marginBottom: -10,
                            borderRadius: 5, padding: 2, borderWidth: 0,
                            shadowOffset: {width: 0, height: 2}, shadowColor:"black"}}>
                        {(dataList.length > 1)
                            ?
                            <AreaChart
                                style={{width: 240, height: 90}}
                                data={dataList}
                                contentInset={{top: 10, bottom: 10, left: 5, right: 5}}
                                curve={shape.curveNatural}
                                svg={{fill: '#186aed'}}
                            >
                                <Grid/>
                            </AreaChart>
                            : null
                        }
                        </View>

                        <View>
                        </View>
                    </View>
                        <View>
                            <BoxRoot
                                toggleDoneDB = {this.toggleDoneDB}
                                tribeID={this.props.tribeID}
                                filter={this.props.id}
                                handleAddBox={this.handleAddBoxDB}
                                editing={this.state.editing}
                                canEdit={canEdit}
                                sendHeaderMessage={this.sendHeaderMessage}
                            />
                        </View>
                    </View>
                <View style = {{borderTopWidth: 0.2}}>
                <View style = {{flexDirection: "row", backgroundColor: "#2D3861", width: '100%', justifyContent: "center",}}>
                    <CommentTopStack
                        tribeName = {this.state.name}
                        isCommentOpen = {this.state.isCommentOpen}
                        tribeID={this.props.tribeID}
                        tribeAuthorName={this.state.tribeAuthorName}
                        tribeAuthorProfilePicture={this.state.tribeAuthorProfilePicture}
                        userID={this.props.userID}
                        alwaysMe={this.props.alwaysMe}
                    />

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

const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});


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
        toggleDoneDB: (id, boxID) => dispatch(toggleDoneDB(id, boxID)),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TribeComponent);



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


//TIMER
{/*<CountDown*/}
{/*    until={10000000}*/}
{/*    onFinish={() => alert('finished')}*/}
{/*    onPress={() => alert('hello')}*/}
{/*    digitStyle={{backgroundColor: '#FFF', borderRadius: 5, borderBottomWidth: 0,shadowColor: "grey",*/}
{/*        shadowOffset: {width: 0, height: 2},*/}
{/*        shadowOpacity: 5,}}*/}
{/*    digitTxtStyle={{color: this.state.tribeColor}}*/}
{/*    timeLabelStyle={{color: this.state.tribeColor, fontWeight: 'bold'}}*/}
{/*    separatorStyle={{color: this.state.tribeColor}}*/}
{/*    timeToShow={['D', 'H']}*/}
{/*    size={20}*/}

{/*/>*/}




{/*<TextInput*/}
{/*    style ={{fontSize: 65, textAlign: "right", fontWeight: "500", marginTop: 5}}*/}
{/*    placeholder = "0"*/}
{/*    editable = {canEdit}*/}
{/*    onChangeText = {(text) => this.activateEdit(text,'metric')}*/}
{/*>*/}
{/*    {currData.data}*/}
{/*</TextInput>*/}
{/*<View style = {{flexDirection: 'row', flex: 1, alignContent: "flex-end", justifyContent: "flex-end", marginTop: -5}}>*/}
{/*<TextInput*/}
{/*    style={{fontSize: 15, textAlign: "right", marginTop: 5}}*/}
{/*    placeholder = "add a metric"*/}
{/*    onChangeText = {(text) => this.activateEdit(text,'metricName')}*/}
{/*>*/}
{/*    {this.props.metricName}*/}
{/*</TextInput>*/}
{/*<Text style = {{textAlign: "right", marginTop: 5, marginRight: 0, }}> Today </Text>*/}
{/*</View>*/}

{/*<View style = {{flexDirection: "row", backgroundColor: "lightgrey", borderRadius: 10, padding: 10}}>*/}
{/*    /!*<TextInput*!/*/}
{/*    /!*    style = {{fontSize: 15, fontWeight: 500, color: "black"}}*!/*/}
{/*    /!*    ref= {(el) => { this.name= el; }}*!/*/}
{/*    /!*    placeholder = {"add description!"}*!/*/}
{/*    /!*    editable = {canEdit}*!/*/}
{/*    /!*    multiline = {true}*!/*/}
{/*    /!*    onChangeText = {(text) => this.activateEdit(text,'description')}*!/*/}
{/*    /!*>*!/*/}
{/*    /!*    {this.props.endGoal}*!/*/}
{/*    /!*</TextInput>*!/*/}
{/*    <View/>*/}

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


{/*<TextInput*/}
{/*    style={{fontSize: 20, marginTop: 0}}*/}
{/*    placeholder = "ADD A METRIC"*/}
{/*    onChangeText = {(text) => this.activateEdit(text,'metricName')}*/}
{/*    >*/}
{/*        {this.props.metricName}*/}
{/*</TextInput>*/}

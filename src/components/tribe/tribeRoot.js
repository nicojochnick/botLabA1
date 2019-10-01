import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, KeyboardAvoidingView,Text, ActivityIndicator} from 'react-native';
import {styles} from '../theme';
import TribeComponent from './tribe';
import {connect} from 'react-redux';
import moment from 'moment';
import * as firebase from 'react-native-firebase';
import {
    addBox,
    deleteBox,
    changeTribeName,
    deleteTribe,
    addTribeDeadline,
    changeMetricNameDB,
    addTribeDB,
    deleteTribeDB,
    changeTribeNameDB,
    addTribeDeadlineDB,
    addBoxDB,
    addFriendToTribe,
    addFriendToTribeDB,
    addFriendIDToTribeDB, addDataToTribeDB, changeEndGoal, updateHeader, shareTribeDB,
} from '../../redux/actions';

const tribesSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};


class TribeRoot extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = firebase.firestore().collection('tribes');
        this.ref2 = firebase.firestore().collection('users');

        this.addTribeDeadline = this.addTribeDeadline.bind(this);
        this.changeTribeName = this.changeTribeName.bind(this);
        this.computeProgress = this.computeProgress.bind(this);

        this.updateHeader = this.updateHeader.bind(this);
        this.shareTribe = this.shareTribe.bind(this);

        this.handleAddBoxDB = this.handleAddBoxDB.bind(this);
        this.handleDeleteTribeDB = this.handleDeleteTribeDB.bind(this);
        this.changeTribeNameDB = this.changeTribeNameDB.bind(this);
        this.addTribeDeadlineDB = this.addTribeDeadlineDB.bind(this);
        // this.getTribeMembers = this.getTribeMembers.bind(this);
        //
        // this.addFriendToTribeDB = this.addFriendToTribeDB.bind(this);
        // this.addFriendIDToTribeDB = this.addFriendIDToTribeDB.bind(this);
        this.addDataToTribeDB = this.addDataToTribeDB.bind(this);

        this.editMetric = this.editMetric.bind(this);
        this.changeEndGoal = this.changeEndGoal.bind(this);


        this.state = {
            //flat list accepts an array of object
            loading: true,
            tribeData: [],
            friendData: [],
            searchData: null,
        };
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

    shareTribe(tribeID){
        let timeStamp = moment().format();
        this.props.shareTribeDB(tribeID, timeStamp)
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


    changeTribeName(text, index) {
        this.props.dispatch(changeTribeName(text, index))
    }

    changeTribeNameDB(text, index) {
        this.props.changeTribeName(text, index)
    }

    editMetric(text,index) {
        this.props.editMetric(text,index)
    }

    handleDeleteTribe(tribeID) {
        this.props.dispatch(deleteTribe(tribeID))
    }

    handleDeleteTribeDB(tribeID) {
        this.props.handleDeleteTribeDB(tribeID);

    }
    addTribeDeadline(index, date) {
        this.props.dispatch(addTribeDeadline(index, date))
    }

    addTribeDeadlineDB(index, deadline) {
        this.props.addTribeDeadlineDB(index, deadline)
    }

    updateHeader(tribeID, data, type) {
        console.log(data);
        let message = '';
        let timeStamp = moment().format();
        let send = {message: message, timeStamp: timeStamp};
        if (type === 'addedData') {
            let num = data.number;
            console.log(num);
            let metric = data.metricName;
            if (metric) {message = 'did ' + num + " " +metric+ " today!"}
            else { message = 'add a metric to your goal!'}
            send.message = message;
            this.props.updateHeader(tribeID, send)
        }
    }

    addDataToTribeDB(index, data, date, insertCol, metric){
        this.props.addDataToTribeDB(index, data, date, insertCol);
        console.log(data)
        let num = data;
        if (data > 0 && insertCol === false ) {
            let data = {number: num, metricName: metric};
            this.updateHeader(index, data, 'addedData')
        }
    }

    computeOverAllProgress(tribeID) {

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

    getMyTribes() {
        // db.settings({ timestampsInSnapshots: true});
        this.ref.where("userID", '==', this.props.filter).get().then((snapshot) => {
            let data = snapshot.docs.map(function (documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({tribeData: data})

        });
    }

    changeEndGoal(text, tribeID){
        this.props.changeEndGoal(text,tribeID)
    }


    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    //TODO Filter by timestamp ID, not FIREBASE ID
    onCollectionUpdate = (snapshot) => {
        console.log("TAKING UPDATE");
        console.log(this.props.friendTribeView);
        console.log(this.props.filter);

        this.ref.where("userID", '==', this.props.filter).get().then((snapshot) => {
            console.log("gettingData");
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data())
                return documentSnapshot.data()
            });
            this.setState({tribeData: data, loading: false})
        });
        console.log("here!");

        if (!this.props.coreUserID == null) {
            this.ref.where('friendIDS', 'array-contains', this.props.coreUserID).get().then((snapshot) => {
                console.log("here???");
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(snapshot);
                    return documentSnapshot.data()
                });
                data = this.state.tribeData + data;
                this.setState({tribeData: data, loading: false})
            });
        }

    };

    render() {

        let loading = this.state.loading;
        return (
            <View>
                { !(loading)
                    ? <View>

                    { (!this.state.tribeData.length < 1)
                    ?<KeyboardAvoidingView>
                        <FlatList style={styles.bottomContainer}
                                  data={this.state.tribeData}
                                  listKey={(item, index) => 'D' + index.toString()}
                                  renderItem={({item}) => (
                                      <TribeComponent
                                          listKey={(item, index) => 'D' + index.toString()}
                                          name={item.name}
                                          userID = {item.userID}
                                          author={item.author}
                                          info={item.info}
                                          id={item.id}
                                          header = {item.header}
                                          deadline={item.deadline}
                                          tribeID={item.id}
                                          friendIDS={item.friendIDS}
                                          friends={item.friends}
                                          cData = {item.continuousData}
                                          metricName = {item.metricName}
                                          endGoal = {item.endGoal}

                                          tribeAuthorName = {this.props.name}
                                          tribeAuthorProfilePicture = {this.props.profilePicture}

                                          addFriendToTribe={this.addFriendToTribeDB}
                                          addFriendIDToTribe={this.addFriendIDToTribeDB}

                                          alwaysMe = {this.props.alwaysMe}


                                          changeEndGoal = {this.changeEndGoal}
                                          friendData={this.state.friendData}
                                          changeMetricName = {this.editMetric}
                                          handleAddBox={this.handleAddBoxDB}
                                          computeProgress={this.computeProgress}
                                          addTribeDeadline={this.addTribeDeadlineDB}
                                          handleDeleteTribe={this.handleDeleteTribeDB}
                                          changeTribeName={this.changeTribeNameDB}
                                          getTribeMembers={this.getTribeMembers}
                                          addDataToTribe = {this.addDataToTribeDB}
                                          updateHeader = {this.updateHeader}
                                          searchData={this.state.searchData}
                                          shareTribe = {this.shareTribe}
                                      />)}
                        />
                    </KeyboardAvoidingView>

                    : <View>
                            {(!this.props.friendTribeView)
                                ?
                            <View style = {{ flexDirection: "row",margin: 30,justifyContent: "center"}}>
                            <Text style = {{ fontSize: 15, textAlign: "center",fontWeight: "bold", color: 'grey' }}> No goals 🤔 {"\n"} click the "+" button to add one! </Text>
                            </View>
                            : null
                        }

                    </View>
                }
                    </View>
                    : <ActivityIndicator style = {{margin: 30}} size="large" color="#0000ff" />
                }
            </View>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
    storeTribes: tribesSelector(state.tribes.byHash), rstoreSteps:  tribesSelector(state.steps.byHash),
    state: state
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
        shareTribeDB: (tribeID, timeStamp) => dispatch(shareTribeDB(tribeID, timeStamp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TribeRoot);

TribeRoot.propTypes = {};




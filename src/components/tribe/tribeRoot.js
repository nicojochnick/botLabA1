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
    addFriendIDToTribeDB, addDataToTribeDB,
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


        this.handleAddBoxDB = this.handleAddBoxDB.bind(this);
        this.handleDeleteTribeDB = this.handleDeleteTribeDB.bind(this);
        this.changeTribeNameDB = this.changeTribeNameDB.bind(this);
        this.addTribeDeadlineDB = this.addTribeDeadlineDB.bind(this);
        this.getTribeMembers = this.getTribeMembers.bind(this);

        this.addFriendToTribeDB = this.addFriendToTribeDB.bind(this);
        this.addFriendIDToTribeDB = this.addFriendIDToTribeDB.bind(this);
        this.addDataToTribeDB = this.addDataToTribeDB.bind(this);

        this.editMetric = this.editMetric.bind(this);



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

    handleAddBoxDB(tribeID) {
        const genericBox = {
            name: "add a title",
            id: moment().format(),
            tribeID: tribeID,
            open: false,
            info: "add a description",
            steps: [],
            deadline: null
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

    addDataToTribeDB(index,data,date){
        this.props.addDataToTribeDB(index, data,date)

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

    getTribeMembers(friendIDS) {
        let fData = [];
        firebase.firestore().collection('users').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data().userID);
                if (friendIDS.includes(doc.data().userID)) {
                    let name = doc.data().name;
                    let picture = doc.data().photoURL;
                    let userID = doc.data().userID;
                    let user = {picture: picture, name: name, userID: userID};
                    fData.push(user)
                }
            });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        this.setState({friendData: fData})
    }

    addFriendToTribeDB(friend, TribeID){
       this.props.addFriendToTribeDB(friend,TribeID)
    };

    addFriendIDToTribeDB(friendID, TribeID){
        this.props.addFriendIDToTribeDB(friendID,TribeID)
    };


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
        if (this.props.friendTribeView && this.props.filter !== null) {
            console.log("here!");
            this.ref.where('friendIDS', 'array-contains', this.props.filter[0]).get().then((snapshot) => {
                console.log("here???");
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(snapshot);
                    return documentSnapshot.data()
                });
                console.log(data);
                this.setState({tribeData: data, loading: false})
            });
        } else {
            this.ref.where("userID", '==', this.props.filter).get().then((snapshot) => {
                console.log("gettingData");
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(documentSnapshot.data())
                    return documentSnapshot.data()
                });
                this.setState({tribeData: data, loading: false})
            });
        }

    };

    render() {
        this.editMetric("hi", 1);
        console.log(this.state.tribeData);
        console.log(this.props.filter);
        console.log(this.props.friendTribeView);
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
                                          author={item.author}
                                          info={item.info}
                                          id={item.id}
                                          deadline={item.deadline}
                                          tribeID={item.id}
                                          friendIDS={item.friendIDS}
                                          friends={item.friends}
                                          cData = {item.continuousData}
                                          metricName = {item.metricName}

                                          addFriendToTribe={this.addFriendToTribeDB}
                                          addFriendIDToTribe={this.addFriendIDToTribeDB}


                                          friendData={this.state.friendData}
                                          changeMetricName = {this.editMetric}
                                          handleAddBox={this.handleAddBoxDB}
                                          computeProgress={this.computeProgress}
                                          addTribeDeadline={this.addTribeDeadlineDB}
                                          handleDeleteTribe={this.handleDeleteTribeDB}
                                          changeTribeName={this.changeTribeNameDB}
                                          getTribeMembers={this.getTribeMembers}
                                          addDataToTribe = {this.addDataToTribeDB}
                                          searchData={this.state.searchData}
                                      />)}
                        />
                    </KeyboardAvoidingView>

                    : <View style = {{ flexDirection: "row",margin: 30,justifyContent: "center"}}>
                            <Text style = {{ fontSize: 15, textAlign: "center",fontWeight: "bold", color: 'grey' }}> No goals 🤔 {"\n"} click the "+" button to add one! </Text>
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
        addTribeDeadlineDB: (index,deadline) => dispatch(addTribeDeadlineDB(index,deadline)),
        addBoxDB: (box) => dispatch(addBoxDB(box)),
        addFriendToTribeDB: (friend, tribeID) =>dispatch(addFriendToTribeDB(friend, tribeID)),
        addFriendIDToTribeDB: (friendID, tribeID) =>dispatch(addFriendIDToTribeDB(friendID, tribeID)),
        addDataToTribeDB: (index, data, date) => dispatch(addDataToTribeDB(index,data,date)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TribeRoot);

TribeRoot.propTypes = {};




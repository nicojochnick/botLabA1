import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {addBox, addBoxDB, addTribe, addTribeDB} from '../../redux/actions';
import moment from "moment";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';




// import firestore from '@react-native-firebase/firestore';


const genericTribe = {
    name: "add a title",
    id: moment().format(),
    userIDs: [],
    open: false,
    info: "add a description",
    deadline: null,
};


let user = firebase.auth().currentUser;
let name, email, photoUrl, uid, emailVerified;

if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
}




class AddTribe extends Component {

    constructor(props) {
        super(props);
    }


    handleAddTribe() {
        const genericTribe = {
            name: "add a title",
            id: moment().format(),
            userIDs: [],
            open: false,
            info: "add a description",
        };
        //dispatch two actions -> 1. ) create generic step in step database, 2.) add step to child feature of the correct step.
        this.props.dispatch(addTribe(genericTribe));
    }

    handleAddTribeDB() {
        let friendIDs = this.props.friendIDs.concat(this.props.alwaysMe)
        const genericTribe = {
            name: null,
            id: moment().format(),
            userID: this.props.userID,
            author: name,
            groupID: this.props.groupID,
            friendIDs: friendIDs,
            continuousData: [{date: null, data:0}, {date : moment().format("MMM D YY"), data: 0}],
            metricName: null,
            info: "add a description",
            deadline: null,
            total: null,
            endGoal: null,
            update: null,
            posted:  moment().format(),
            header: {message: "", likes: []},
            isPublic: false,
            isPosted: false,
        };
        this.props.addTribeDB(genericTribe);
        this.handleAddBoxDB(genericTribe.id)
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

    componentDidMount(): void {
        console.log(this.props.friendIDs);
        console.log(this.props.alwaysMe)

    }

    getUser(){
            let UData = [];
            firebase.firestore().collection('users').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if (friendIDS.includes(doc.data().userID)) {
                        let name = doc.data().name;
                        let picture = doc.data().photoURL;
                        let userID = doc.data().userID;
                        let user = {picture: picture, name: name, userID: userID};
                        UData.push(user)
                    }
                });
            })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
            this.setState({UserData: UData})
        }

    render() {
        return (
            <Button
                icon = {<Ionicons style = {{marginRight: 0}}
                                  name = {'ios-add'}
                                  color = '#3676FF'
                                  disabledStyle = {{color:"grey"}}
                                  size = {70}
                                  onPress = {() => this.handleAddTribeDB()}/> }
                type = "clear"
                onPress = {() => this.handleAddTribeDB()}

            />
        );
    }
}

AddTribe.propTypes = {};

const mapDispatchToProps = (dispatch) => {
    return {
        addTribeDB: (tribe) => dispatch(addTribeDB(tribe)),
        addBoxDB: (box) => dispatch(addBoxDB(box)),
    }
};

export default connect(null, mapDispatchToProps)(AddTribe);

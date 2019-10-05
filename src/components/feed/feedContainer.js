import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, FlatList, View} from 'react-native';
import TribeRoot from '../tribe/tribeRoot';
import * as firebase from "react-native-firebase";
import FeedRootComponent from './feedRootComponent';
// Basic IDEA: fetch all tribes by my id and friend id that have a timestamp in posted field, sort by most recent time first
class FeedContainer extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.state = {
            filter: null,
            tribeData: null,
        }
    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        console.log(this.props.friendIDs)
        let len = this.props.friendIDs.length
        let i = 0
        let alldata = []
        while (i < len) {
            //pull all posted tribes of currUSer ID FriendList and sort them by least to most recent
            this.ref.where('id', '==', this.props.friendIDs[i]).get().then((snapshot) => {
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(data);
                    return documentSnapshot.data()
                });
                console.log(data);
                data = data.filter(x => x.header.timeStamp !== false);
                console.log(data);
                alldata.push(data)

            });
            i = i + 1

        }
        this.setState({data: alldata})

    };


    render() {
        console.log(this.props.friendIDs);
        console.log(this.props.friendIDs.length>0);
        console.log(this.props.alwaysMe)
        return (
            <FlatList
                initialNumToRender={10}
                data={this.state.data}
                getItem={null}
                renderItem={null}
            />

    );
    }
}

FeedContainer.propTypes = {};

export default FeedContainer;



{/*  <TribeRoot*/}
{/*    isFeed = {true}*/}
{/*    filter = {this.state.alwaysMe}*/}
{/*    friendIDs = {this.props.friendIDs}*/}
{/*    notMe = {this.state.notMe}*/}
{/*    coreUserID={this.state.coreUserID}*/}
{/*    alwaysMe = {this.state.alwaysMe}*/}
{/*    name = {this.state.name}*/}
{/*    friendTribeView = {true}*/}
{/*/>*/}

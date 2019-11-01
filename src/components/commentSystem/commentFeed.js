import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, ScrollView} from 'react-native'
import CommentContainer from './commentContainer';
import firebase from '@react-native-firebase/app';


//Comment Structure

class CommentFeed extends Component {
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('comments');
        this.state = {
            tribeComments: [],
            loading: true
        };
    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        this.ref.where("tribeID", '==', this.props.tribeID).get().then((snapshot) => {
            console.log("gettingData");
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data())
                return documentSnapshot.data()
            });
            this.props.checkLength(data.length)
            this.setState({tribeComments: data, loading: false})
        });
    };

    render() {
        let data = this.state.tribeComments
        data = data.sort((a,b) =>  new Date(b.timeStamp) - new Date(a.timeStamp));
        let height = 150
        if (this.props.isCommentOpen === false){
            height= 0
        }
        if (data.length === 0){
            height = 0

        }
        return (
            <ScrollView style = {{height: height, borderTopWidth: 1, borderColor: "white", margin: 0, paddingTop: 0}}>
            <FlatList
                data = {data}
                renderItem={({item}) => (
                    <CommentContainer
                        message = {item.message}
                        userID = {item.userID}
                        userName = {item.userName}
                        userPhoto = {item.userPhoto}
                        tribeID = {item.tribeID}
                        commentID = {item.commentID}
                        timestamp = {item.timestamp}
                        alwaysMe = {this.props.alwaysMe}
                        tribeUserID = {this.props.userID}
                    />
                    )
                }
            />
            </ScrollView>
        );
    }
}

CommentFeed.propTypes = {};

export default CommentFeed;

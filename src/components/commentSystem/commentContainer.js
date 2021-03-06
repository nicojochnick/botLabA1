import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './commentComponent';
import {connect} from 'react-redux';
import CommentFeed from './commentFeed';
import {View} from 'react-native'
import AddComment from './addComment';
import moment from 'moment'
import {deleteCommentDB, postCommentDB, sendNotification} from '../../redux/actions';
import firebase from '@react-native-firebase/app';


//All writes, to the store,
//Functions:
//
// Edit Comment
//Delete Interaction
// Like Interaction
//


class CommentContainer extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = firebase.firestore().collection('users');
        this.postComment = this.postComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.state = {
            isMe: false,
            userPhoto: null,
            username: null,
            showDelete: true

        }
    }

    //TODO ADD CORRECT TOUSERID

    sendCommentNotification(){
        let message = '';
        if (this.props.tribeName){
            message = this.props.tribeName
        }
        let comment = {
            message : "commented on your board " + message,
            fromUserID : this.props.alwaysMe,
            toUserID: this.props.userID,
            timeStamp: moment().format(),
            action: "comment",
            accepted: false,
        };
        this.props.sendNotification(comment)
    }

    postComment(text, userName, userPhoto) {
        let user = firebase.auth().currentUser;

        let comment = {
            type: null,
            message: text,
            userName: userName,
            userPhoto: userPhoto,
            userID: this.props.alwaysMe,
            tribeID: this.props.tribeID,
            commentID: moment().format(),
            timeStamp: moment().format(),
        };

        console.log(comment);

        this.props.postCommentDB(comment);
        if(this.props.userID !== user.uid){
            this.sendCommentNotification( )
        }
    }

    deleteComment() {
        this.props.deleteCommentDB(this.props.commentID)
    }

    getUser(userID) {
        let isMe = false
        // if (userID === this.props.alwaysMe) {
        //     this.setState({isMe: true})
        //     isMe = true
        // }
        let userPhoto = null;
        let username = null;
        if (false) {
            userPhoto = this.user.photoURL;
            username = this.user.displayName;
            this.setState({username: username});
            this.setState({userPhoto: userPhoto});
        } else {
            firebase.firestore().collection('users').where('userID', '==', userID).get().then((snapshot) => {
                let data = snapshot.docs.map(function (documentSnapshot) {
                    console.log(documentSnapshot.data());
                    return documentSnapshot.data()
                });
                console.log(data);
                let user = data[0];
                userPhoto = user.photoURL;
                username = user.name;
            });
            this.setState({username: username});
            this.setState({userPhoto: userPhoto});

        }
    }

    componentDidMount(): void {
        // this.getUser(this.props.userID)
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        if (this.props.alwaysMe !== this.props.userID && this.props.alwaysMe !== this.props.tribeUserID){
            this.setState({showDelete: false})
        }
    }


    componentWillUnmount(): void {
        this.unsubscribe();
    }


    onCollectionUpdate = (snapshot) => {
        let search = this.props.userID
        if (this.props.isAddComment) {
            search = this.props.alwaysMe
        }
        if (!this.props.isAddComment) {
            this.ref.where('userID', '==', this.props.userID).get().then((snapshot) => {
                    let data = snapshot.docs.map(function (documentSnapshot) {
                        console.log(documentSnapshot.data());
                        return documentSnapshot.data()
                    });
                    console.log(data);
                    let user = data[0];
                    this.setState({username: user.name});
                    this.setState({userPhoto: user.photoURL});
                }
            );
    } else {
            this.ref.where('userID', '==', this.props.alwaysMe).get().then((snapshot) => {
                    let data = snapshot.docs.map(function (documentSnapshot) {
                        console.log(documentSnapshot.data());
                        return documentSnapshot.data()
                    });
                    console.log(data);
                    let user = data[0];
                    this.setState({username: user.name});
                    this.setState({userPhoto: user.photoURL});
                }
            );
        }
    };

    render() {
        return (
            <View>
            { (this.props.isAddComment)
                ? <AddComment
                    postComment = {this.postComment}
                    userPhoto = {this.state.userPhoto}
                    username = {this.state.username}
                    alwaysMe = {this.props.alwaysMe}
                />
                :<CommentComponent
                    message = {this.props.message}
                    postComment = {this.postComment}
                    alwaysMe = {this.props.alwaysMe}
                    userPhoto = {this.state.userPhoto}
                    username = {this.state.username}
                    deleteComment = {this.deleteComment}
                    isMe = {this.state.isMe}
                    showDelete = {this.state.showDelete}
                />
            }
            </View>
        );
    }
}

// CommentContainer.propTypes = {
//
//     alwaysMe: PropTypes.string,
//     addComment: PropTypes.bool,
//     tribeID: PropTypes.string
//
//
// };

const mapStateToProps = (state /*, ownProps*/) => ({
});

const mapDispatchToProps = (dispatch) => {
    return {
        postCommentDB: (comment) => dispatch(postCommentDB(comment)),
        deleteCommentDB: (commentID) => dispatch(deleteCommentDB(commentID)),
        sendNotification: (comment) => dispatch(sendNotification(comment)),
    }
};

export default connect(null, mapDispatchToProps)(CommentContainer);




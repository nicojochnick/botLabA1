import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './commentComponent';
import {connect} from 'react-redux';
import CommentFeed from './commentFeed';
import {View} from 'react-native'
import AddComment from './addComment';
import moment from 'moment'
import {deleteCommentDB, postCommentDB} from '../../redux/actions';
import * as firebase from "react-native-firebase";


//All writes, to the store,
//Functions:
//
// Edit Comment
//Delete Interaction
// Like Interaction
//


class CommentContainer extends Component {

    constructor(props){
        super(props);
        this.postComment = this.postComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.user = firebase.auth().currentUser;
        this.state = {
            isMe: false,
            userPhoto: null,
            username: null,

        }
    }
    postComment(text){
        let comment = {
            type: null,
            message: text,
            userID: this.props.alwaysMe,
            tribeID: this.props.tribeID,
            commentID: moment().format(),
            timeStamp: moment().format(),
        };

        console.log(comment);

        this.props.postCommentDB(comment);
        console.log("dispatchedInternal")
    }

    deleteComment(){
        this.props.deleteCommentDB(this.props.commentID)
    }

    getUser(userID){
        let isMe = false
        if (userID === this.props.alwaysMe) {
            this.setState({isMe: true})
            isMe = true
        }
        let userPhoto = null;
        let username = null;
        if (isMe){
            userPhoto = this.user.photoURL;
            username = this.user.displayName;
        } else {

        }
        this.setState({username: username});
        this.setState({userPhoto: userPhoto});
    }

    componentDidMount(): void {
        this.getUser(this.props.userID)
    }

    render() {
        return (
            <View>
            { (this.props.isAddComment)
                ? <AddComment
                    postComment = {this.postComment}
                    userPhoto = {this.state.userPhoto}
                    username = {this.state.username}
                />
                :<CommentComponent
                message = {this.props.message}
                postComment = {this.postComment}
                userPhoto = {this.state.userPhoto}
                username = {this.state.username}
                deleteComment = {this.deleteComment}
                isMe = {this.state.isMe}
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
    }
};

export default connect(null, mapDispatchToProps)(CommentContainer);



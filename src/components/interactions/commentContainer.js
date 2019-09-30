import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './commentComponent';
import {connect} from 'react-redux';
import CommentFeed from './commentFeed';
import {View} from 'react-native'
import AddComment from './addComment';
import moment from 'moment'


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
        this.state = {
            isMe: false,
            userPhoto: null,
            username: null,

        }
    }
    postComment(text, tribeID, userID){
        //Make call to comment collection
        let comment = {
            type: null,
            message: null,
            userID: null,
            tribeID: null,
            commentID: null,
            timeStamp: null,
        }
    }

    deleteComment(text){

    }

    getUser(userID){
        let userPhoto = null;
        let username = null;
        this.setState({username: username})
        this.setState({userPhoto: userPhoto})
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
                />
            }
            </View>
        );
    }
}

CommentContainer.propTypes = {};

const mapStateToProps = (state /*, ownProps*/) => ({
});

const mapDispatchToProps = (dispatch) => {
    return {

        postComment: (message, userID) => dispatch.postComment(comment)

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);



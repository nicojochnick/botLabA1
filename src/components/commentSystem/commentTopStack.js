import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native'
import TribeUpdateAdd from '../tribe/tribeUpdateAdd';
import CommentFeed from './commentFeed';
import {sendMessage} from '../../redux/actions';
import {connect} from 'react-redux';
import AddComment from './addComment';
import {styles} from '../theme';
import CommentContainer from './commentContainer';
// Two parts: Add an interaction (anyone in a tribe can do this)
// Root of all previous commentSystem from most recent to least (only show first 5)

class CommentTopStack extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render() {
        console.log(this.props.tribeID)
        console.log(this.props.alwaysMe)
        return (
            <View>
                    <CommentFeed
                        userID = {this.props.userID}
                        tribeID={this.props.tribeID}
                        alwaysMe={this.props.alwaysMe}
                        isCommentOpen = {this.props.isCommentOpen}
                    />

                   <CommentContainer
                       tribeID = {this.props.tribeID}
                       userID = {this.props.userID}
                       alwaysMe = {this.props.alwaysMe}
                       isAddComment = {true} />
            </View>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

CommentTopStack.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTopStack);




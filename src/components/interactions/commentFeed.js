import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native'
import InteractionContainer from './commentContainer';


//Comment Structure

class CommentFeed extends Component {
    render() {

        let mockData = [
            {
                message: "hi",
                userID: 1234
            },
            {
                message: 'hey'
            }
        ];

        return (
            <FlatList
                data = {mockData}
                renderItem={({item}) => (
                    <InteractionContainer
                        message = {item.message}
                        userID = {item.userID}
                        tribeID = {item.tribeID}
                        commentID = {item.commentID}
                        timestamp = {item.timestamp}
                    />
                )
                }
            />
        );
    }
}

CommentFeed.propTypes = {};

export default CommentFeed;

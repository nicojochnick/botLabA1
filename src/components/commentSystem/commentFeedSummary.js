import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentContainer from './commentContainer';
import {FlatList} from 'react-native';

class CommentFeedSummary extends Component {
    render() {
        let numComments = 10;
        let data = this.state.tribeComments


        return (
            <FlatList
                data = {}
                initialNumToRender={numComments}
                renderItem={({item}) => (
                    <ListItem
                        title={item.name}
                        subtitle={item.comment}
                        bottomDivider
                        chevron
                    />
                )
                }
            />
        );
    }
}

CommentFeedSummary.propTypes = {};

export default CommentFeedSummary;

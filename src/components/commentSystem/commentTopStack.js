import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Text} from 'react-native';
import {Button} from 'react-native-elements'
import TribeUpdateAdd from '../tribe/tribeUpdateAdd';
import CommentFeed from './commentFeed';
import {sendMessage} from '../../redux/actions';
import {connect} from 'react-redux';
import AddComment from './addComment';
import {styles} from '../theme';
import CommentContainer from './commentContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Two parts: Add an interaction (anyone in a tribe can do this)
// Root of all previous commentSystem from most recent to least (only show first 5)

class CommentTopStack extends Component {
    constructor(props){
        super(props);
        this.checkLength = this.checkLength.bind(this)
        this.state = {
            openComments: false,
            length: null
        }
    }

    checkLength(l){
        this.setState({length: l})
    }


    render() {
        console.log(this.props.tribeID)
        console.log(this.props.alwaysMe)

        let m = 'Comments'
        if (this.state.length !== 0){
            m = this.state.length + ' view all'
            con = 'ios-chatbubbles'

        }

        let c = '#186aed'
        if (this.state.openComments){
            m = 'Hide'
            c = 'grey'
        }


        return (
            <View>
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style = {{flexDirection: "row", margin: -2}}>
                        <Button
                            title = {m}
                            type = 'clear'
                            onPress={() => this.setState({openComments: !this.state.openComments})}
                            titleStyle = {{color:c, marginLeft: 5}}
                            icon ={
                                <Ionicons
                                     name={con}
                                     color={c}
                                     size={25}
                                     raised={true}
                                     onPress={() => this.setState({openComments: !this.state.openComments})}
                                     style={{marginLeft: 5}}
                                 />
                         }
                        />

                    </View>
                </View>
                <View style = {{backgroundColor: "#2D3861"}}>
                    <CommentFeed
                        userID = {this.props.userID}
                        tribeID={this.props.tribeID}
                        alwaysMe={this.props.alwaysMe}
                        isCommentOpen = {this.state.openComments}
                        checkLength = {this.checkLength}
                    />
                </View>

                   <CommentContainer
                       tribeID = {this.props.tribeID}
                       userID = {this.props.userID}
                       alwaysMe = {this.props.alwaysMe}
                       isAddComment = {true}
                       tribeName = {this.props.tribeName}

                   />

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




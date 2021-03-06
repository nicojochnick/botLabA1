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
        let con = ''

        let m = 'Comments'
        if (this.state.length !== 0 && this.state.length!== null){
            m = this.state.length + ' comments'
            con = 'ios-chatbubbles'

        }

        let c = '#2E6AE6'
        if (this.state.openComments){
            m = 'Hide'
            c = 'grey'
        }


        return (
            <View>
                <View style = {{flexDirection: "row", justifyContent: "flex-start", }}>
                    <View style = {{flexDirection: "row", margin: 0}}>
                        <Button
                            title = {m}
                            type = 'clear'
                            onPress={() => this.setState({openComments: !this.state.openComments})}
                            titleStyle = {{color:c, marginLeft: 5, fontWeight: "bold", fontSize: 18}}
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
                {(this.state.openComments)
                ?
                    <View>
                    <View style = {{backgroundColor: "white"}}>
                    <CommentFeed
                        userIDs = {this.props.userID}
                        tribeID={this.props.tribeID}
                        alwaysMe={this.props.alwaysMe}
                        isCommentOpen = {this.state.openComments}
                        checkLength = {this.checkLength}
                    />
                </View>
                <View style ={{marginBottom: 0,}}>
                        <CommentContainer
                            tribeID={this.props.tribeID}
                            userID={this.props.userID}
                            alwaysMe={this.props.alwaysMe}
                            isAddComment={true}
                            tribeName={this.props.tribeName}

                        />
                </View>
                    </View>
                    :null
                    }

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




import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/index';
import {View, TextInput} from 'react-native'
import {ListItem, Button} from 'react-native-elements';
import { withNavigation,} from 'react-navigation';
import {addFriendIDDB, removeFriendIDDB} from '../../redux/actions';
import {connect} from 'react-redux';

class UserTag extends Component {
    constructor(props){
        super(props )
    }

    navigate(userID, fbID) {
        let way = this.props.route;
        if (way==='home'){
            this.props.navigation.navigate('OtherHome', { notMe: true, friendID: userID, fbID: fbID})
        }
        if (way === 'feed') {
            this.props.navigation.navigate('FriendHome', { notMe: true, friendID: userID, fbID: fbID})
        }

    }

    navigateToProfile(userID, fbID) {
        this.props.navigation.navigate('OtherHome', { notMe: true, friendID: userID, fbID: fbID})
    }

    addFriendIDDB(){
        this.props.addFriendIDDB(this.props.fromUserID,this.props.toUserID,this.props.fbID)
    };

    buttonPress(){
        if (this.props.accepted !== true) {
        this.props.addFriendIDDB(this.props.fromUserID, this.props.toUserID, this.props.fbID)
        }
    }


    render() {
        let button = 'accept'
        let color = '#186aed'
        if (this.props.accepted){
            button = 'accepted'
            color = '#31E781'
        }

        return (
            <ListItem
                style = {{borderWidth: 0.2, borderColor:"grey", margin: 0, padding: 2}}
                titleStyle = {{fontWeight: "500"}}
                title={this.props.name}
                subtitle={this.props.message}
                leftAvatar = {{source: {uri: this.props.avatar}}}
                rightElement = {
                    <View>
                    {(this.props.action === 'friendRequest')
                        ? <Button
                            buttonStyle = {{backgroundColor: color}}
                            title ={button}
                            raised = {true}
                            onPress = {()=> this.buttonPress()}
                        />
                    : null
                    }
                    </View>
                }
                chevron
                onPress = {() => this.navigate(this.props.userID, this.props.fbID)}
            />
        );
    }
}



export default withNavigation(UserTag);

const mapDispatchToProps = (dispatch) => {
    return {
        addFriendIDDB: (friendID, myID, fbID) =>dispatch(addFriendIDDB(friendID, myID)),
        removeFriendIDDB: (friendID, myID, fbID) =>dispatch(removeFriendIDDB(friendID, myID))
    }
};

// export default connect(null, mapDispatchToProps)(UserTag);


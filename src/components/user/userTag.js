import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/index';
import {ListItem, Button} from 'react-native-elements';
import { withNavigation } from 'react-navigation';

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


    render() {
        return (
            <ListItem
                style = {{borderWidth: 0.2, borderColor:"grey", margin: 0, padding: 2}}
                titleStyle = {{fontWeight: "500"}}
                title={this.props.name}
                leftAvatar = {{source: {uri: this.props.avatar}}}

                // rightElement = {
                //     <Button
                //         title ={"action"}
                //         raised = {true}
                //
                //     />
                // }
                chevron
                onPress = {() => this.navigate(this.props.userID, this.props.fbID)}
            />
        );
    }
}

UserTag.propTypes = {};

export default withNavigation(UserTag);

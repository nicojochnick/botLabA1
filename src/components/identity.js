import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import { Avatar } from 'react-native-elements';
import {connect} from "react-redux";


class Identity extends Component {
    render() {
        console.log(this.props.botID.profileImage.uri);

        return (
            <View style = {{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                <Avatar
                    rounded
                    size= "large"
                    source = {{uri:this.props.botID.profileImage.uri }}
                />
            <Text style = {{color: "white", fontSize: 20, alignContent: "center", fontWeight: "bold"}}> {this.props.botID.name} </Text>
            </View>
        );
    }
}

Identity.propTypes = {};

const mapStateToProps = (state) => ({
    botID: state.bot
});



export default connect(mapStateToProps)(Identity);


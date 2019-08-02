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
                    containerStyle = {{marginLeft: 10, borderWidth: 2, borderColor: "white"}}
                    size= "large"
                    source = {{uri:this.props.botID.profileImage.uri }}
                />
            <Text style = {{color: "white", fontSize: 25, alignContent: "center", fontWeight: "bold", margin: 10}}> {this.props.botID.name} </Text>
            </View>
        );
    }
}

Identity.propTypes = {};

const mapStateToProps = (state) => ({
    botID: state.bot
});



export default connect(mapStateToProps)(Identity);


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import { Avatar } from 'react-native-elements';
import {connect} from "react-redux";


class Identity extends Component {
    render() {
        console.log(this.props.botName);

        return (
            <View style = {{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                <Avatar
                    rounded
                    size= "large"
                    source={{
                    }}
                />
            <Text style = {{color: "white", fontSize: 20, alignContent: "center", fontWeight: "500"}}> {this.props.botName} </Text>
            </View>
        );
    }
}

Identity.propTypes = {};

const mapStateToProps = (state) => ({
    botName: state.bot.name,
});



export default connect(mapStateToProps)(Identity);


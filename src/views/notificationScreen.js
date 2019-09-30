import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Text} from 'react-native'

class NotificationScreen extends Component {
    render() {
        return (
            <View>
                <Text style = {{fontWeight: "bold", size: 30}} >
                    Notifications
                </Text>
                <FlatList
                    // maxToRenderPerBatch={}
                    // initialNumToRender={}
                    // windowSize={}
                    // getItemCount={}
                    // keyExtractor={}
                    // data={}
                    // updateCellsBatchingPeriod={}
                    // renderItem={}
                />

            </View>
        );
    }
}

NotificationScreen.propTypes = {};

export default NotificationScreen;

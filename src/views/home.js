import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import BotA1 from '../components/botA1';

class Home extends Component {
    render() {
        return (
            <ScrollView style = {{flex: 1}}>
                <View style = {{height: 500}}>
                    <View style = {{flex: 0.2, backgroundColor: '#5D92FF'}}>
                        <Text style = {{marginTop: 45, marginBottom: 0, fontSize: 45, color: "white", fontWeight: "bold"}}> BotA1 </Text>
                    </View>
                    <View style = {{flex: 0.8}}>
                            <BotA1/>
                    </View>
                </View>
                <View>
                    <Text style = {{marginTop: 45, marginBottom: 0, fontSize: 45, color: "black", fontWeight: "bold"}}> Add Goals </Text>
                </View>
            </ScrollView>
        );
    }
}

Home.propTypes = {};

export default Home;

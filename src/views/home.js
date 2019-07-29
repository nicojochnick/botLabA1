import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native'
import {Card, Button} from 'react-native-elements'
import BotA1 from '../components/botA1';
import GoalBoard from '../components/goalBoard';
import AddGoal from '../components/addGoal';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';


class Home extends Component {
    render() {
        return (
            <View style = {{flex: 1}}>
                <LinearGradient style={{flex: 1}} colors={['#3676FF', '#6161F7']}>
                <View style = {{flex:1}}>
                    <View style = {{flex: 0.3, flexDirection: "row", justifyContent: "space-between",}}>
                            <Text style = {{ marginTop: 45,marginBottom: 0, fontSize: 45, color: "white", fontWeight: "bold"}}> BotA1 </Text>
                            <Ionicons style = {{margin: 30, padding: 15}}
                                      name = {'ios-add'}
                                      color = "white"
                                      disabledStyle = {{color:"grey"}}
                                      size = {60}
                                      onPress = {() => this.props.navigation.navigate('Add')}
                            />
                    </View>
                    <View style = {{flex: 0.7}}>
                            <BotA1/>
                    </View>
                </View>
                </LinearGradient>
                <ScrollView style ={{flex: 1}}>
                    <GoalBoard/>
                </ScrollView>
            </View>
        );
    }
}

Home.propTypes = {};

export default Home;

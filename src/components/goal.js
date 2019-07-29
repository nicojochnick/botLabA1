import {Text, View} from "react-native";
import React from 'react';
import {styles} from './theme'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addDate, addTime, deleteGoal, subtractTime, updateDate} from "../redux/actions";
import {connect} from "react-redux";
import {AreaChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import moment from "moment";

class Goal extends React.Component {


    checkDate() {
        const curDate = moment().format('dddd, MMMM Do');
        if (this.props.date[0] !== curDate) {
            this.props.dispatch(updateDate(this.props.id,curDate));
            this.props.dispatch(addDate(this.props.id))

        }
    }

    testFunction() {
        const curDate = moment().format('dddd, MMMM Do');
        this.props.dispatch(updateDate(this.props.id,curDate));
        this.props.dispatch(addDate(this.props.id))
    }

    handleDelete(){
        console.log(this.props.id);
        this.props.dispatch(deleteGoal(this.props.id))
    }
    printOut(days){
        if (days){
            return days.toString;
        }
        return " no days"
    }

    addTime(){
        //NOTE: You have to dispatch this action with TIME and ID.]
        const length = this.props.data.length;
        const data = this.props.data.slice(-1)[0] + 15;

        this.props.dispatch(addTime(this.props.id, data, length))
    }

    subtractTime(){
        const length = this.props.data.length;
        const data = this.props.data.slice(-1)[0] - 15;
        this.props.dispatch(subtractTime(this.props.id, data, length))
    }

    render() {
        this.checkDate();
        return (
            <View style = {styles.goals}>
                <View style = {styles.topGoals}>
                    <Text style = {styles.goalText}> {this.props.name} </Text>
                    <Text style = {styles.dayText}> {this.props.days.toString()}</Text>
                    <Button
                        icon = {
                            <Icon
                                style = {styles.cardIcon}
                                name= 'chevron-down'
                                color = 'red'
                            />
                        }
                        type='clear'
                        onPress = {() => this.subtractTime()}
                    />
                    <Button
                        icon = {
                            <Icon
                                style = {styles.cardIcon}
                                name= 'chevron-up'
                                color = 'lightgreen'
                            />
                        }
                        onPress = {() => this.addTime()}
                        type='clear'
                    />

                    <Button
                icon = {
                    <Icon
                        style = {styles.cardIcon}
                        name= 'times'
                        color = 'grey'
                    />
                }
                title={ ""}
                type="clear"
                onPress = {() => this.handleDelete()}
            />
            </View>

                <View>
                    <Text style = {styles.dayText}> {this.props.data.slice(-1)[0]} minutes</Text>
                </View>


                <View>
                <AreaChart
                    style={{ height: 100 }}
                    data={ this.props.data }
                    contentInset={{ top: 20, bottom: 5, left: 20, right: 20}}
                    curve={ shape.curveNatural }
                    svg={{ fill: '#6161F7' }}
                >
                    <Grid/>
                </AreaChart>
                </View>
            </View>
        );
    }
}

export default connect()(Goal)



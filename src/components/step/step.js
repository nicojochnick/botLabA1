import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {styles} from '../theme'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addDate, addTime, deleteStep, subtractTime, toggleOpen, updateDate} from '../../redux/actions';
import {connect} from "react-redux";
import {AreaChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import moment from "moment";

class Step extends React.Component {

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
        this.props.dispatch(deleteStep(this.props.id))
    }
    printOut(days){
        if (days){
            return days.toString;
        }
        return " no days"
    }

    handleSwitch(){
        //change switch binary
        this.props.dispatch(toggleOpen(this.props.id))
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
        console.log(this.props);
        this.checkDate();
        return (
            <View style = {styles.goals}>
                <View style = {styles.topGoals}>
                    <Text style = {styles.goalText}> {this.props.name} </Text>
                    <Button
                icon = {
                    <Icon
                        style = {styles.cardIcon}
                        name= 'eye'
                        color = '#3676FF'
                    />
                }
                title={ ""}
                type="clear"
                onPress = {() => this.handleSwitch()}
            />
                </View>

                { (this.props.open)
                    ? <Text> OPEN SESEME</Text>
                    : null
                }
            </View>
        );
    }
}

export default connect()(Step)



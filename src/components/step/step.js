import {FlatList, Text, View, TextInput} from 'react-native';
import React from 'react';
import {styles} from '../theme'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addDate, addTime, changeStepName, deleteStep, subtractTime, toggleOpen, updateDate} from '../../redux/actions';
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

    changeStepName(text){
        this.props.dispatch(changeStepName(text, this.props.id));
    }

    render() {
        console.log(this.props);
        this.checkDate();
        console.log(this.props.steps);
        const name = this.props.name;
        return (
            <View style = {styles.goals}>
                <View style = {styles.topGoals}>
                    <TextInput
                        style = {styles.goalText}
                        onEndEditing = {(text) => this.changeStepName(text)}
                        value={name}
                    />
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

                {(this.props.open)
                    ? (this.props.steps)
                        ? < FlatList style={styles.bottomContainer}
                                     data={this.props.steps}
                                     renderItem={({item}) => (
                                         <Step
                                             points={item.points}
                                             name={item.name}
                                             id={item.id}
                                             data={item.data}
                                             root={item.root}
                                             open={item.open}
                                             steps={item.steps}
                                             date={item.date}
                                             done={item.done}
                                         />
                                     )}
                                     />
                        : <Text> No sub-steps </Text>

                    : <Text> OPEN </Text>
                }
            </View>
        );
    }
}

export default connect()(Step)



import React, {Component} from 'react';
import {styles} from "./theme";
import {CheckBox, Input, Text} from "react-native-elements";
import {Button, ScrollView, View} from "react-native";
import {addGoal} from "../redux/actions";
import {connect} from "react-redux";
import moment from "moment";


//NOTE: You need to split this component => the form and adding goal functionality should be separate!!!!!!

class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {

            newGoal : {
                name: " ",
                days: [],
                data: [0],
                priority: 3,
                done: false,
                points: 0,
                date:  moment().format('dddd, MMMM Do'),
                id:  0
            },

            check1: false,
            check2: false,
            check3: false,
            check4: false,
            check5: false,
            check6: false,
            check7: false,

            pcheck1: false,
            pcheck2: false,
            pcheck3: false,
        };
        this.baseState = this.state
    }


    //TODO: Use a real ID creator here in production version.

    resetForm = () => {
        this.setState(this.baseState);
    };

    addNameToGoal(data){
        this.state.newGoal["name"] = data;
    }
    addPriorityToGoal(data) {
        if (data === 1) {
            this.setState({pcheck1: !this.state.pcheck1});}
        else if (data === 2) {
            this.setState({pcheck2: !this.state.pcheck2});
        } else if (data === 3) {
            this.setState({pcheck3: !this.state.pcheck3});
        }

        this.state.newGoal["priority"] = data
    }
    addPointsToGoal(data){
        this.state.newGoal["points"] = data
    }

    addID(){
        this.state.newGoal['id'] = moment().format();

    }
    //TODO: Refactor
    addDay(day,num) {
        if (num === 1){ this.setState({check1: !this.state.check1});}
        else if (num === 2) {
            this.setState({check2: !this.state.check2});
        } else if (num === 3) {
            this.setState({check3: !this.state.check3});
        } else if (num === 4) {
            this.setState({check4: !this.state.check4});
        } else if (num === 5) {
            this.setState({check5: !this.state.check5});
        } else if (num === 6) {
            this.setState({check6: !this.state.check6});
        } else if (num === 7) {
            this.setState({check7: !this.state.check7});
        }
        this.state.newGoal.days.push(day)
    }

    Save(goal){
        this.resetForm();
        this.addID();
        this.props.dispatch(addGoal(goal));
        this.forceUpdate();
        this.state.newGoal.days = [];
    }




    render() {
        return (
            <View style = {styles.input}>
            <ScrollView style = {[{marginTop: 10}, styles.input]}>
                <Input style = {styles.input}
                       placeholder='Name'
                       shake={true}
                       onChangeText={(text) => this.addNameToGoal(text)}
                />
                {/*<Input*/}
                {/*    placeholder='Points'*/}
                {/*    shake={true}*/}
                {/*    onChangeText={(text) => this.addPointsToGoal(text)}*/}
                {/*/>*/}
                <Text style = {{marginTop: 20}}> Priority</Text>

                <View style = {{flexDirection: "row",}}>
                    <CheckBox
                        title='1'
                        checked={this.state.pcheck1}
                        onIconPress={() => this.addPriorityToGoal(1)}
                    />
                    <CheckBox
                        title='2'
                        checked={this.state.pcheck2}
                        onIconPress={() => this.addPriorityToGoal(2)}
                    />
                    <CheckBox
                        title='3'
                        checked={this.state.pcheck3}
                        onIconPress={() => this.addPriorityToGoal(3)}
                    />
                </View>

                <Text style = {{marginTop: 20}}> Days</Text>
                <View style = {{flexDirection: "row",}}>

                <CheckBox
                    title='Sun'
                    checked={this.state.check1}
                    onIconPress={ () => this.addDay('S', 1)}
                />
                <CheckBox
                    title='Mon'
                    checked={this.state.check2}
                    onIconPress={ () => this.addDay('M', 2)}
                />
                <CheckBox
                    title='Tue'
                    checked={this.state.check3}
                    onIconPress={() => this.addDay('T',3)}
                />
                </View>
                <View style = {{flexDirection: "row",}}>
                <CheckBox
                    title='Wed'
                    checked={this.state.check4}
                    onIconPress={() => this.addDay('W',4)}
                />
                <CheckBox
                    title='Thu'
                    checked={this.state.check5}
                    onIconPress={ () => this.addDay('T',5)}
                />
                <CheckBox
                    title='Fri'
                    checked={this.state.check6}
                    onIconPress={ () => this.addDay('F',6)}
                />
                </View>
                <View style = {{flexDirection: "row", alignItems: "flex-end"}}>

                <CheckBox
                    title='Sat'
                    checked={this.state.check7}
                    onIconPress={ () => this.addDay('S',7)}
                />
                </View>
                <Button
                    // TODO Clear props when pressed
                    title = "Save"
                    onPress={ () => this.Save(this.state.newGoal)}
                />
            </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
    goals: state.goals
});


export default connect(mapStateToProps)(AddGoal)

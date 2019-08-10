import {Text, View, TextInput, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../theme'
import {Button,CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AreaChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import AddStepComponent from '../addStep/addStepComponent';
import {connect} from 'react-redux';
import {StepRoot} from './stepRoot';
import StepHeader from './stepHeader';

const goalsSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};


function checkForID(step, ids) {
    for (i = 0; i < ids.length; i++) {
            if (ids[i] === step.id) {
                return true
            }
    }
    return false;
}

const childrenSelector = (steps, ids) => steps.filter(step => checkForID(step, ids));



export default class Step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addStepInnerToggle: true,
            addStepOutToggle: true


        }
    }


    render() {
        return (
            <View style = {{}}>
                <View style = {styles.goals}>
                <View style = {styles.topGoals}>
                    <TextInput
                        style = {styles.goalText}
                        ref= {(el) => { this.name= el; }}
                        onChangeText= {(name) => this.props.changeStepName(name,this.props.id)}
                        value = {this.props.name}
                        multiline = {true}
                    />

                   <View style = {{flexDirection: "row"}}>
                        <Button
                            icon = {
                                <Icon
                                    name= 'times'
                                    color = 'grey'
                                />
                            }
                            title={ ""}
                            type="clear"
                            onPress = {() => this.props.handleDelete(this.props.id)}
                        />
                        <Button
                            icon = {
                                <Icon
                                    name= 'eye'
                                    color = '#3676FF'
                                />
                            }
                            containerStyle = {{marginRight: -10}}
                            title={ ""}
                            type="clear"
                            onPress = {() => this.props.handleSwitch(this.props.id)}
                        />
                        <CheckBox
                            containerStyle = {{margin: -7, marginRight: -10}}
                            checked={this.props.done}
                            onPress={() => this.props.handleCheck(this.props.id, this.props.steps, this.props.storeSteps)}
                            checkedColor='#3676FF'

                        />
                   </View>
                </View>
                {(this.props.open)
                    ? (true)
                        ? <View>
                            <TextInput
                                ref= {(el) => { this.name= el; }}
                                onChangeText= {(name) => this.props.changeStepInfo(name,this.props.id)}
                                value = {this.props.info}
                                multiline = {true}

                            />
                        </View>
                        : null

                    : null
                }
                    {(this.state.addStepInnerToggle)
                        ? <View>
                        </View>
                        : null

                    }

                </View>
            </View>
        );
    }
}







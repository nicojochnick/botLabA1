import {Text, View, KeyboardAvoidingView,TextInput, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../theme'
import {Button,CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AreaChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import AddStepComponent from '../botA1/addStep/addStepComponent';
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
            addStepOutToggle: true,
            open: false,
            editingStep: false,
            name: this.props.name


        }
    }




    handleEdit(){
        this.setState({editingStep: !this.state.editingStep});
        this.setState({open: true})


    }

    doneSaving(){
        this.setState({editingStep: !this.state.editingStep});
        this.setState({open: false});
        this.props.changeStepName(this.state.name,this.props.id, this.props.boxID)

    }

    activeEdit(data) {
        this.handleEdit()
        this.setState({name: data})
    }


    render() {
        let color = 'grey';
        if (this.state.editingStep){
            color = '#3676FF'
        }
        return (
            <View style = {{}}>
                <View style = {styles.steps}>
                    <KeyboardAvoidingView style = {styles.topGoals}>
                        <TextInput
                            style = {{fontSize: 15, fontWeight: "600"}}
                            ref= {(el) => { this.text= el; }}
                            onChangeText= {(name) => this.activeEdit(name) }
                            value = {this.state.name}
                            multiline = {true}
                            editable = {true}
                        />

                        <View style = {{flexDirection: "row"}}>

                            { (this.props.editing)
                                ? <View style = {{flexDirection: "row"}}>
                                    <Button
                                        icon = {
                                            <Icon
                                                name= 'times'
                                                color = 'grey'
                                            />
                                        }
                                        title={ ""}
                                        type="clear"
                                        onPress = {() => this.props.handleDeleteStep(this.props.boxID, this.props.id)}
                                    />
                                </View>
                                : null
                            }

                            {/*<Button*/}
                            {/*    icon = {*/}
                            {/*        <Icon*/}
                            {/*            name= 'chevron-down'*/}
                            {/*            color = '#3676FF'*/}
                            {/*        />*/}
                            {/*    }*/}
                            {/*    containerStyle = {{marginRight: -10}}*/}
                            {/*    title={ ""}*/}
                            {/*    type="clear"*/}
                            {/*    onPress = {() => this.props.handleSwitch(this.props.id)}*/}
                            {/*/>*/}
                            <CheckBox
                                containerStyle = {{margin: -7, marginRight: -10}}
                                checked={this.props.done}
                                onPress={() => this.props.toggleDone(this.props.id, this.props.boxID)}
                                checkedColor='#3676FF'

                            />
                        </View>
                    </KeyboardAvoidingView>
                    {(this.state.open)
                        ? (true)
                            ? <View>
                                {/*<TextInput*/}
                                {/*    ref= {(el) => { this.name= el; }}*/}
                                {/*    onChangeText= {(name) => this.props.changeStepInfo(name,this.props.id)}*/}
                                {/*    value = {this.props.info}*/}
                                {/*    multiline = {true}*/}

                                {/*/>*/}
                                <Button
                                    style={{width: '30%', justifyContent: "flex-end", alignContent: "center", margin: 10}}
                                    title = "Save"
                                    buttonStyle={{backgroundColor: "#4978DD"}}
                                    onPress = {()=> this.doneSaving()}

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





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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            <View >
                <View style = {[styles.steps,{borderWidth: 0, backgroundColor: 'white',}]}>
                    <KeyboardAvoidingView style = {styles.topGoals  }>
                        <View style = {{width: '80%'}}>
                        <TextInput
                            placeholder = 'add title'
                            style = {{fontSize: 18, fontWeight: "600",  color: "black", marginLeft: 5}}
                            ref= {(el) => { this.text= el; }}
                            onChangeText= {(name) => this.activeEdit(name) }
                            value = {this.state.name}
                            multiline = {true}
                            editable = {this.props.canEdit}
                        />
                        </View>
                        <View style = {{flexDirection: "column"}}>
                        <View style = {{flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                            { (this.props.canEdit)
                                ? <View style = {{flexDirection: "row"}}>
                                    <Button
                                        containerStyle = {{marginRight: -10, marginTop: -6}}
                                        icon = {
                                            <Ionicons
                                            name={'ios-close'}
                                            style={{color: '#3A3A3A'}}
                                            size={25}
                                            onPress={() => this.props.handleDeleteStep(this.props.boxID, this.props.id)}
                                            />
                                        }
                                        title={ ""}
                                        type="clear"
                                        onPress = {() => this.props.handleDeleteStep(this.props.boxID, this.props.id)}
                                    />
                                </View>
                                : null
                            }
                            <CheckBox
                                containerStyle = {{margin: -7, marginRight: -10}}
                                checked={this.props.done}
                                onPress={() => this.props.toggleDoneDB(this.props.id, this.props.boxID, this.state.name)}
                                checkedColor='#38EFA1'
                            />
                        </View>
                            {(this.state.open)
                                ? <Button
                                    style={{ justifyContent: "center", alignContent: "center", marginRight: 5}}
                                    title = "Save"
                                    titleStyle = {{color: 'black', fontWeight: "bold", margin: -6}}
                                    type = 'clear'
                                    onPress = {()=> this.doneSaving()}
                                />
                                : null
                            }

                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}





import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, FlatList, Text, default as Alert, ScrollView} from 'react-native';
import {Button} from 'react-native-elements'
import {styles} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepBox from '../box/box';
import Step from '../step/step';
import BoxRoot from '../box/boxRoot';
import DatePicker from 'react-native-datepicker';
import * as Progress from 'react-native-progress';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import { ConfirmDialog } from 'react-native-simple-dialogs';
import moment from "moment";
import TribeGroup from './tribeGroup';


class TribeComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            showDeleteConfirm: false,
            editing: false,
            fOpen: false,
            name: this.props.name,
            deadline: this.props.deadline,
        }

    }


    makeEditable(bool){
        this.setState({editing: bool});
    }

    openDeleteConfirm(show){
        this.setState({ showDeleteConfirm: show });
    }

    optionYes = () => {
        this.openDeleteConfirm(false);

        setTimeout(
            () => {this.props.handleDeleteTribe(this.props.id);
            },
            300,
        );
    };

    optionNo = () => {
        this.openDeleteConfirm(false);
        setTimeout(
            () => {
            },
            300,
        );
    };

    doneSaving(){
        this.makeEditable(false);
        this.props.changeTribeName(this.state.name, this.props.id);
        this.props.addTribeDeadline(this.props.tribeID, this.state.deadline)
    }




    render() {
        let open = this.state.open;
        let fOpen = this.state.fOpen;
        console.log(this.props.id);
        let myName = this.state.name;
        // if (this.state.editing){
        //     myName = null
        // }

        return (
            <View style = {styles.tribes}>
                <ConfirmDialog
                    title="Please Confirm"
                    message="Are you sure you want to delete your goal?"
                    onTouchOutside={ () => this.openDeleteConfirm(false) }
                    visible={this.state.showDeleteConfirm }
                    negativeButton={
                        {
                            title: "No",
                            onPress: this.optionNo,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "Yes",
                            onPress: this.optionYes,
                        }
                    }
                />
                <View style = {styles.topTribes}>
                        <TextInput
                            style = {styles.goalTitleText}
                            ref= {(el) => { this.name= el; }}
                            value = {myName}
                            multiline = {true}
                            editable = {this.state.editing}
                            onChangeText = {(text) => this.setState({name:text})}
                        />
                        <View style = {{flexDirection: "row", justifyContent: "flex-start", }}>

                            <Button
                                icon =
                                    {<Icon style = {{marginRight: 5}}
                                           name = 'plus'
                                           color = "black"
                                           disabledStyle = {{color:"grey"}}
                                           size = {20}
                                           onPress = {() => this.props.handleAddBox(this.props.id)}/> }
                                type = "clear"
                                iconRight = {true}
                                onPress = {() => this.props.handleAddBox(this.props.id)}

                            />

                            <Button
                                icon = {
                                    <Icon
                                        name= 'users'
                                        color = '#3676FF'
                                        size = {20}
                                        onPress = {() => this.setState( {f: !fOpen})}
                                    />}
                                containerStyle = {{marginLeft: 10}}
                                title={ ""}
                                type="clear"
                                onPress = {() => this.setState( {fOpen: !fOpen})}
                            />

                            <Button
                                icon = {
                                    <Icon
                                        name= 'chevron-down'
                                        color = '#3676FF'
                                        size = {20}
                                        onPress = {() => this.setState( {open: !open})}
                                    />}
                                containerStyle = {{marginLeft: 10}}
                                title={ ""}
                                type="clear"
                                onPress = {() => this.setState( {open: !open})}
                            />


                            <Menu>
                                <MenuTrigger>
                                    <Icon style = {{margin: 7}}
                                                      name = {'ellipsis-v'}
                                                      color = '#3676FF'
                                                      disabledStyle = {{color:"grey"}}
                                                      size = {25}
                                                      />
                                </MenuTrigger>
                                    <MenuOptions>
                                    <MenuOption onSelect={() => this.makeEditable(true, myName)} text='Edit' />
                                    <MenuOption onSelect={() => this.openDeleteConfirm(true)} >
                                        <Text style={{color: 'red'}}>Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>

                        </View>

                    </View>

                { !open
                    ? null

                    :
                    <View>
                        <View style = {{flex: 1, justifyContent: "space-between", alignContent: "space-between", marginLeft: 10}}>
                            {(!this.state.editing)
                                ? <Text style = {styles.titleDeadlineText}> deadline: {this.props.deadline} </Text>
                                : <DatePicker
                                    style={{width: 200, fontWeight: "bold"}}
                                    date={this.state.deadline}
                                    mode="date"
                                    placeholder="set a deadline"
                                    format="YYYY-MM-DD"
                                    minDate={moment().format('YYYY-MM-DD')}
                                    maxDate="2025-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        this.setState( {deadline: date})
                                    }}
                                />
                            }

                            <Progress.Bar
                                progress={this.props.computeProgress(this.props.id)} width={300} style={{margin: 10}}
                            />
                        </View>



                        {(!fOpen)
                            ?null
                            :<TribeGroup/>


                        }

                        <View>
                        <BoxRoot
                        tribeID = {this.props.tribeID}
                        handleAddBox = {this.props.handleAddBox}
                        handleDeleteBox = {this.props.handleDeleteBox}
                        changeBoxName = {this.props.changeBoxName}
                        editing = {this.state.editing}
                        />
                        </View>

                        { (this.state.editing)
                            ?
                                <Button
                                    style={{width: '20%', justifyContent: "center", alignContent: "center", margin: 20}}
                                    title = "Done"
                                    raised = {true}
                                    buttonStyle={{backgroundColor: "#4978DD"}}
                                    onPress = {()=> this.doneSaving()}

                                />
                            : null

                        }

                    </View> }

            </View>

        );
    }
}

export default TribeComponent;

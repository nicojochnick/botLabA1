import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, View, TextInput, Text} from 'react-native'
import {Avatar, Button,} from 'react-native-elements';
import StepRoot from '../step/stepRoot';
import {addChildStep, addStep} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from "moment"
import {styles} from "../theme";
import Identity from '../user/identity';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from "react-native-progress";



class Box extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: this.props.name,
            editingBox: false
        }
    }


    handleEdit(){
        this.setState({editingBox: !this.state.editingBox})
    }

    doneSaving(){
        let id = this.props.id;
        let name = this.state.name;
        this.setState({editingBox: !this.state.editingBox});
        this.props.changeBoxName(name,id);

    }

    render() {
        console.log(this.props.tribeID);
        let color = 'grey';
        if (this.state.editingBox){
            color = '#3676FF'
        }
        return (
            <KeyboardAvoidingView>
                <View style = {{}}>
                    {(this.props.showProgressBar)
                        ?<Progress.Bar
                            progress={this.props.computeBoxProgress(this.props.steps)} width={330}
                            style={{margin: 10, marginTop: 0, color: '#1260FF'}}
                        />
                        : null
                    }

                <View style = {{}}>
                <StepRoot
                    tribeID = {this.props.tribeID}
                    boxID = {this.props.id}
                    handleAddStep = {this.props.handleAddStep}
                    handleSwitch = {this.props.handleSwitch}
                    editing = {this.props.editing}
                    steps = {this.props.steps}
                    canEdit = {this.props.canEdit}
                    sendHeaderMessage = {this.props.sendHeaderMessage}
                    toggleDoneDB={this.props.toggleDoneDB}

                />
                    { (!this.props.canEdit)
                        ? null
                        : <View style = {{flexDirection: "row", margin: 5, flex: 1, justifyContent: "center"}} >
                            < Button
                                icon = {<Icon style = {{marginRight: 5}}
                                              name = 'plus'
                                              color = "white"
                                              disabledStyle = {{color: "white"}}
                                              size = {15}
                                              onPress = {() => this.props.handleAddStep(this.props.id)}/>}
                                title = "add a card"
                                raised
                                titleStyle = {{margin: 0, color: "white"}}
                                onPress = {() => this.props.handleAddStep(this.props.id)}
                                buttonStyle = {{backgroundColor:'#186aed'}}
                                containerStyle={{ justifyContent: "flex-end", marginRight: 3}}
                            />

                        </View>
                    }
                </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

Box.propTypes = {};

export default connect()(Box);


{/*<Button*/}
{/*    icon={*/}
{/*        <Icon*/}
{/*            name='times'*/}
{/*            color='red'*/}
{/*            size={15}*/}
{/*            onPress={() => this.props.handleDeleteBox(this.props.id)}*/}

{/*        />*/}
{/*    }*/}
{/*    containerStyle={{flex: 1, justifyContent: "flex-end"}}*/}
{/*    title={"delete set"}*/}
{/*    titleStyle = {{margin: 4, color: "red"}}*/}
{/*    type="clear"*/}
{/*    onPress={() => this.props.handleDeleteBox(this.props.id)}*/}
{/*/>*/}

{/*<Progress.Bar*/}
{/*    progress={this.props.computeBoxProgress(this.props.steps)} width={330} style={{margin: 10}}*/}
{/*/>*/}
{/*{(this.state.editingBox)*/}
{/*    ?*/}
{/*< Button*/}
{/*    style={{width: '30%', justifyCon2tent: "flex-end", alignContent: "center", margin: 10}}*/}
{/*    title = "Save"*/}
{/*    buttonStyle={{backgroundColor: "#4978DD"}}*/}
{/*    onPress = {()=> this.doneSaving()}*/}
{/*    />*/}
{/*    :null*/}
{/*}*/}



{/*{(this.state.editingBox)*/}
{/*    ?*/}
{/*< Button*/}
{/*    style={{width: '30%', justifyCon2tent: "flex-end", alignContent: "center", margin: 10}}*/}
{/*    title = "Save"*/}
{/*    buttonStyle={{backgroundColor: "#4978DD"}}*/}
{/*    onPress = {()=> this.doneSaving()}*/}
{/*    />*/}
{/*    :null*/}
{/*}*/}

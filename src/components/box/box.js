import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, View, TextInput} from 'react-native'
import {Avatar, Button,} from 'react-native-elements';
import StepRoot from '../step/stepRoot';
import {addChildStep, addStep} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from "moment"
import {styles} from "../theme";
import Identity from '../user/identity';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from "react-native-firebase";
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

                <View style={{flexDirection:"row"}}>
                {/*<TextInput*/}
                {/*    style = {{margin: 10, fontSize: 25, fontWeight: "bold"}}*/}
                {/*    editable = {this.state.editingBox}*/}
                {/*    onChangeText = {(text) => this.setState({name:text})}*/}
                {/*>*/}
                {/*    {this.props.name}*/}
                {/*</TextInput>*/}
                { (!this.props.editing)
                        ? null
                        : <View style = {{flexDirection: "row"}} >
                            <Button
                                icon={
                                    <Icon
                                        name='times'
                                        color='black'
                                        size={15}
                                        onPress={() => this.props.handleDeleteBox(this.props.id)}

                                    />
                                }
                                containerStyle={{}}
                                title={""}
                                type="clear"
                                onPress={() => this.props.handleDeleteBox(this.props.id)}
                            />
                            < Button
                            icon = {<Icon style = {{marginRight: 5}}
                            name = 'plus'
                            color = "black"
                            disabledStyle = {{color: "grey"}}
                            size = {15}
                            onPress = {() => this.props.handleAddStep(this.props.id)}/>}
                            type = "clear"
                            onPress = {() => this.props.handleAddStep(this.props.id)}
                            />
                        </View>
                    }
                </View>
                <Progress.Bar
                    progress={this.props.computeBoxProgress(this.props.steps)} width={330} style={{margin: 10}}
                />

                {(this.state.editingBox)
                    ?
                < Button
                    style={{width: '30%', justifyContent: "flex-end", alignContent: "center", margin: 10}}
                    title = "Save"
                    buttonStyle={{backgroundColor: "#4978DD"}}
                    onPress = {()=> this.doneSaving()}
                    />
                    :null
                }
                <View style = {{margin: 3, marginBottom: 5}}>
                <StepRoot
                    tribeID = {this.props.tribeID}
                    boxID = {this.props.id}

                    handleAddStep = {this.props.handleAddStep}
                    handleSwitch = {this.props.handleSwitch}
                    editing = {this.props.editing}
                    steps = {this.props.steps}
                />
                </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

Box.propTypes = {};

export default connect()(Box);


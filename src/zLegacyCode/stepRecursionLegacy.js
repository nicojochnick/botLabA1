import React from 'react';
import {FlatList, TextInput, View} from 'react-native';
import {styles} from '../components/theme';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/index';

export default class StepRecursionLegacy extends React.Component {
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
                                <Button
                                    type="clear"
                                    title = "add step..."
                                    titleStyle = {{color: "grey", fontSize: 15}}
                                    buttonStyle = {{justifyContent: "flex-start", margin: 0}}
                                    containerStyle = {{marginLeft: -5, marginBottom: -5}}
                                    onPress = {() => this.props.handleAddStep(this.props.id)}
                                />
                                < FlatList style = {styles.bottomContainer}
                                           data = {childrenSelector(this.props.storeSteps, this.props.steps)}
                                           renderItem={({item}) => (
                                               <Step
                                                   changeStepName = {this.props.changeStepName}
                                                   changeStepInfo = {this.props.changeStepInfo}
                                                   handleSwitch = {this.props.handleSwitch}
                                                   handleAddStep = {this.props.handleAddStep}
                                                   handleDelete = {this.props.handleDelete}
                                                   storeSteps = {this.props.storeSteps}
                                                   handleCheck = {this.props.handleCheck}
                                                   checkCheck = {this.props.checkCheck}
                                                   name = {item.name}
                                                   info = {item.info}
                                                   id = {item.id}
                                                   data = {item.data}
                                                   root = {item.root}
                                                   open = {item.open}
                                                   steps = {item.steps}
                                                   date = {item.date}
                                                   done = {item.done}
                                               />
                                           )}
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

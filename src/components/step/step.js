import {Text, View, TextInput, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../theme'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AreaChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import AddStepComponent from '../addStep/addStepComponent';
import {connect} from 'react-redux';
import {StepRoot} from './stepRoot';

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



class Step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addStepInnerToggle: true,
            addStepOutToggle: true


        }
    }


    render() {
        // console.log(this.props.steps);
        // const name = this.props.name;
        // console.log(this.props.allSteps);
        // console.log(childrenSelector(this.props.allSteps, this.props.steps));
        return (
            <View>
                <View style = {styles.goals}>
                <View style = {styles.topGoals}>
                    <TextInput
                        style = {styles.goalText}
                        ref= {(el) => { this.name= el; }}
                        onChangeText= {(name) => this.props.changeStepName(name,this.props.id)}
                        value = {this.props.name}
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
                        onPress = {() => this.props.handleSwitch(this.props.id)}
                    />
                </View>
                {(this.props.open)
                    ? (this.props.steps.length > 0 && this.props.storeSteps !== undefined)
                        ? <View>
                            <Text> Children below </Text>
                            < FlatList style = {styles.bottomContainer}
                                     data = {childrenSelector(this.props.storeSteps, this.props.steps)}
                                     renderItem={({item}) => (
                                         <Step
                                             changeStepName = {this.props.changeStepName}
                                             changeStepInfo = {this.props.changeStepInfo}
                                             handleSwitch = {this.props.handleSwitch}
                                             handleAddStep = {this.props.handleAddStep}
                                             storeSteps = {this.props.storeSteps}
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

                    : <TextInput
                        ref= {(el) => { this.name= el; }}
                        onChangeText= {(name) => this.props.changeStepInfo(name,this.props.id)}
                        value = {this.props.info}/>
                }
                    {(this.state.addStepInnerToggle)
                        ? <Button
                                type="clear"
                                title = "add step..."
                                titleStyle = {{color: "grey", fontSize: 15}}
                                buttonStyle = {{justifyContent: "flex-start", margin: 0}}
                                containerStyle = {{marginLeft: -5, marginBottom: -5}}
                                onPress = {() => this.props.handleAddStep(this.props.id)}
                            />
                        : null

                    }

                </View>
                <Button
                    type="clear"
                    title = "add step..."
                    titleStyle = {{color: "grey", fontSize: 15, justifyContent: "flex-start"}}
                    buttonStyle = {{justifyContent: "flex-start", margin: 0}}
                    containerStyle = {{margin: 0}}
                />
            </View>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
    allSteps: goalsSelector(state.steps.byHash)
});

export default connect(mapStateToProps)(Step);






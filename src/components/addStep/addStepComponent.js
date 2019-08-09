import React, {Component} from 'react';
import {styles} from '../theme';
import {CheckBox, Input, Text, Button} from 'react-native-elements';
import {ScrollView, View} from 'react-native';
import {addStep} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';


//NOTE: You need to split this component => the form and adding goal functionality should be separate!!!!!!

class AddStepComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStep: {
                name: ' ',
                days: [],
                data: [0],
                done: false,
                date: moment().format('dddd, MMMM Do'),
                id: 0,
                open: false,
                steps: false,
                root: false,
            },
        };
        this.baseState = this.state;
    }

    handleAddStep() {

    }
    //TODO: Use a real ID creator here in production version.
    resetForm = () => {
        this.setState(this.baseState);
    };

    addNameToGoal(data) {
        this.state.newStep['name'] = data;
    }

    addID() {
        this.state.newStep['id'] = moment().format();

    }

    Save(step) {
        this.resetForm();
        this.addID();
        this.props.dispatch(addStep(step));
        this.forceUpdate();
        this.state.newStep.days = [];
    }


    render() {
        return (
            <ScrollView style={{}}>
                <View style={styles.goals}>
                    <Input
                        style={styles.input}
                        placeholder='Name'
                        shake={true}
                        onChangeText={(text) => this.addNameToGoal(text)}
                    />
                    <Button
                        // TODO Clear props when pressed
                        type="outline"
                        buttonStyle={{backgroundColor: '#3676FF', borderRadius: 5}}
                        containerStyle={{margin: 10, width: 60}}
                        raised={true}
                        icon={
                            <Ionicons
                                style={{}}
                                name={'ios-add'}
                                color='white'
                                disabledStyle={{color: 'grey'}}
                                size={30}
                                onPress={() => this.handleAddStep()}/>
                        }
                        onPress={() => this.handleAddStep()}
                    />


                </View>

                <Button
                    type="outline"
                    buttonStyle={{backgroundColor: '#3676FF', borderRadius: 5}}
                    containerStyle={{margin: 10, width: 60}}
                    raised={true}
                    icon={
                        <Ionicons
                            style={{}}
                            name={'ios-add'}
                            color='white'
                            disabledStyle={{color: 'grey'}}
                            size={30}
                            onPress={() => this.handleAddStep()}/>
                    }
                    onPress={() => this.handleAddStep()}
                />

            </ScrollView>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => ({
    goals: state.goals,
});


export default connect(mapStateToProps)(AddStepComponent);

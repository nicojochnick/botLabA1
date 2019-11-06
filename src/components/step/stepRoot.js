import {FlatList, View} from "react-native";
import {Button} from 'react-native-elements'
import {styles} from "../theme";
import Step from './step';
import React from 'react';
import {connect} from "react-redux";
import {
    addDate,
    addTime,
    changeStepInfo,
    changeStepName,
    deleteStep,
    subtractTime,
    addStep,
    toggleOpen,
    updateDate, addChildStep, toggleDone, addStepDB, deleteStepDB, toggleDoneDB, changeStepNameDB,
} from '../../redux/actions';
import moment from "moment";
import firebase from '@react-native-firebase/app';

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



export class StepRoot extends React.Component {
    constructor(props) {
        super(props);
        this.changeStepNameDB = this.changeStepNameDB.bind(this);
        this.changeStepInfo = this.changeStepInfo.bind(this);
        this.handleDeleteStepDB = this.handleDeleteStepDB.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.checkCheck = this.checkCheck.bind(this);
        // this.toggleDoneDB = this.toggleDoneDB.bind(this);

        this.state = {
            todoSwitch: true,
            doneSwitch: false,
            allSwitch: false,


        };
    }

    changeStepName(text, id) {
        this.props.dispatch(changeStepName(text, id));
    }

    changeStepNameDB(text,id, boxID){
        if (this.props.canEdit) {
            this.props.changeStepNameDB(text,id,boxID);
        }


    }

    handleDeleteStep(id){
        this.props.dispatch(deleteStep(id))

    }

    handleDeleteStepDB(boxID, id){
        this.props.deleteStepDB(boxID, id)

    }

    // toggleDone(id, childrenID, allSteps) {
    //     this.props.dispatch(toggleDone(id));
    // }
    // toggleDoneDB(id, boxID){
    //     if (this.props.canEdit) {
    //         this.props.toggleDoneDB(id, boxID)
    //     }
    // }

    changeStepInfo(text, id) {
        console.log(text);
        this.props.dispatch(changeStepInfo(text, id));
    }
    changeStepInfoDB(text,info) {
    }

    handleSwitch(id) {
        //change switch binary
        this.props.dispatch(toggleOpen(id))
    }
    handleSwitchDB(id){

    };

    checkCheck(id, childrenID, allSteps) {
        if (childrenID === undefined || childrenID.length < 1) {
            return false
        } else {
            const children = childrenSelector(childrenID, allSteps);
            for (i = 0; i < children.length - 1; i++) {
                if (children[i].done === false) {
                    return false;
                }
            }
            //this needs to be the parentID!
            this.props.dispatch(toggleDone(id))
        }
    }
    checkCheckDB(id){}

    componentDidMount(): void {
        // this.props.sendHeaderMessage(this.props.steps)
    }

    render() {

        let todoColor =  '#186aed';
        let doneColor = 'darkgrey';
        let allColor = 'darkgrey';
        if (this.state.doneSwitch){
            todoColor =  'darkgrey';
            doneColor = '#186aed';
            allColor = "darkgrey"
        }
        if (this.state.allSwitch) {
            todoColor = 'darkgrey';
            doneColor = 'darkgrey';
            allColor = '#186aed';
        }

        let allSteps = this.props.steps;
        let filteredSteps = []

        if (this.state.todoSwitch){
            filteredSteps = allSteps.filter(function(item){
                return item.done === false
            })
        } else if (this.state.doneSwitch) {
            filteredSteps = allSteps.filter(function(item){
                return item.done === true
            })
        } else {
            filteredSteps = allSteps
        }
        // console.log(this.props.storeSteps);
        // const filteredSteps = this.props.storeSteps.filter((item) => item.tribeID === this.props.tribeID);
        // console.log(filteredSteps);
        return (
            <View>
                {/*<View style={{flexDirection: "row", marginLeft: 5, marginTop: -2}}>*/}
                {/*    <Button*/}
                {/*        titleStyle = {{color:todoColor , fontWeight: "bold"}}*/}
                {/*        type = 'clear'*/}
                {/*        title = {'next'}*/}
                {/*        onPress = {()=> this.setState({todoSwitch:true, doneSwitch: false, allSwitch: false})}*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        titleStyle = {{color:doneColor , fontWeight: "bold"}}*/}
                {/*        type = 'clear'*/}
                {/*        title = {'done'}*/}
                {/*        onPress = {()=> this.setState({todoSwitch:false, doneSwitch: true, allSwitch: false,})}*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        titleStyle = {{color:allColor , fontWeight: "bold"}}*/}
                {/*        type = 'clear'*/}
                {/*        title = {'all'}*/}
                {/*        onPress = {()=> this.setState({todoSwitch:false, doneSwitch: false, allSwitch: true,})}*/}
                {/*    />*/}
                {/*</View>*/}

                <View style = {{borerRadius: 5,shadowColor: "#6F6F6F",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 5, margin: 3, marginTop: 5, orderRadius: 10, borderWidth: 0, padding: 2}}>

            < FlatList
                style = {{borderRadius: 0}}
                data = {filteredSteps}
                listKey={(item, index) => 'D' + index.toString()}
                renderItem={({item}) => (
                    <Step
                        canEdit = {this.props.canEdit}
                        changeStepName = {this.changeStepNameDB}
                        changeStepInfo = {this.changeStepInfo}
                        // toggleDone = {this.toggleDoneDB}

                        handleSwitch = {this.handleSwitch}
                        handleAddStep = {this.props.handleAddStep}
                        handleDeleteStep = {this.handleDeleteStepDB}
                        checkCheck = {this.checkCheck}
                        toggleDoneDB = {this.props.toggleDoneDB}

                        editing = {this.props.editing}
                        canEdit = {this.props.canEdit}


                        name = {item.name}
                        info = {item.info}
                        id = {item.id}
                        data = {item.data}
                        root = {item.root}
                        open = {item.open}
                        steps = {item.steps}
                        date = {item.date}
                        done = {item.done}
                        boxID = {this.props.boxID}

                        storeSteps = {this.props.storeSteps}
                    />
                )}
            />
                </View>
            </View>

        );

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStepDB: (boxID, stepID) => dispatch(deleteStepDB(boxID, stepID)),
        // toggleDoneDB: (id, boxID) => dispatch(toggleDoneDB(id, boxID)),
        changeStepNameDB: (text, id, boxID) => dispatch(changeStepNameDB(text, id, boxID)),

    };
};

const mapStateToProps = (state /*, ownProps*/) => ({
    storeSteps: goalsSelector(state.steps.byHash)});

export default connect(mapStateToProps, mapDispatchToProps)(StepRoot);















// checkDate() {
//     const curDate = moment().format('dddd, MMMM Do');
//     if (this.props.date[0] !== curDate) {
//         this.props.dispatch(updateDate(this.props.id, curDate));
//         this.props.dispatch(addDate(this.props.id))
//     }
// }
//
// testFunction() {
//     const curDate = moment().format('dddd, MMMM Do');
//     this.props.dispatch(updateDate(this.props.id, curDate));
//     this.props.dispatch(addDate(this.props.id))
// }
//
// addTime() {
//     //NOTE: You have to dispatch this action with TIME and ID.]
//     const length = this.props.data.length;
//     const data = this.props.data.slice(-1)[0] + 15;
//
//     this.props.dispatch(addTime(this.props.id, data, length))
// }
//
// subtractTime() {
//     const length = this.props.data.length;
//     const data = this.props.data.slice(-1)[0] - 15;
//     this.props.dispatch(subtractTime(this.props.id, data,length))
// }

// checkCheck(id, childrenID, allSteps) {
//         if (childrenID === undefined || childrenID.length < 1) {
//             return false
//         } else {
//         const children = childrenSelector(childrenID, allSteps);
//         for (i = 0; i < children.length - 1; i++) {
//             if (children[i].done === false) {
//                 return false;
//             }
//         }
//         //this needs to be the parentID!
//         this.props.dispatch(toggleDone(id))
//
//     }
// }

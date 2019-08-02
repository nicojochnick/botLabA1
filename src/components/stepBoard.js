import {FlatList} from "react-native";
import {styles} from "./theme";
import Step from './step/step';
import React from 'react';
import {connect} from "react-redux";

const goalsSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};
export class StepBoard extends React.Component{
    render() {
        return (
            < FlatList style = {styles.bottomContainer}
                data = {this.props.steps}
                renderItem={({item}) => (
                    <Step
                        points = {item.points}
                        name = {item.name}
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

        );

    }

}
const mapStateToProps = (state /*, ownProps*/) => ({
    steps: goalsSelector(state.steps.byHash)});

export default connect(mapStateToProps)(StepBoard);


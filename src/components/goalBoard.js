import {FlatList} from "react-native";
import {styles} from "./theme";
import GoalRow from './goal/goal'
import React from 'react';
import {connect} from "react-redux";

const goalsSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};
export class GoalBoard extends React.Component{
    render() {
        return (
            < FlatList style = {styles.bottomContainer}
                data = {this.props.goals}
                renderItem={({item}) => (
                    <GoalRow
                        points = {item.points}
                        name = {item.name}
                        id = {item.id}
                        days = {item.days}
                        data = {item.data}
                        priority = {item.priority}
                        date = {item.date}
                    />
                )}
            />

        );

    }

}
const mapStateToProps = (state /*, ownProps*/) => ({
    goals: goalsSelector(state.goals.byHash)});

export default connect(mapStateToProps)(GoalBoard);


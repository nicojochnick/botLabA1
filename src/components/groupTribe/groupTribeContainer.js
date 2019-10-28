import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GroupTribeComponent from './groupTribeComponent';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {View} from 'react-native';
import {deleteTribeGroup,} from '../../redux/actions';
import {connect} from 'react-redux';

class GroupTribeContainer extends Component {
    constructor(props) {
        super(props);
        this.removeGroup = this.removeGroup.bind(this)
        this.state = {
            showDeleteConfirm: false
        }
    }

    removeGroup(){
        this.openDeleteConfirm(true)
    }
    removeGroupConfirm(){
        this.props.deleteGroup(this.props.id)

    }


    openDeleteConfirm(show){
        this.setState({ showDeleteConfirm: show });
    }

    optionYes = () => {
        this.openDeleteConfirm(false);

        setTimeout(
            () => {this.removeGroupConfirm();

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


    render() {
        return (
            <View>
            <GroupTribeComponent
                tribeName = {this.props.tribeName}
                id = {this.props.id}
                tribeMembers = {this.props.tribeMembers}
                tribeDescription = {this.props.tribeDescription}
                tribePhoto = {null}
                navigate = {this.props.navigate}
                removeGroup = {this.removeGroup}
            />
                <ConfirmDialog
                    title="Please Confirm"
                    message="Are you sure you want to delete this group, all data will be lost"
                    onTouchOutside={ () => this.openDeleteConfirm(false) }
                    visible={this.state.showDeleteConfirm }
                    negativeButton={{
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
                        },}}
                    positiveButton={
                        {
                            title: "Yes",
                            onPress: this.optionYes,
                        }}/>

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteGroup: (groupID) => dispatch(deleteTribeGroup(groupID))
    };
};

const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupTribeContainer);



import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GroupTribeComponent from './groupTribeComponent';

class GroupTribeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <GroupTribeComponent
                tribeName = {null}
                tribeMembers = {null}
                tribePhoto = {null}
                navigate = {this.props.navigate}
            />
        );
    }
}

GroupTribeContainer.propTypes = {};

export default GroupTribeContainer;

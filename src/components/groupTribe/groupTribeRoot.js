import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native'
import {styles} from '../theme';
import TribeComponent from '../tribe/tribe';
import GroupTribeContainer from './groupTribeContainer';


class GroupTribeRoot extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this)
        this.state = {

        }
    }
    navigate(){

    }

    render() {
        return (
            <View>
                <FlatList
                    style={{}}
                    data={{}}
                    listKey={(item, index) => 'D' + index.toString()}
                    renderItem={({item}) => (
                       <GroupTribeContainer
                           tribeName = {item.tribeName}
                           tribeMembers = {item.members}
                           tribePhoto = {item.thumbnail}


                       />

                        )}
                    />
            </View>
        );
    }
}

GroupTribeRoot.propTypes = {};

export default GroupTribeRoot;

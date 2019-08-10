import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {styles} from '../theme';
import TribeComponent from './tribe';
import {connect} from 'react-redux';

const tribesSelector = (Obj) => {
    return Object.keys(Obj)
        .map((Key) => Obj[Key]);
};


class TribeRoot extends Component {
    render() {
        console.log(this.props.storeTribes);
        return (
            <View>
                < FlatList style = {styles.bottomContainer}
                           data = {this.props.storeTribes}
                           renderItem={({item}) => (
                               <TribeComponent
                                   name = {item.name}
                                   info = {item.info}
                                   id = {item.id}
                                   open = {item.open}
                                />
                           )}
                />

            </View>
        );
    }
}

TribeRoot.propTypes = {};

const mapStateToProps = (state /*, ownProps*/) => ({
    storeTribes: tribesSelector(state.tribes.byHash)});

export default connect(mapStateToProps)(TribeRoot);



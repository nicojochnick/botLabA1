import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native'
import {Button} from 'react-native-elements';
import TribeGroup from '../groups/tribeGroup';
import GroupTribeRoot from '../groupTribe/groupTribeRoot';

class SlideMenuRoot extends Component {
    constructor(props){
        super(props)
        this.addTribeGroup = this.addTribeGroup.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    addTribeGroup() {
        let group = {
            photo: null,
            name: null,
            members: [this.props.alwaysMe],
            id: null,

        }
    }

    render() {
        return (
            <ScrollView style  = {{marginTop: 0, backgroundColor: "#3E4145"}}>
                <GroupTribeRoot/>
            </ScrollView>
        );
    }
}

SlideMenuRoot.propTypes = {};

export default SlideMenuRoot;

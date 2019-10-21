import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native'
import {Button, Divider} from 'react-native-elements';
import TribeGroup from '../groups/tribeGroup';
import GroupTribeRoot from '../groupTribe/groupTribeRoot';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addTribeGroup, changeStepNameDB, deleteStepDB} from '../../redux/actions';
import {connect} from 'react-redux';
import {StepRoot} from '../step/stepRoot';
import moment from 'moment';

class SlideMenuRoot extends Component {
    constructor(props){
        super(props)
        this.addTribeGroup = this.addTribeGroup.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    toggle(){
        this.props.navigation.toggleDrawer()
    }

    addTribeGroup() {
        let group = {
            photo: null,
            name: null,
            members: [this.props.user.user.userID],
            id: moment().format(),
            userTribeIDs: [],
            tribeGroupTribeIDs: [],

        };
        this.props.addTribeGroup(group)
    }

    render() {
        const { navigation } = this.props;
        console.log(this.props.user);


        return (
            <ScrollView style  = {{marginTop: 0, backgroundColor: "#3E4145"}}>
                <Button
                    containerStyle = {{marginTop: 50}}
                    type = 'clear'
                    onPress = {() => this.addTribeGroup()}
                    title = 'Create a Tribe'
                    titleStyle = {{color: 'white', marginLeft: 5}}
                    icon = {
                        <Ionicons
                            name = {'md-add'}
                            style = {{color: 'white'}}
                            size = {30}
                            onPress = {() => this.addTribeGroup()}
                        />
                    }
                />
                <Divider/>
                <GroupTribeRoot
                    groupID = {JSON.stringify(navigation.getParam('groupID'))}
                    toggle = {this.toggle}
                    isSideMenu = {true}
                />
            </ScrollView>
        );
    }
}

SlideMenuRoot.propTypes = {};

const mapDispatchToProps = (dispatch) => {
    return {
        addTribeGroup: (tribeGroup) => dispatch(addTribeGroup(tribeGroup))
    };
};

const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenuRoot);

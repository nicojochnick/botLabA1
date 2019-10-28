import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text} from 'react-native'
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

    // static navigationOptions = ({navigation}) => {
    //     return {
    //         header: null
    //     }
    // };

    toggle(){
        this.props.navigation.goBack()
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
            <ScrollView style  = {{marginTop: 0, backgroundColor: '#282C33'}}>
                <View style = {{flexDirection: "row", marginTop: 50, justifyContent: "space-between", alignItems: "center", padding: 5}}>
                    <Text style = {{fontWeight: "bold", fontSize: 30, color: "white"}}> Groups </Text>

                    <Button
                        containerStyle = {{borderRadius: 6,}}
                        raised
                        type = 'clear'
                        onPress = {() => this.props.navigation.goBack()}
                        title = 'Go Back'
                        iconRight = {true}
                        titleStyle = {{color: 'white', marginLeft: 5}}
                        icon = {
                            <Ionicons
                                name = {'ios-arrow-forward'}
                                style = {{color: 'white', marginLeft: 5, marginTop: 2}}
                                size = {30}
                                onPress = {() => this.props.navigation.goBack()}
                            />
                        }
                    />
                </View>
                <Divider/>
                <Button
                    containerStyle = {{margin: 10, borderRadius: 6,}}
                    raised
                    onPress = {() => this.addTribeGroup()}
                    title = 'Add Group'
                    titleStyle = {{color: 'white', marginLeft: 5, fontWeight: "bold"}}
                    buttonStyle = {{backgroundColor:'#186aed'}}
                    icon = {
                        <Ionicons
                            name = {'md-add'}
                            style = {{color: 'white'}}
                            size = {30}
                            onPress = {() => this.addTribeGroup()}
                        />
                    }
                />
                <View style = {{margin: 7, padding: 2, borderRadius: 5, borderWidth: 2, borderColor:"white"}}>

                <GroupTribeRoot
                    groupID = {JSON.stringify(navigation.getParam('groupID'))}
                    toggle = {this.toggle}
                    isSideMenu = {true}
                />
                </View>
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

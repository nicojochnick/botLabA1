import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text} from 'react-native'
import {Button, Divider, Input} from 'react-native-elements';
import TribeGroup from '../components/groups/tribeGroup';
import GroupTribeRoot from '../components/groupTribe/groupTribeRoot';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToGroup, addTribeGroup, changeStepNameDB, deleteStepDB} from '../redux/actions';
import {connect} from 'react-redux';
import {StepRoot} from '../components/step/stepRoot';
import moment from 'moment';

class HomeView extends Component {
    constructor(props){
        super(props)
        this.addTribeGroup = this.addTribeGroup.bind(this)
        this.goToChallenge = this.goToChallenge.bind(this)
        this.toggle = this.toggle.bind(this)
        this.state ={
            groupName: null,
            isAddOpen: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };


    goToChallenge(){
        this.props.navigation.navigate('Feed')
    }


    toggle(){
        this.props.navigation.goBack()
    }


    addTribeGroup() {


        if (this.state.groupName !== null) {

            this.setState({isAddOpen: false})
            let group = {
                photo: null,
                name: this.state.groupName,
                members: [this.props.user.user.userID],
                id: moment().format(),
                userTribeIDs: [],
                tribeGroupTribeIDs: [],

            };
            this.props.addTribeGroup(group);
            this.props.addToGroup(group.members[0], group.id)
        }
    }

    render() {
        const { navigation } = this.props;
        console.log(this.props.user);
        return (
            <ScrollView style  = {{marginTop: 0, backgroundColor: 'white'}}>
                <View style = {{flexDirection: "row", marginTop: 50, justifyContent: "space-between", alignItems: "center", padding: 5}}>
                    <Text style = {{fontWeight: "bold", fontSize: 29, color: "#326FFF"}}> bestlife </Text>

                </View>

                <View style = {{margin: 7, padding: 2, borderRadius: 5, backgroundColor: "white",borderWidth: 2, borderColor:"white",shadowColor: "#6F6F6F",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 5,}}>

                <GroupTribeRoot
                    groupID = {JSON.stringify(navigation.getParam('groupID'))}
                    toggle = {this.toggle}
                    isSideMenu = {true}
                    goToChallenge = {this.goToChallenge}
                />
                </View>
            </ScrollView>
        );
    }
}

HomeView.propTypes = {};

const mapDispatchToProps = (dispatch) => {
    return {
        addTribeGroup: (tribeGroup) => dispatch(addTribeGroup(tribeGroup)),
        addToGroup: (userID, groupID) => dispatch(addToGroup(userID, groupID))
    };
};

const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);



{/*<Button*/}
{/*    containerStyle = {{borderRadius: 6,}}*/}
{/*    raised*/}
{/*    type = 'clear'*/}
{/*    onPress = {() => this.props.navigation.goBack()}*/}
{/*    title = 'Most Recent'*/}
{/*    iconRight = {true}*/}
{/*    titleStyle = {{color: 'black', marginLeft: 5}}*/}
{/*    icon = {*/}
{/*        <Ionicons*/}
{/*            name = {'ios-arrow-forward'}*/}
{/*            style = {{color: 'black', marginLeft: 5, marginTop: 2}}*/}
{/*            size = {30}*/}
{/*            onPress = {() => this.props.navigation.goBack()}*/}
{/*        />*/}
{/*    }*/}
{/*/>*/}




{/*{!(this.state.isAddOpen)*/}
{/*    ?  <Button*/}
{/*        containerStyle={{margin: 10, marginTop: 15, borderRadius: 6,}}*/}
{/*        raised*/}
{/*        onPress={() => this.setState({isAddOpen: true})}*/}
{/*        title='Add Group'*/}
{/*        titleStyle={{color: 'white', marginLeft: 5, fontWeight: "bold"}}*/}
{/*        buttonStyle={{backgroundColor: '#186aed'}}*/}
{/*        icon={*/}
{/*            <Ionicons*/}
{/*                name={'md-add'}*/}
{/*                style={{color: 'white'}}*/}
{/*                size={30}*/}
{/*                onPress={() => this.setState({isAddOpen: true})}*/}
{/*            />*/}
{/*        }*/}
{/*    />*/}
{/*    : <View style={{margin: 7, padding: 2, borderRadius: 5, borderWidth: 2, borderColor: "#186aed"}}>*/}
{/*        <Input*/}
{/*            label='New Group Name'*/}
{/*            value={this.state.groupName}*/}
{/*            labelStyle={{color: "black"}}*/}
{/*            placeholder='add a name'*/}
{/*            selectionColor="black"*/}
{/*            containerStyle={{margin: 10, width: '90%'}}*/}
{/*            placeholderTextColor='grey'*/}
{/*            inputContainerStyle={{borderColor: "#186aed", marginBottom: 10}}*/}
{/*            inputStyle={{color: "black",}}*/}
{/*            leftIcon={*/}
{/*                <Ionicons*/}
{/*                    name='ios-at'*/}
{/*                    size={24}*/}
{/*                    color="#186aed"*/}
{/*                    style={{paddingRight: 10, marginLeft: -15}}*/}
{/*                />*/}
{/*            }*/}
{/*            onChangeText={(text) => this.setState({groupName: text})}*/}
{/*        />*/}


{/*        <Button*/}
{/*            containerStyle={{margin: 10, marginTop: -10, borderRadius: 6,}}*/}
{/*            raised*/}
{/*            onPress={() => this.addTribeGroup()}*/}
{/*            title='Add Group'*/}
{/*            titleStyle={{color: 'white', marginLeft: 5, fontWeight: "bold"}}*/}
{/*            buttonStyle={{backgroundColor: '#186aed'}}*/}
{/*            icon={*/}
{/*                <Ionicons*/}
{/*                    name={'md-add'}*/}
{/*                    style={{color: 'white'}}*/}
{/*                    size={30}*/}
{/*                    onPress={() => this.addTribeGroup()}*/}
{/*                />*/}
{/*            }*/}
{/*        />*/}
{/*    </View>*/}
{/*}*/}

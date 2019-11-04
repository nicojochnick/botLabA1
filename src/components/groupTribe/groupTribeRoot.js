import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native'
import {styles} from '../theme';
import TribeComponent from '../tribe/tribe';
import GroupTribeContainer from './groupTribeContainer';
import firebase from '@react-native-firebase/app';
import {addTribeGroup, updateCurrentTribe} from '../../redux/actions';
import {connect} from 'react-redux';
import GroupTribeComponent from './groupTribeComponent';


class GroupTribeRoot extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('groups')
        this.navigate = this.navigate.bind(this)
        this.state = {
            tribes: null,

        }
    }
    navigate(id){
        this.props.updateCurrentTribe(id)
        if (this.props.isSideMenu) {
            this.props.goToChallenge()
        }
    }

    componentDidMount(): void {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        this.ref.where("members", 'array-contains',this.props.user.user.userID).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ tribes: data, loading: false })
        });
    };

    render() {
        return (
            <View>
                <FlatList
                    style={{}}
                    data={this.state.tribes}
                    listKey={(item, index) => 'D' + index.toString()}
                    renderItem={({item}) => (
                       <GroupTribeContainer
                           tribeName = {item.name}
                           id = {item.id}
                           tribeMembers = {item.members}
                           tribeDescription = {item.description}
                           userTribeIDs = {item.userTribeIDs}
                           tribeGroupTribeIDs = {item.tribeGroupTribeIDs}
                           navigate = {this.navigate}
                       />
                       )}
                    />
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentTribe: (tribe) => dispatch(updateCurrentTribe(tribe)),
    };
};

const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupTribeRoot);



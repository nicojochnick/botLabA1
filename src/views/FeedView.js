import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../components/feed/feedContainer';
import firebase from "react-native-firebase";





class FeedView extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users')
        this.user = firebase.auth().currentUser;
        this.state = {
            search: '',
            alwaysMe: null,
            uid: null,
            friendIDs: [],
            loading: true
        };
    }

    updateSearch = search => {
        this.setState({search});
    };

    componentDidMount(): void {
        let user = firebase.auth().currentUser;
        this.setState({uid: user.uid});
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = (snapshot) => {
        let user = firebase.auth().currentUser;
        this.ref.where('fbID', '==', user.uid).get().then((snapshot) => {
            console.log(snapshot);
            let data = snapshot.docs.map(function (documentSnapshot) {
                console.log(documentSnapshot.data());
                return documentSnapshot.data()
            });
            let user = data[0];
            this.setState({alwaysMe: user.userID});
            this.setState({friendIDs: user.friendIDs});
            this.setState({loading: false});
        });
    };


    render() {
        const {search} = this.state;
        console.log(this.state.friendIDs);
        console.log(this.state.alwaysMe);
        return (
            <View style={{paddingTop: 50, backgroundColor: '#E0E7EA'}}>
                <SearchBar
                    lightTheme={true}
                    placeholder='search friends'
                    onChangeText={this.updateSearch}
                    value={search}
                    clearIcon={
                        <Ionicons
                            name={'ios-close'}
                            size={25}
                        />
                    }
                    searchIcon={
                        <Ionicons
                            name={'ios-search'}
                            size={25}
                        />
                    }
                />
                <FeedContainer
                    alwaysMe={this.state.alwaysMe}
                    friendIDs={this.state.friendIDs}
                />
            </View>
            );
        }
}

FeedView.propTypes = {};
export default FeedView;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchComponent from './searchComponent';
import TribeGroup from '../groups/tribeGroup';
import firebase from '@react-native-firebase/app';

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.triggerSearch = this.triggerSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.state = {
            gotMems: false,
            searchData: null,
        }
    }
    triggerSearch(fEmail) {
        this.getEmails(fEmail)
    }

    getEmails(mail){
        const db = firebase.firestore();
        // db.settings({ timestampsInSnapshots: true});
        db.collection('users').where("email", '==',mail).get().then((snapshot) => {
            let data = snapshot.docs.map(function(documentSnapshot) {
                return documentSnapshot.data()
            });
            this.setState({ searchData: data })
        });
    }
    clearSearch(){
        this.setState({searchData: null })
    }

    // triggerAdd(){
    //     this.props.addFriendIDDB(this.state.searchData[0].userID,this.props.myID);
    //     // this.props.addFriendDB(this.state.searchData[0], this.props.myID);
    //     this.setState({searchData: null})
    // }

    render() {
        return (
            <SearchComponent
                gotMems = {null}
                getTribeMembers = {this.getTribeMembers}
                triggerSearch = {this.triggerSearch}
                searchData = {this.state.searchData}
                clearSearch = {this.clearSearch}
            />
        );
    }
}

SearchContainer.propTypes = {};

export default SearchContainer;

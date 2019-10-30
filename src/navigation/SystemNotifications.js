import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase from '@react-native-firebase/app';
import {connect} from 'react-redux';

class SystemNotifications extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('notifications');
        this.state = {
            notifications: [],

        }
    };

    componentDidMount(): void {
        this.unsubscribe =  this.ref.onSnapshot(this.onCollectionUpdate)

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onCollectionUpdate = async (snapshot) => {
        let id = this.props.user.userID;
        if (id) {

            this.ref.where("toUserID", '==', this.props.user.userID).get().then((snapshot) => {
                let data = snapshot.docs.map(function (documentSnapshot) {
                    return documentSnapshot.data()
                });
                this.setState({notifications: data, loading: false})
            });
        }
    };
    render() {
        return (
            null
        );
    }
}

SystemNotifications.propTypes = {};


const mapStateToProps = (state /*, ownProps*/) => ({
    user: state.user.user
});


export default connect(mapStateToProps,null)(SystemNotifications);

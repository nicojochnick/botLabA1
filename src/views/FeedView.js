import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';





class FeedView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }




    updateSearch = search => {
        this.setState({ search });
    };




    render() {
        const { search } = this.state;

        return (
            <View style = {{paddingTop: 50, backgroundColor: '#E0E7EA'}}>
                <SearchBar

                    lightTheme = {true}
                    placeholder = 'search friends'
                    onChangeText={this.updateSearch}
                    onClear = {console.log("clear")}
                    value={search}
                    clearIcon ={
                        <Ionicons
                        name={'ios-close'}
                        size={25}
                        />
                    }
                    searchIcon = {
                        <Ionicons
                            name = {'ios-search'}
                            size = {25}

                        />
                    }

                />


            </View>
        );
    }
}

FeedView.propTypes = {};

export default FeedView;

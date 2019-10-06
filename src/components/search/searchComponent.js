import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';

class SearchComponent extends Component {

    constructor(props){
        super(props)
    }


    render() {
        return (
            <SearchBar
                lightTheme={true}
                placeholder='search friends'
                onChangeText={() => this.updateSearch}
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
        );
    }
}

SearchComponent.propTypes = {};

export default SearchComponent;

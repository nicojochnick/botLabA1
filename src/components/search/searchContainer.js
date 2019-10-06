import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchComponent from './searchComponent';

class SearchContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <SearchComponent/>
        );
    }
}

SearchContainer.propTypes = {};

export default SearchContainer;

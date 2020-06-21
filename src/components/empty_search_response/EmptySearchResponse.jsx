import React, {Component} from 'react';
import PropTypes from "prop-types";

import './EmptySearchResponse.scss';

class EmptySearchResponse extends Component {
    render() {

        const {
            title,
            information
        } = this.props;

        return (
            <div>
                <div className="search__wrapper_div">
                    <i className="fa fa-search search__icon" aria-hidden="true"></i>
                    <div className="search__title">{title}</div>
                    <div className="search__information">{information}</div>
                </div>
            </div>
        );
    }
}

EmptySearchResponse.prototypes = {
    title: PropTypes.string,
    information: PropTypes.string
};

EmptySearchResponse.defaultProps = {
    title: 'No search results',
    information: 'Kindly try change the search parameters'
};

export default EmptySearchResponse;

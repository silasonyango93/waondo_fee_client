import React, {Component} from 'react';
import PropTypes from "prop-types";

import './Accordion.scss';

class Accordion extends Component {
    state = {
        isAccordionContentDisplayed: false
    };

    handleAccordionHeadClicked = () => {
        this.setState({isAccordionContentDisplayed: !this.state.isAccordionContentDisplayed});
    };

    render() {
        const {
            isAccordionContentDisplayed
        } = this.state;

        const {
            title,
            subtitle
        } = this.props;
        return (
            <div>
            <div className="accordion__head-section" onClick={this.handleAccordionHeadClicked}>
                <div className="accordion__text-div">
                <div className="accordion__header-title">{title}</div>
                <div className="accordion__header-description">{subtitle}</div>
                </div>

                <div className="accordion__icon-div">
                    {isAccordionContentDisplayed ? '-' : '+'}
                </div>
            </div>
                {isAccordionContentDisplayed && (<div className="accordion__bottom-header-stroke"></div>)}

                <div className="accordion__content-container">
                    {isAccordionContentDisplayed && this.props.children}
                </div>

            </div>
        );
    }
}


Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

Accordion.defaultProps = {
    subtitle: '',
};

export default Accordion;

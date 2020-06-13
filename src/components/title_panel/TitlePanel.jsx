import React, {Component} from 'react';

import PropTypes from "prop-types";
import './TitlePanel.scss';

class TitlePanel extends Component {
    render() {

        const {
            title,
            userName,
            userEmail,
            userNameInitials
        } = this.props;

        return (
            <div className="panel__main-body">
                <div className="panel__text-div">
                    <div className="col-sm-8 panel__left-column">
                        <div className="panel__inner-left-column">
                            <div className="panel__title">{title}</div>
                            <div className="">{new Date().toDateString()+"  |  "+new Date().getHours()+":"+new Date().getMinutes()}</div>
                        </div>

                    </div>
                    <div className="col-sm-4 panel__right-column">

                            <div className="panel__profile-div">
                                <div className="col-sm-8 panel__contact-div">
                                    <div className="panel__name-text">
                                        {userName}
                                    </div>
                                    <div className="panel__email-text">
                                        {userEmail}
                                    </div>
                                </div>
                                <div className="col-sm-4 panel__inner-profile-div">
                                    <div className="panel__profile-circle">
                                        <div className="panel__profile-circle-text">
                                            {userNameInitials}
                                        </div>
                                    </div>
                                </div>

                            </div>


                    </div>
                </div>
            </div>
        );
    }
}

TitlePanel.propTypes = {
    title: PropTypes.string,
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    userNameInitials: PropTypes.string,
};

TitlePanel.defaultProps = {
    title: 'Leave and holiday management',
    userName: 'Silas Onyango',
    userEmail: 'silas.onyango93@gmail.com',
    userNameInitials: 'SO'
};

export default TitlePanel;

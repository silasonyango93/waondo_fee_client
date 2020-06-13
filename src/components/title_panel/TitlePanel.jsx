import React, {Component} from 'react';

import './TitlePanel.scss';

class TitlePanel extends Component {
    render() {
        return (
            <div className="panel__main-body">
                <div className="panel__text-div">
                    <div className="col-sm-8">
                        <div className="panel__title">Leave and holiday management</div>
                        <div className="">{new Date().toDateString()+"  |  "+new Date().getHours()+":"+new Date().getMinutes()}</div>
                    </div>
                    <div className="col-sm-4 panel__right-column">
                        <div className="panel__profile-div">
                            <div className="col-sm-6">y</div>
                            <div className="col-sm-6 panel__inner-profile-div">
                                <div className="panel__profile-circle">
                                    <div className="panel__profile-circle-text">
                                        SO
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

export default TitlePanel;

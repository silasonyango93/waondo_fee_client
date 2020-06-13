import React, {Component} from 'react';

import './TitlePanel.scss';

class TitlePanel extends Component {
    render() {
        return (
            <div className="panel__main-body">
                <div className="panel__text-div">
                    <div className="panel__title">Leave and holiday management</div>
                    <div className="">{new Date().toDateString()+"  |  "+new Date().getHours()+":"+new Date().getMinutes()}</div>
                </div>
            </div>
        );
    }
}

export default TitlePanel;

import React, {Component} from 'react';

import './PrivilegeContent.scss';
import CheckBox from "../../check_box/CheckBox";
import CheckBoxGroup from "../../check_box_group/CheckBoxGroup";

class PrivilegeContent extends Component {
    render() {
        return (
            <div className="privilege__main-body">
                <CheckBoxGroup />

                <CheckBoxGroup />
                <CheckBoxGroup />

            </div>
        );
    }
}

export default PrivilegeContent;

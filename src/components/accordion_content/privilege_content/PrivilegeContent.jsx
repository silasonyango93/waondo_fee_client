import React, {Component} from 'react';

import './PrivilegeContent.scss';

class PrivilegeContent extends Component {
    render() {
        return (
            <div className="privilege__main-body">
                <div className="privilege__role-div">
                    <div className="privilege__role-title">User Roles</div>
                    <div className="privilege__checkbox-div">
                    <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">User is an admin</label><br />
                    <input type="checkbox" name="vehicle1" value="Bike" />
                    <label className="privilege__label" htmlFor="vehicle1">User is a normal staff</label><br />
                    </div>
                </div>

                <div className="privilege__role-div">
                    <div className="privilege__role-title">Admin Access Privileges</div>
                    <div className="privilege__checkbox-div">
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Log into the system</label><br />
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Register a student</label><br />
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Pay fee for a student</label><br />
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Correct a fee payment</label><br />
                    </div>
                </div>

                <div className="privilege__role-div">
                    <div className="privilege__role-title">Staff Access Privileges</div>
                    <div className="privilege__checkbox-div">
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Log into the system</label><br />
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Register a student</label><br />
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Pay fee for a student</label><br />
                        <input type="checkbox" name="vehicle1" value="Bike" />
                        <label className="privilege__label" htmlFor="vehicle1">Correct a fee payment</label><br />
                    </div>
                </div>

            </div>
        );
    }
}

export default PrivilegeContent;

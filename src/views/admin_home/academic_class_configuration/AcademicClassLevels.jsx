import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../components/table/table_body/Table";
import './AcademicClassLevels.scss';
import {toggleAdminModalDisplay} from "../../../store/modules/admin_home/actions";
import AdminDialog from "../admin_dialog/AdminDialog";


class AcademicClassLevels extends Component {
    render() {
        return (
            <div>
                <AdminDialog />
                <div className="level__table-div">
                <Table addIconClicked={()=>{this.props.toggleAdminModalDisplay(true);}}/>
                </div>
            </div>
        );
    }
}


AcademicClassLevels.propTypes = {

    toggleAdminModalDisplay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    toggleAdminModalDisplay: isAdminModalDisplayed => dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcademicClassLevels);

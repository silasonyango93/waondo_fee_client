import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    fetchAllWeekIterations,
    setupWeekIterationsForm
} from "../../../../store/modules/admin_home/actions";
import AccordionTable from "../../../../components/accordion_table/AccordionTable";
import './UserRegistration.scss';

class UserRegistration extends Component {
    state = {
        userArray: []
    };

    componentDidMount() {

        const {
            allUsers
        } = this.props;

        let userArray = allUsers;

        for(let i = 0;i < allUsers.length; i++) {
            let accordionRoleTitle = '';

            if(allUsers && allUsers.length && allUsers[i] && allUsers[i].rolesArray && allUsers[i].rolesArray.length && allUsers[i].rolesArray.length === 1) {
                accordionRoleTitle = allUsers[i].rolesArray[0].roleDescription;

            } else if(allUsers && allUsers.length && allUsers[i] && allUsers[i].rolesArray && allUsers[i].rolesArray.length && allUsers[i].rolesArray.length > 1) {
                accordionRoleTitle = allUsers[i].rolesArray[0].roleDescription + "/" +allUsers[i].rolesArray[1].roleDescription;
            }

            userArray[i].accordionSubtitle = accordionRoleTitle;

        }

        this.setState({userArray});

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allWeekIterations !== prevProps.allWeekIterations) {
            if (this.props.allWeekIterations && this.props.allWeekIterations.length) {
                let allWeekIterations = this.props.allWeekIterations.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            WeekIterationDescription: item.WeekIterationDescription
                        };
                    }
                );

                this.setState({ tableData: allWeekIterations });
            }
        }
    }

    render() {
        console.log();
        return (
            <div className="registration__main-body">
                <AccordionTable accordionTableArray={this.state.userArray}/>
            </div>
        );
    }
}

UserRegistration.propTypes = {
    setupWeekIterationsForm: PropTypes.func.isRequired,
    fetchAllWeekIterations: PropTypes.func.isRequired,
    allWeekIterations: PropTypes.arrayOf(PropTypes.object).isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allWeekIterations: state.admin_home.weekIterations.allWeekIterations,
    allUsers: state.current_session.allUsers
});

const mapDispatchToProps = dispatch => ({
    setupWeekIterationsForm: () => dispatch(setupWeekIterationsForm()),
    fetchAllWeekIterations: () => dispatch(fetchAllWeekIterations())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegistration);

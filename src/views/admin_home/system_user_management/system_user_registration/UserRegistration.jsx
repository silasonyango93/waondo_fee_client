import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
   setupSystemUserRegistrationForm
} from "../../../../store/modules/admin_home/actions";
import AccordionTable from "../../../../components/accordion_table/AccordionTable";
import "./UserRegistration.scss";

class UserRegistration extends Component {
  state = {
    userArray: []
  };

  componentDidMount() {
    const { allUsers } = this.props;

    let userArray = allUsers;

    for (let i = 0; i < allUsers.length; i++) {
      let accordionRoleTitle = "";

      if (
        allUsers &&
        allUsers.length &&
        allUsers[i] &&
        allUsers[i].userRolesDtoList &&
        allUsers[i].userRolesDtoList.length
      ) {
        if (
          (allUsers[i].userRolesDtoList[0].roleDescription === "Admin" &&
            allUsers[i].userRolesDtoList[0].confirmationStatus === 1 &&
            allUsers[i].userRolesDtoList[1].confirmationStatus === 0) ||
          (allUsers[i].userRolesDtoList[1].roleDescription === "Admin" &&
            allUsers[i].userRolesDtoList[1].confirmationStatus === 1 &&
            allUsers[i].userRolesDtoList[0].confirmationStatus === 0)
        ) {
          accordionRoleTitle = allUsers[i].userRolesDtoList[0].roleDescription;
        } else if (
          allUsers[i].userRolesDtoList[0].confirmationStatus === 0 &&
          allUsers[i].userRolesDtoList[1].confirmationStatus === 0
        ) {
          accordionRoleTitle = "Not assigned any role";
        } else {
          accordionRoleTitle =
            allUsers[i].userRolesDtoList[0].roleDescription +
            "/" +
            allUsers[i].userRolesDtoList[1].roleDescription;
        }
      }

      userArray[i].accordionSubtitle = accordionRoleTitle;
    }

    this.setState({ userArray });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const { allUsers } = this.props;

    if(allUsers !== prevProps.allUsers) {
      if(allUsers && allUsers.length) {
        let userArray = allUsers;

        for (let i = 0; i < allUsers.length; i++) {
          let accordionRoleTitle = "";

          if (
              allUsers &&
              allUsers.length &&
              allUsers[i] &&
              allUsers[i].userRolesDtoList &&
              allUsers[i].userRolesDtoList.length
          ) {
            if (
                (allUsers[i].userRolesDtoList[0].roleDescription === "Admin" &&
                    allUsers[i].userRolesDtoList[0].confirmationStatus === 1 &&
                    allUsers[i].userRolesDtoList[1].confirmationStatus === 0) ||
                (allUsers[i].userRolesDtoList[1].roleDescription === "Admin" &&
                    allUsers[i].userRolesDtoList[1].confirmationStatus === 1 &&
                    allUsers[i].userRolesDtoList[0].confirmationStatus === 0)
            ) {
              accordionRoleTitle = allUsers[i].userRolesDtoList[0].roleDescription;
            } else if (
                allUsers[i].userRolesDtoList[0].confirmationStatus === 0 &&
                allUsers[i].userRolesDtoList[1].confirmationStatus === 0
            ) {
              accordionRoleTitle = "Not assigned any role";
            } else {
              accordionRoleTitle =
                  allUsers[i].userRolesDtoList[0].roleDescription +
                  "/" +
                  allUsers[i].userRolesDtoList[1].roleDescription;
            }
          }

          userArray[i].accordionSubtitle = accordionRoleTitle;
        }

        this.setState({ userArray });
      }
    }
  }



  render() {
    return (
      <div className="registration__main-body">
        <AccordionTable accordionTableArray={this.state.userArray} callToActionFunction={this.props.setupSystemUserRegistrationForm}/>
      </div>
    );
  }
}

UserRegistration.propTypes = {
  setupSystemUserRegistrationForm: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allUsers: state.current_session.allUsers
});

const mapDispatchToProps = dispatch => ({
  setupSystemUserRegistrationForm: () => dispatch(setupSystemUserRegistrationForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRegistration);

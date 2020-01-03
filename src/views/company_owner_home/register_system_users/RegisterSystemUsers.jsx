import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getACompanysSystemUsers,
  registerASystemUser,
  resetCurrentSystemUserCreatedSuccessfully
} from "../../../store/modules/company_owner_home/actions";
import Table from "../../../components/table/table_body/Table";

class RegisterSystemUsers extends Component {
  state = {
    SelectedCompanyBranchId: "",
    myCompanyBranches: [],
    firstName: "",
    middleName: "",
    surname: "",
    staffNo: "",
    nationalId: "",
    email: "",
    phoneNumber: "",
    physicalAddress: "",
    password: "",
    SelectedGenderId: "",
    genderCategories: [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" }
    ],
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Name",
      columnTwo: "Staff No",
      columnThree: "Branch Name",
      columnFour: "Registration Date"
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.myCompanyBranches !== prevProps.myCompanyBranches) {
      let myCompanyBranches = this.props.myCompanyBranches;
      myCompanyBranches = myCompanyBranches.map(item => {
        return {
          label: item.BranchName,
          value: item.CompanyBranchId
        };
      });
      this.setState({ myCompanyBranches: myCompanyBranches });
    }

    if (
      this.props.isCurrentSystemUserCreatedSuccessfully !==
      prevProps.isCurrentSystemUserCreatedSuccessfully
    ) {
      if (this.props.isCurrentSystemUserCreatedSuccessfully) {
        const payload = {
          companyId: this.props.CompanyId
        };
        this.props.getACompanysSystemUsers(payload);
        this.props.resetCurrentSystemUserCreatedSuccessfully();
      }
    }

    if (this.props.myCompanySystemUsers !== prevProps.myCompanySystemUsers) {
      let companyBranches;

      companyBranches = this.props.myCompanySystemUsers.map((item, index) => {
        return {
          id: index + 1,
          name:
            item.UserFirstName +
            " " +
            item.UserMiddleName +
            " " +
            item.UserSurname,
          staffNo: item.StaffNo,
          branchName: item.BranchName,
          registrationDate: item.UserRegistrationDate
        };
      });

      this.setState({ tableData: companyBranches });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const payload = {
      CompanyBranchId: this.state.SelectedCompanyBranchId.value,
      UserFirstName: this.state.firstName,
      UserMiddleName: this.state.middleName,
      UserSurname: this.state.surname,
      GenderId: this.state.SelectedGenderId.value,
      StaffNo: this.state.staffNo,
      UserNationalId: this.state.staffNo,
      UserEmail: this.state.email,
      UserPhoneNumber: this.state.phoneNumber,
      UserPhysicalAddress: this.state.physicalAddress,
      Password: this.state.password
    };

    this.props.registerASystemUser(payload);
  };

  handleChange = event => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState({
      ...newState
    });
  };

  render() {
    return (
      <div>
        <div className="container user-login-card">
          <div className="row">
            <div className="col-md-4">
              <div className="login-panel panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Company Branches</h3>
                </div>
                <div className="panel-body">
                  <form
                    action=""
                    method="POST"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <fieldset>
                      <div className="form-group">
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          placeholder="Company Branch"
                          name="SelectedCompanyBranchId"
                          closeMenuOnSelect={true}
                          value={this.state.SelectedCompanyBranchId}
                          onChange={value =>
                            this.setState({
                              ...this.state,
                              SelectedCompanyBranchId: value
                            })
                          }
                          options={this.state.myCompanyBranches}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="firstName"
                          className="form-control"
                          placeholder="First Name"
                          value={this.state.firstName}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="middleName"
                          className="form-control"
                          placeholder="Middle Name"
                          value={this.state.middleName}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="surname"
                          className="form-control"
                          placeholder="Surname"
                          value={this.state.surname}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          placeholder="Gender"
                          name="SelectedGenderId"
                          closeMenuOnSelect={true}
                          value={this.state.SelectedGenderId}
                          onChange={value =>
                            this.setState({
                              ...this.state,
                              SelectedGenderId: value
                            })
                          }
                          options={this.state.genderCategories}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="staffNo"
                          className="form-control"
                          placeholder="Staff No"
                          value={this.state.staffNo}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="nationalId"
                          className="form-control"
                          placeholder="National ID"
                          value={this.state.nationalId}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={this.state.email}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="phoneNumber"
                          className="form-control"
                          placeholder="Phone Number"
                          value={this.state.phoneNumber}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="physicalAddress"
                          className="form-control"
                          placeholder="Physical Address"
                          value={this.state.physicalAddress}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.password}
                          type="password"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-success btn-block"
                      >
                        Submit
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <Table
                tableTitle="Registered Staff Members"
                tableHeaderObject={this.state.tableHeaders}
                tableData={this.state.tableData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterSystemUsers.propTypes = {
  CompanyId: PropTypes.string.isRequired,
  registerASystemUser: PropTypes.func.isRequired,
  isCurrentSystemUserCreatedSuccessfully: PropTypes.bool.isRequired,
  myCompanySystemUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  getACompanysSystemUsers: PropTypes.func.isRequired,
  resetCurrentSystemUserCreatedSuccessfully: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myCompanyBranches: state.company_owner_home.myCompanyBranches,
  isCurrentSystemUserCreatedSuccessfully:
    state.company_owner_home.isCurrentSystemUserCreatedSuccessfully,
  CompanyId: state.company_owner_home.companyOwnersCompanyDetails.CompanyId,
  myCompanySystemUsers: state.company_owner_home.myCompanySystemUsers
});

const mapDispatchToProps = dispatch => ({
  registerASystemUser: payload => dispatch(registerASystemUser(payload)),
  getACompanysSystemUsers: payload =>
    dispatch(getACompanysSystemUsers(payload)),
  resetCurrentSystemUserCreatedSuccessfully: () =>
    dispatch(resetCurrentSystemUserCreatedSuccessfully())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterSystemUsers);

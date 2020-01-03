import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";
import {
  getAllCompanyOwners,
  registerCompanyOwner,
  resetCurrentCompanyOwnerRegistration,
  submitOwnersGroupsRshipForm
} from "../../../store/modules/admin_home/actions";
import Table from "../../../components/table/table_body/Table";

class RegisterCompanyOwners extends Component {
  state = {
    AllCompanies: [],
    SelectedCompanyId: "",
    firstName: "",
    middleName: "",
    surname: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    password: "",
    SelectedGenderId: "",
    genderCategories: [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" }
    ],
    tableData: [],
    tableHeaders: {
      columnOne: "#",
      columnTwo: "Name",
      columnThree: "Company Name",
      columnFour: "National ID",
      columnFive: "Phone Number",
      columnSix: "Email",
      columnSeven: "Registration Date",
    }
  };


  componentDidUpdate(prevProps) {
    if (
        this.props.allRegisteredCompanies !== prevProps.allRegisteredCompanies
    ) {
      let allRegisteredCompanies = this.props.allRegisteredCompanies;
      allRegisteredCompanies = allRegisteredCompanies.map(item => {
        return {
          label: item.OwnershipGroupName,
          value: item.CompanyOwnershipGroupId
        };
      });
      this.setState({ AllCompanies: allRegisteredCompanies });
    }

    if (
        this.props.isCompanyOwnerSuccessfullyRegistered !== prevProps.isCompanyOwnerSuccessfullyRegistered
    ) {

      if(this.props.isCompanyOwnerSuccessfullyRegistered) {
        const payload = {
          CompanyOwnershipGroupId: this.state.SelectedCompanyId.value,
          CompanyOwnerId: this.props.currentCompanyOwnerDbRecordId
        };

        this.props.submitOwnersGroupsRshipForm(payload);
        this.props.getAllCompanyOwners();
        this.props.resetCurrentCompanyOwnerRegistration();
      }

    }

    if(this.props.allCompanyOwners !== prevProps.allCompanyOwners) {

      let companyOwners;

      companyOwners = this.props.allCompanyOwners.map(
          (item, index) => {
            return {
              id: index + 1,
              name:
                  item.OwnerFirstName +
                  " " +
                  item.OwnerMiddleName +
                  " " +
                  item.OwnerSurname,
              CompanyName: item.CompanyName,
              OwnerNationalId: item.OwnerNationalId,
              OwnerPhoneNumber: item.OwnerPhoneNumber,
              OwnerEmail: item.OwnerEmail,
              OwnerRegisteredDate: item.OwnerRegisteredDate
            };
          }
      );

      this.setState({ tableData: companyOwners });

    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const payload = {
      OwnerFirstName: this.state.firstName,
      OwnerMiddleName: this.state.middleName,
      OwnerSurname: this.state.surname,
      OwnerNationalId: this.state.nationalId,
      OwnerPhoneNumber: this.state.phoneNumber,
      OwnerEmail: this.state.email,
      GenderId: this.state.SelectedGenderId.value,
      Password: this.state.password
    };

    this.props.registerCompanyOwner(payload);
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
                  <h3 className="panel-title">Register Company Owners</h3>
                </div>
                <div className="panel-body">
                  <form
                    action=""
                    autoComplete="off"
                    method="POST"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <fieldset>
                      <div className="form-group">
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Company"
                            name="SelectedCompanyId"
                            closeMenuOnSelect={true}
                            value={this.state.SelectedCompanyId}
                            onChange={value =>
                                this.setState({
                                  ...this.state,
                                  SelectedCompanyId: value
                                })
                            }
                            options={this.state.AllCompanies}
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
                          name="nationalId"
                          className="form-control"
                          autoComplete="off"
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
                          name="password"
                          className="form-control"
                          autoComplete="off"
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

          </div>

          <div className="row">
          <div className="col-md-12">
            <Table
                tableTitle="Registered Company Owners"
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

RegisterCompanyOwners.propTypes = {
  registerCompanyOwner: PropTypes.func.isRequired,
  allRegisteredCompanies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCompanyOwnerSuccessfullyRegistered: PropTypes.bool.isRequired,
  currentCompanyOwnerDbRecordId: PropTypes.string.isRequired,
  submitOwnersGroupsRshipForm: PropTypes.func.isRequired,
  resetCurrentCompanyOwnerRegistration: PropTypes.func.isRequired,
  getAllCompanyOwners: PropTypes.func.isRequired,
  allCompanyOwners: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allRegisteredCompanies: state.admin_home.allRegisteredCompanies,
  isCompanyOwnerSuccessfullyRegistered: state.admin_home.isCompanyOwnerSuccessfullyRegistered,
  currentCompanyOwnerDbRecordId: state.admin_home.currentCompanyOwnerDbRecordId,
  allCompanyOwners: state.admin_home.allCompanyOwners
});

const mapDispatchToProps = dispatch => ({
  registerCompanyOwner: payload => dispatch(registerCompanyOwner(payload)),
  submitOwnersGroupsRshipForm: payload =>
      dispatch(submitOwnersGroupsRshipForm(payload)),
  resetCurrentCompanyOwnerRegistration: () => dispatch(resetCurrentCompanyOwnerRegistration()),
  getAllCompanyOwners: () => dispatch(getAllCompanyOwners())
});

export default connect(
    mapStateToProps,
  mapDispatchToProps
)(RegisterCompanyOwners);

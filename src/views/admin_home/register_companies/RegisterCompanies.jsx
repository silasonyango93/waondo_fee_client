import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";
import {
  createOwnershipGroup,
  getAllRegisteredCompanyClients,
  resetRegisteredCompanyClientsFlag
} from "../../../store/modules/admin_home/actions";
import Table from "../../../components/table/table_body/Table";

class RegisterCompanies extends Component {
  state = {
    companyName: "",
    tableData: [],
    tableHeaders: {
      columnOne: "#",
      columnTwo: "Company Name",
      columnThree: "Registration Date"
    }
  };

  componentDidMount() {
    let registeredCompanies;

    registeredCompanies = this.props.allRegisteredCompanyClients.map(
      (item, index) => {
        return {
          id: index + 1,
          CompanyName: item.CompanyName,
          CompanyRegistrationDate: item.CompanyRegistrationDate
        };
      }
    );

    this.setState({ tableData: registeredCompanies });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isCurrentCompanySuccessfullyRegistered !==
      prevProps.isCurrentCompanySuccessfullyRegistered
    ) {
      if (this.props.isCurrentCompanySuccessfullyRegistered) {
        this.props.getAllRegisteredCompanyClients();
        this.props.resetRegisteredCompanyClientsFlag();
      }
    }

    if (
      this.props.allRegisteredCompanyClients !==
      prevProps.allRegisteredCompanyClients
    ) {
      let registeredCompanies;

      registeredCompanies = this.props.allRegisteredCompanyClients.map(
        (item, index) => {
          return {
            id: index + 1,
            CompanyName: item.CompanyName,
            CompanyRegistrationDate: item.CompanyRegistrationDate
          };
        }
      );

      this.setState({ tableData: registeredCompanies });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const payload = {
      CompanyName: this.state.companyName
    };

    this.props.createOwnershipGroup(payload);
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
                  <h3 className="panel-title">Register Companies</h3>
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
                        <input
                          name="companyName"
                          className="form-control"
                          placeholder="Company Name"
                          value={this.state.companyName}
                          type="text"
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
                tableTitle="Registered Companies"
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

RegisterCompanies.propTypes = {
  createOwnershipGroup: PropTypes.func.isRequired,
  allRegisteredCompanyClients: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllRegisteredCompanyClients: PropTypes.func.isRequired,
  resetRegisteredCompanyClientsFlag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isCurrentCompanySuccessfullyRegistered:
    state.admin_home.isCurrentCompanySuccessfullyRegistered,
  allRegisteredCompanyClients: state.admin_home.allRegisteredCompanyClients
});

const mapDispatchToProps = dispatch => ({
  createOwnershipGroup: payload => dispatch(createOwnershipGroup(payload)),
  getAllRegisteredCompanyClients: () =>
    dispatch(getAllRegisteredCompanyClients()),
  resetRegisteredCompanyClientsFlag: () =>
    dispatch(resetRegisteredCompanyClientsFlag())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterCompanies);

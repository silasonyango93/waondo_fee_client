import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCompanies } from "../../../store/modules/admin_home/actions";
import {
  createCompanyBranch,
  getACompanysBranches,
  resetCurrentBranchCreatedSuccessfully
} from "../../../store/modules/company_owner_home/actions";
import Table from "../../../components/table/table_body/Table";

class RegisterCompanyBranches extends Component {
  state = {
    branchName: "",
    branchPhysicalAddress: "",
    tableData: [],
    tableHeaders: {
      columnOne: "#",
      columnTwo: "Branch Name",
      columnThree: "Physical Address",
      columnFour: "Registration Date"
    }
  };

  componentDidMount() {
    const paload = {
      column_name: "CompanyId",
      search_value: this.props.CompanyId
    };
    this.props.getACompanysBranches(paload);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isCurrentBranchCreatedSuccessfully !==
      prevProps.isCurrentBranchCreatedSuccessfully
    ) {
      if (this.props.isCurrentBranchCreatedSuccessfully) {
        const paload = {
          column_name: "CompanyId",
          search_value: this.props.CompanyId
        };
        this.props.getACompanysBranches(paload);
        this.props.resetCurrentBranchCreatedSuccessfully();
      }
    }

    if (this.props.myCompanyBranches !== prevProps.myCompanyBranches) {
      let companyBranches;

      companyBranches = this.props.myCompanyBranches.map((item, index) => {
        return {
          id: index + 1,
          branchName: item.BranchName,
          physicalAddress: item.BranchPhysicalAddress,
          registrationDate: item.CompanyBranchRegistrationDate
        };
      });

      this.setState({ tableData: companyBranches });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const payload = {
      CompanyId: this.props.CompanyId,
      BranchName: this.state.branchName,
      BranchPhysicalAddress: this.state.branchPhysicalAddress
    };

    this.props.createCompanyBranch(payload);
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
                        <input
                          name="branchName"
                          className="form-control"
                          placeholder="Branch Name"
                          value={this.state.branchName}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="branchPhysicalAddress"
                          className="form-control"
                          placeholder="Branch Physical Address"
                          value={this.state.branchPhysicalAddress}
                          type="textarea"
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
                tableTitle="Registered Company Branches"
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

RegisterCompanyBranches.propTypes = {
  createCompanyBranch: PropTypes.func.isRequired,
  CompanyId: PropTypes.string.isRequired,
  isCurrentBranchCreatedSuccessfully: PropTypes.bool.isRequired,
  getACompanysBranches: PropTypes.func.isRequired,
  myCompanyBranches: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetCurrentBranchCreatedSuccessfully: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  CompanyId: state.company_owner_home.companyOwnersCompanyDetails.CompanyId,
  isCurrentBranchCreatedSuccessfully:
    state.company_owner_home.isCurrentBranchCreatedSuccessfully,
  myCompanyBranches: state.company_owner_home.myCompanyBranches
});

const mapDispatchToProps = dispatch => ({
  createCompanyBranch: payload => dispatch(createCompanyBranch(payload)),
  getACompanysBranches: payload => dispatch(getACompanysBranches(payload)),
  resetCurrentBranchCreatedSuccessfully: payload =>
    dispatch(resetCurrentBranchCreatedSuccessfully(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterCompanyBranches);

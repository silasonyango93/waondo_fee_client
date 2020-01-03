import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  submitOwnersGroupsRshipForm
} from "../../../store/modules/admin_home/actions";

class CompanyOwnersRship extends Component {
  state = {
    SelectedCompanyId: "",
    SelectedOwnerIds: [],
    AllCompanies: [],
    allCompanyOwners: []
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

    if (this.props.allCompanyOwners !== prevProps.allCompanyOwners) {
      let allCompanyOwners = this.props.allCompanyOwners;
      allCompanyOwners = allCompanyOwners.map(item => {
        return {
          label:
            item.OwnerFirstName +
            " " +
            item.OwnerMiddleName +
            " " +
            item.OwnerSurname,
          value: item.CompanyOwnerId
        };
      });
      this.setState({ allCompanyOwners: allCompanyOwners });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.state.SelectedOwnerIds.forEach(item => {
      const payload = {
        CompanyOwnershipGroupId: this.state.SelectedCompanyId.value,
        CompanyOwnerId: item.value
      };

      this.props.submitOwnersGroupsRshipForm(payload);
    });
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
            <div className="col-md-4 col-md-offset-4">
              <div className="login-panel panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Assign Company Owner</h3>
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
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          placeholder="Company Owner"
                          name="SelectedOwnerIds"
                          isMulti
                          closeMenuOnSelect={false}
                          value={this.state.SelectedOwnerIds}
                          onChange={value =>
                            this.setState({
                              ...this.state,
                              SelectedOwnerIds: value
                            })
                          }
                          options={this.state.allCompanyOwners}
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
        </div>
      </div>
    );
  }
}

CompanyOwnersRship.propTypes = {
  submitOwnersGroupsRshipForm: PropTypes.func.isRequired,
  allRegisteredCompanies: PropTypes.arrayOf(PropTypes.object).isRequired,
  allCompanyOwners: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allRegisteredCompanies: state.admin_home.allRegisteredCompanies,
  allCompanyOwners: state.admin_home.allCompanyOwners
});

const mapDispatchToProps = dispatch => ({
  submitOwnersGroupsRshipForm: payload =>
    dispatch(submitOwnersGroupsRshipForm(payload))
});

export default connect(
    mapStateToProps,
  mapDispatchToProps
)(CompanyOwnersRship);

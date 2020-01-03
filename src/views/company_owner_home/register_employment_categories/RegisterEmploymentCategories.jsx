import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getACompanysEmploymentCategories,
  registerAnEmploymentCategory,
  resetCurrentEmploymentCategoryCreationFlag
} from "../../../store/modules/company_owner_home/actions";
import Table from "../../../components/table/table_body/Table";

class RegisterEmploymentCategories extends Component {
  state = {
    employmentCategory: "",
    tableData: [],
    tableHeaders: {
      columnOne: "#",
      columnTwo: "Employment Description"
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.isEmploymentCategorySuccessfullyRegistered !==
      prevProps.isEmploymentCategorySuccessfullyRegistered
    ) {
      if (this.props.isEmploymentCategorySuccessfullyRegistered) {
        const payload = {
          column_name: "CompanyId",
          search_value: this.props.CompanyId
        };
        this.props.getACompanysEmploymentCategories(payload);
        this.props.resetCurrentEmploymentCategoryCreationFlag();
      }
    }

    if (
      this.props.myCompanysEmploymentCategories !==
      prevProps.myCompanysEmploymentCategories
    ) {
      let employmentCategories;

      employmentCategories = this.props.myCompanysEmploymentCategories.map(
        (item, index) => {
          return {
            id: index + 1,
            CategoryDescription: item.CategoryDescription
          };
        }
      );

      this.setState({ tableData: employmentCategories });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const payload = {
      CompanyId: this.props.CompanyId,
      CategoryDescription: this.state.employmentCategory
    };

    this.props.registerAnEmploymentCategory(payload);
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
                  <h3 className="panel-title">Employment Categories</h3>
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
                          name="employmentCategory"
                          className="form-control"
                          placeholder="Employment Category"
                          value={this.state.employmentCategory}
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

            <div className="col-md-4">
              <Table
                tableTitle="Registered Employment Categories"
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

RegisterEmploymentCategories.propTypes = {
  registerAnEmploymentCategory: PropTypes.func.isRequired,
  CompanyId: PropTypes.string.isRequired,
  isEmploymentCategorySuccessfullyRegistered: PropTypes.bool.isRequired,
  getACompanysEmploymentCategories: PropTypes.func.isRequired,
  myCompanysEmploymentCategories: PropTypes.arrayOf(PropTypes.object)
    .isRequired,
  resetCurrentEmploymentCategoryCreationFlag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  CompanyId: state.company_owner_home.companyOwnersCompanyDetails.CompanyId,
  isEmploymentCategorySuccessfullyRegistered:
    state.company_owner_home.isEmploymentCategorySuccessfullyRegistered,
  myCompanysEmploymentCategories:
    state.company_owner_home.myCompanysEmploymentCategories
});

const mapDispatchToProps = dispatch => ({
  registerAnEmploymentCategory: payload =>
    dispatch(registerAnEmploymentCategory(payload)),
  getACompanysEmploymentCategories: payload =>
    dispatch(getACompanysEmploymentCategories(payload)),
  resetCurrentEmploymentCategoryCreationFlag: () =>
    dispatch(resetCurrentEmploymentCategoryCreationFlag())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterEmploymentCategories);

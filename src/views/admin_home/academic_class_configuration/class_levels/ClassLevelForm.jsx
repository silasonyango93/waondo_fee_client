import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import {
  createAcademicClassLevel,
  fetchAlllAcademicClassLevels,
  resetCurrentAcademicClassLevelCreated,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";
import { connect } from "react-redux";

class ClassLevelForm extends Component {
  state = {
    classLevelName: "",
    hierarchyCode: "",
    classLevelNameHassError: false,
    classLevelNameErrorMessage: "",
    hierarchyCodeHasError: false,
    hierarchyCodeErrorMessage: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isCurrentClassLevelCreated !==
      prevProps.isCurrentClassLevelCreated
    ) {
      if (this.props.isCurrentClassLevelCreated) {
        this.props.fetchAlllAcademicClassLevels();
        this.props.resetCurrentAcademicClassLevelCreated();
      }
    }
  }

  handleChange = event => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState({
      ...newState
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const payload = {
      AcademicClassLevelName: this.state.classLevelName,
      HierachyCode: this.state.hierarchyCode
    };

    this.props.createAcademicClassLevel(payload);
    this.props.toggleAdminModalDisplay(false);
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Class Levels</h3>
          </div>
          <div className="panel-body">
            <form
              action=""
              method="POST"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
            >
              <fieldset>
                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <input
                        name="classLevelName"
                        className={
                          this.state.classLevelNameHassError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Class Level Name"
                        value={this.state.classLevelName}
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.classLevelNameHassError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.classLevelNameErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                </Columns>

                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <input
                        name="hierarchyCode"
                        className={
                          this.state.hierarchyCodeHasError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Hierarchy Code"
                        value={this.state.hierarchyCode}
                        type="number"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.hierarchyCodeHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.hierarchyCodeErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                </Columns>

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
    );
  }
}

ClassLevelForm.propTypes = {
  createAcademicClassLevel: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  fetchAlllAcademicClassLevels: PropTypes.func.isRequired,
  isCurrentClassLevelCreated: PropTypes.bool.isRequired,
  resetCurrentAcademicClassLevelCreated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isCurrentClassLevelCreated: state.admin_home.isCurrentClassLevelCreated
});

const mapDispatchToProps = dispatch => ({
  createAcademicClassLevel: payload =>
    dispatch(createAcademicClassLevel(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
  fetchAlllAcademicClassLevels: () => dispatch(fetchAlllAcademicClassLevels()),
  resetCurrentAcademicClassLevelCreated: () =>
    dispatch(resetCurrentAcademicClassLevelCreated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassLevelForm);

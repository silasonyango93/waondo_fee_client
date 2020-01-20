import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";
import {
  createTermIterations,
  fetchAllTermIterations,
  resetCurrentTermIterationCreated,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class TermIterationForm extends Component {
  state = {
    iterationDescription: "",
    iterationDescriptionHassError: false,
    iterationDescriptionErrorMessage: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isCurrentTermIterationCreated !==
      prevProps.isCurrentTermIterationCreated
    ) {
      if (this.props.isCurrentTermIterationCreated) {
        this.props.fetchAllTermIterations();
        this.props.resetCurrentTermIterationCreated();
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
      TermIterationDescription: this.state.iterationDescription
    };

    this.props.createTermIterations(payload);
    this.props.toggleAdminModalDisplay(false);
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Term Iterations</h3>
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
                        name="iterationDescription"
                        className={
                          this.state.iterationDescriptionHassError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Term Iteration"
                        value={this.state.iterationDescription}
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.iterationDescriptionHassError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.iterationDescriptionErrorMessage}
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

TermIterationForm.propTypes = {
  createTermIterations: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  fetchAllTermIterations: PropTypes.func.isRequired,
  isCurrentTermIterationCreated: PropTypes.bool.isRequired,
  resetCurrentTermIterationCreated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isCurrentTermIterationCreated:
    state.admin_home.termIterations.isCurrentTermIterationCreated
});

const mapDispatchToProps = dispatch => ({
  createTermIterations: payload => dispatch(createTermIterations(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
  fetchAllTermIterations: () => dispatch(fetchAllTermIterations()),
  resetCurrentTermIterationCreated: () =>
    dispatch(resetCurrentTermIterationCreated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermIterationForm);

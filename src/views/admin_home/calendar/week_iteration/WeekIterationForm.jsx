import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";
import {
  createWeekIterations,
  fetchAllWeekIterations,
  resetCurrentWeekIterationCreated,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class WeekIterationForm extends Component {
  state = {
    iterationDescription: "",
    iterationDescriptionHassError: false,
    iterationDescriptionErrorMessage: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isCurrentWeekIterationCreated !==
      prevProps.isCurrentWeekIterationCreated
    ) {
      if (this.props.isCurrentWeekIterationCreated) {
        this.props.fetchAllWeekIterations();
        this.props.resetCurrentWeekIterationCreated();
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
      WeekIterationDescription: this.state.iterationDescription
    };

    this.props.createWeekIterations(payload);
    this.props.toggleAdminModalDisplay(false);
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Week Iterations</h3>
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
                        placeholder="Week Iteration"
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

WeekIterationForm.propTypes = {
  createWeekIterations: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  fetchAllWeekIterations: PropTypes.func.isRequired,
  isCurrentWeekIterationCreated: PropTypes.bool.isRequired,
  resetCurrentWeekIterationCreated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isCurrentWeekIterationCreated:
    state.admin_home.weekIterations.isCurrentWeekIterationCreated
});

const mapDispatchToProps = dispatch => ({
  createWeekIterations: payload => dispatch(createWeekIterations(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
  fetchAllWeekIterations: () => dispatch(fetchAllWeekIterations()),
  resetCurrentWeekIterationCreated: () =>
    dispatch(resetCurrentWeekIterationCreated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekIterationForm);

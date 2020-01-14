import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import {
  createClassStreams,
  fetchAllClassStreams,
  resetCurrentClassStreamCreated,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";
import { connect } from "react-redux";

class ClassStreamsForm extends Component {
  state = {
    classStreamName: "",
    classStreamNameHassError: false,
    classStreamNameErrorMessage: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isCurrentClassStreamCreated !==
      prevProps.isCurrentClassStreamCreated
    ) {
      if (this.props.isCurrentClassStreamCreated) {
        this.props.fetchAllClassStreams();
        this.props.resetCurrentClassStreamCreated();
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
      ClassStreamName: this.state.classStreamName
    };

    this.props.createClassStreams(payload);
    this.props.toggleAdminModalDisplay(false);
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Class Streams</h3>
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
                        name="classStreamName"
                        className={
                          this.state.classStreamNameHassError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Class Stream Name"
                        value={this.state.classStreamName}
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.classStreamNameHassError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.classStreamNameErrorMessage}
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

ClassStreamsForm.propTypes = {
  createClassStreams: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  fetchAllClassStreams: PropTypes.func.isRequired,
  isCurrentClassStreamCreated: PropTypes.bool.isRequired,
  resetCurrentClassStreamCreated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isCurrentClassStreamCreated:
    state.admin_home.classStreams.isCurrentClassStreamCreated
});

const mapDispatchToProps = dispatch => ({
  createClassStreams: payload => dispatch(createClassStreams(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
  fetchAllClassStreams: () => dispatch(fetchAllClassStreams()),
  resetCurrentClassStreamCreated: () =>
    dispatch(resetCurrentClassStreamCreated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassStreamsForm);

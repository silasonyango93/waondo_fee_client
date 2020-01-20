import React, { Component } from "react";
import { Columns, Container } from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import "./AdminHome.scss";
import {
  REGISTER_ACADEMIC_CLASS_LEVELS,
  REGISTER_CLASS_STREAMS,
  REGISTER_TERM_ITERATIONS
} from "./AdminHomeConstants";
import { DEBOUNCE, IDLE_TIMEOUT } from "../../config/constants/Constants";
import { terminateCurrentSession } from "../../store/modules/current_session/actions";
import TopBar from "../../components/topbar/TopBar";
import AcademicClassLevels from "./academic_class_configuration/class_levels/AcademicClassLevels";
import ClassStreams from "./academic_class_configuration/class_streams/ClassStreams";
import TermIteration from "./calendar/term_iteration/TermIteration";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAcademicClassLevels: true,
      displayClassStreams: false,
      displayTermIterations: false
    };
    this.idleTimer = null;
  }

  componentDidMount() {
    if (!this.props.isSessionActive) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    if (!this.props.isSessionActive) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    this.props.terminateCurrentSession();
  }

  handleSideBarClicked = formToDisplay => {
    if (formToDisplay === REGISTER_ACADEMIC_CLASS_LEVELS) {
      this.setState({
        displayAcademicClassLevels: true,
        displayClassStreams: false,
        displayTermIterations: false
      });
    } else if (formToDisplay === REGISTER_CLASS_STREAMS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: true,
        displayTermIterations: false
      });
    } else if (formToDisplay === REGISTER_TERM_ITERATIONS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: true
      });
    }
  };

  onIdle = e => {
    this.props.terminateCurrentSession();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onIdle={this.onIdle}
          debounce={DEBOUNCE}
          timeout={IDLE_TIMEOUT}
        />
        <TopBar />
        <Columns>
          <Columns.Column size="one-fifth">
            <AdminSideBar handleSideBarClicked={this.handleSideBarClicked} />
          </Columns.Column>

          <Container>
            <div
              className={
                this.state.displayAcademicClassLevels ? "show" : "hide"
              }
            >
              <AcademicClassLevels />
            </div>

            <div className={this.state.displayClassStreams ? "show" : "hide"}>
              <ClassStreams />
            </div>

            <div className={this.state.displayTermIterations ? "show" : "hide"}>
              <TermIteration />
            </div>
          </Container>
        </Columns>
      </div>
    );
  }
}

AdminHome.propTypes = {
  isSessionActive: PropTypes.bool.isRequired,
  terminateCurrentSession: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSessionActive: state.current_session.isSessionActive
});

const mapDispatchToProps = dispatch => ({
  terminateCurrentSession: () => dispatch(terminateCurrentSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHome);

import React, { Component } from "react";
import { Columns, Container } from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import "./AdminHome.scss";
import {
  REGISTER_ACADEMIC_CLASS_LEVELS, REGISTER_ACTUAL_CLASSES,
  REGISTER_ACTUAL_LOTS,
  REGISTER_ACTUAL_TERMS,
  REGISTER_ACTUAL_WEEKS,
  REGISTER_CLASS_STREAMS,
  REGISTER_LOT_DESCRIPTION, REGISTER_SYSTEM_USER,
  REGISTER_TERM_ITERATIONS,
  REGISTER_WEEK_ITERATIONS
} from "./AdminHomeConstants";
import { DEBOUNCE, IDLE_TIMEOUT } from "../../config/constants/Constants";
import { terminateCurrentSession } from "../../store/modules/current_session/actions";
import TopBar from "../../components/topbar/TopBar";
import AcademicClassLevels from "./academic_class_configuration/class_levels/AcademicClassLevels";
import ClassStreams from "./academic_class_configuration/class_streams/ClassStreams";
import TermIteration from "./calendar/term_iteration/TermIteration";
import WeekIteration from "./calendar/week_iteration/WeekIteration";
import ActualTerms from "./calendar/actual_terms/ActualTerms";
import ActualWeeks from "./calendar/actual_weeks/ActualWeeks";
import LotDescription from "./academic_class_configuration/lot_description/LotDescription";
import AdminDialog from "./admin_dialog/AdminDialog";
import ActualLots from "./academic_class_configuration/actual_lots/ActualLots";
import ActualClasses from "./academic_class_configuration/actual_classes/ActualClasses";
import UserRegistration from "./system_user_management/system_user_registration/UserRegistration";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAcademicClassLevels: true,
      displayClassStreams: false,
      displayTermIterations: false,
      displayWeekIterations: false,
      displayActualTerms: false,
      displayActualWeeks: false,
      displayLotDescriptions: false,
      displayActualLots: false,
      displayActualClasses: false,
      displayUserRegistration: false
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
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_CLASS_STREAMS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: true,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_TERM_ITERATIONS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: true,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_WEEK_ITERATIONS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: true,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_ACTUAL_TERMS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: true,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_ACTUAL_WEEKS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: true,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_LOT_DESCRIPTION) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: true,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_ACTUAL_LOTS) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: true,
        displayActualClasses: false,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_ACTUAL_CLASSES) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: true,
        displayUserRegistration: false
      });
    } else if (formToDisplay === REGISTER_SYSTEM_USER) {
      this.setState({
        displayAcademicClassLevels: false,
        displayClassStreams: false,
        displayTermIterations: false,
        displayWeekIterations: false,
        displayActualTerms: false,
        displayActualWeeks: false,
        displayLotDescriptions: false,
        displayActualLots: false,
        displayActualClasses: false,
        displayUserRegistration: true
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
        <AdminDialog />
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

            <div className={this.state.displayWeekIterations ? "show" : "hide"}>
              <WeekIteration />
            </div>

            <div className={this.state.displayActualTerms ? "show" : "hide"}>
              <ActualTerms />
            </div>

            <div className={this.state.displayActualWeeks ? "show" : "hide"}>
              <ActualWeeks />
            </div>

            <div
              className={this.state.displayLotDescriptions ? "show" : "hide"}
            >
              <LotDescription />
            </div>

            <div className={this.state.displayActualLots ? "show" : "hide"}>
              <ActualLots />
            </div>

            <div className={this.state.displayActualClasses ? "show" : "hide"}>
              <ActualClasses />
            </div>

            <div className={this.state.displayUserRegistration ? "show" : "hide"}>
              <UserRegistration />
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

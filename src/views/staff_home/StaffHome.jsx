import React, { Component } from "react";
import { Columns, Container } from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import { DEBOUNCE, IDLE_TIMEOUT } from "../../config/constants/Constants";
import { terminateCurrentSession } from "../../store/modules/current_session/actions";
import TopBar from "../../components/topbar/TopBar";
import {REGISTER_A_STUDENT_PAGE} from "./StaffHomeConstants";
import StudentsPage from "./student_management/students/StudentsPage";
import StaffSideBar from "../../components/sidebar/StaffSideBar";
import Modal from "react-awesome-modal";
import StudentRegistrationForm from "./student_management/students/StudentRegistrationForm";

class StaffHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayStudents: true,
            displayStudentRegistrationModal: false
        };
        this.idleTimer = null;
    }

    componentDidMount() {
        if (!this.props.isSessionActive) {
            window.location.assign("/");
        } else {
            window.addEventListener("beforeunload", this.handleTabClosed);
        }
    }

    componentDidUpdate() {
        if (!this.props.isSessionActive) {
            this.props.history.push("/");
        }
    }

    // componentWillUnmount() {
    //     const payload = {
    //         ColumnName: "SessionLogId",
    //         ColumnValue: this.props.sessionLogId
    //     };
    //     this.props.terminateCurrentSession(payload);
    // }

    handleTabClosed = (e) => {
        e.preventDefault();
        const payload = {
            ColumnName: "SessionLogId",
            ColumnValue: this.props.sessionLogId
        };
        this.props.terminateCurrentSession(payload);
    };

    handleSideBarClicked = formToDisplay => {
        if (formToDisplay === REGISTER_A_STUDENT_PAGE) {
            this.setState({
                displayStudentRegistrationModal: true
            });
        }
    };

    onIdle = e => {
        const payload = {
            ColumnName: "SessionLogId",
            ColumnValue: this.props.sessionLogId
        };
        this.props.terminateCurrentSession(payload);
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
                        <StaffSideBar handleSideBarClicked={this.handleSideBarClicked} />
                    </Columns.Column>

                    <Container>

                        {(<StudentsPage />) && this.state.displayStudents}

                    </Container>
                </Columns>
                <Modal
                    visible={this.state.displayStudentRegistrationModal}
                    width="500"
                    height="450"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.props.toggleAdminModalDisplay(false);
                    }}
                >

                    <StudentRegistrationForm />
                </Modal>
            </div>
        );
    }
}

StaffHome.propTypes = {
    isSessionActive: PropTypes.bool.isRequired,
    terminateCurrentSession: PropTypes.func.isRequired,
    sessionLogId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    isSessionActive: state.current_session.isSessionActive,
    sessionLogId: state.current_session.sessionDetails.sessionLogsEntity.sessionLogId
});

const mapDispatchToProps = dispatch => ({
    terminateCurrentSession: payload => dispatch(terminateCurrentSession(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffHome);

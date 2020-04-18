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

class StaffHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayStudents: true
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
        if (formToDisplay === REGISTER_A_STUDENT_PAGE) {
            this.setState({
                displayStudents: true
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
                        <StaffSideBar handleSideBarClicked={this.handleSideBarClicked} />
                    </Columns.Column>

                    <Container>

                        {(<StudentsPage />) && this.state.displayStudents}

                    </Container>
                </Columns>
            </div>
        );
    }
}

StaffHome.propTypes = {
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
)(StaffHome);

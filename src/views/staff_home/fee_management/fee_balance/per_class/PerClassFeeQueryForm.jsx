import React, {Component} from "react";
import PropTypes from "prop-types";
import {Columns} from "react-bulma-components/dist";
import {connect} from "react-redux";
import {
    getAllStudentsWithAMinimumTermBalance,
    getPerClassStudentsWithAMinimumTermBalance
} from "../../../../../store/modules/staff_home/actions";
import {fetchAllActualClasses} from "../../../../../store/modules/admin_home/actions";
import Select from "react-select";

class PerClassFeeQueryForm extends Component {
    state = {
        minimumFeeBalance: "",
        minimumFeeBalanceHassError: false,
        minimumFeeBalanceErrorMessage: "",
        selectedClassObject: "",
        classesOptions: [],
        selectedClassHasError: false,
        selectedClassErrorMessage: ""
    };

    componentDidMount() {
        this.props.fetchAllActualClasses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allActualClasses !== prevProps.allActualClasses) {
            if (this.props.allActualClasses && this.props.allActualClasses.length) {
                let allActualClasses = this.props.allActualClasses.map(
                    (item, index) => {
                        return {
                            label: item.AcademicClassLevelName + " " + item.ClassStreamName,
                            value: item.ClassId
                        };
                    }
                );

                this.setState({classesOptions: allActualClasses});
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

        if (!this.state.selectedClassObject) {
            this.setState({
                selectedClassHasError: true,
                selectedClassErrorMessage: "This field is required"
            });
        } else {
            const payload = {
                classId: this.state.selectedClassObject.value,
                minimumFeeBalance: this.state.minimumFeeBalance
            };

            this.props.getPerClassStudentsWithAMinimumTermBalance(payload);
            this.props.closePerClassFeeQueryModal(
                this.state.selectedClassObject.label,
                this.state.minimumFeeBalance
            );
        }
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Send Students Home</h3>
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
                                            <Select
                                                className={
                                                    this.state.selectedClassHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Class"
                                                name="selectedClassObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedClassObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedClassObject: value,
                                                        selectedClassHasError: false,
                                                        selectedClassErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.classesOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedClassHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedClassErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="minimumFeeBalance"
                                                className={
                                                    this.state.minimumFeeBalanceHassError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Minimum Fee Balance"
                                                value={this.state.minimumFeeBalance}
                                                type="number"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.minimumFeeBalanceHassError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.minimumFeeBalanceErrorMessage}
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

PerClassFeeQueryForm.propTypes = {
    getPerClassStudentsWithAMinimumTermBalance: PropTypes.func.isRequired,
    closePerClassFeeQueryModal: PropTypes.func.isRequired,
    fetchAllActualClasses: PropTypes.func.isRequired,
    allActualClasses: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allActualClasses: state.admin_home.actualClasses.allActualClasses
});

const mapDispatchToProps = dispatch => ({
    getPerClassStudentsWithAMinimumTermBalance: payload =>
        dispatch(getPerClassStudentsWithAMinimumTermBalance(payload)),
    fetchAllActualClasses: () => dispatch(fetchAllActualClasses())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PerClassFeeQueryForm);

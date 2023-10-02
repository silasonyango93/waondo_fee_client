import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Columns} from "react-bulma-components";
import Select from "react-select";
import {getPerClassStudentsWithAMinimumTermBalance} from "../../../../../../store/modules/staff_home/actions";
import {
    fetchAllLotsNotCompletedSchool
} from "../../../../../../store/modules/admin_home/actions";
import {connect} from "react-redux";

class PerLotFeeQueryForm extends Component {

    state = {
        minimumFeeBalance: "",
        minimumFeeBalanceHassError: false,
        minimumFeeBalanceErrorMessage: "",
        selectedLotObject: "",
        lotsOptions: [],
        selectedClassHasError: false,
        selectedLotErrorMessage: ""
    };

    componentDidMount() {
        this.props.fetchAllLotsNotCompletedSchool();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allActualLots !== prevProps.allActualLots) {
            if (this.props.allActualLots && this.props.allActualLots.length) {
                let allActualLots = this.props.allActualLots.map(
                    (item, index) => {
                        return {
                            label: item.AcademicClassLevelName + " " + item.ClassStreamName,
                            value: item.ClassId
                        };
                    }
                );

                this.setState({lotsOptions: allActualLots});
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

        if (!this.state.selectedLotObject) {
            this.setState({
                selectedLotHasError: true,
                selectedLotErrorMessage: "This field is required"
            });
        } else {
            const payload = {
                classId: this.state.selectedLotObject.value,
                minimumFeeBalance: this.state.minimumFeeBalance
            };

            this.props.getPerClassStudentsWithAMinimumTermBalance(payload);
            this.props.closePerLotFeeQueryModal(
                this.state.selectedLotObject.label,
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
                                                    this.state.selectedLotHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Class"
                                                name="selectedLotObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedLotObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedLotObject: value,
                                                        selectedLotHasError: false,
                                                        selectedLotErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.lotsOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedLotHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedLotErrorMessage}
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

PerLotFeeQueryForm.propTypes = {
    getPerClassStudentsWithAMinimumTermBalance: PropTypes.func.isRequired,
    closePerLotFeeQueryModal: PropTypes.func.isRequired,
    fetchAllLotsNotCompletedSchool: PropTypes.func.isRequired,
    allActualLots: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allActualLots: state.admin_home.actualLots.allActualLots
});

const mapDispatchToProps = dispatch => ({
    getPerClassStudentsWithAMinimumTermBalance: payload =>
        dispatch(getPerClassStudentsWithAMinimumTermBalance(payload)),
    fetchAllLotsNotCompletedSchool: () => dispatch(fetchAllLotsNotCompletedSchool())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PerLotFeeQueryForm);

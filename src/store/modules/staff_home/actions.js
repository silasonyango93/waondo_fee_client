import {
  transactionsServiceGet,
  transactionsServicePost
} from "../../../services/transactions_service_connector/TransactionsServiceConnector";
import {
  ERROR_OCCURRED_WHILE_PAYING_FEE,
  ERROR_WHILE_REGISTERING_STUDENT,
  FEE_PAYMENT_FAILED,
  FEE_PAYMENT_SUCCESSFUL,
  STUDENT_REGISTRATION_FAILED,
  STUDENT_REGISTRATION_SUCCESSFUL,
  STUDENTS_FETCHED_EMPTY_RESULT_SET,
  STUDENTS_FETCHED_SUCCESSFULLY,
  ERROR_OCCURRED_WHILE_FETCHING_STUDENTS,
  ASSERT_CURRENT_FEE_STATEMENT,
  STUDENT_FEE_STATEMENT_FETCHED_SUCCESSFULLY,
  STUDENT_FEE_STATEMENT_FETCHED_EMPTY_RESULT_SET,
  ERROR_OCCURRED_WHILE_FETCHING_STUDENT_FEE_STATEMENT,
  SCHOOL_FETCH_MINIMUM_FEE_BALANCE_SUCCESSFUL,
  SCHOOL_FETCH_MINIMUM_FEE_BALANCE_EMPTY_RESULT_SET,
  ERROR_OCCURRED_WHILE_FETCHING_SCHOOL_MINIMUM_FEE_BALANCE,
  STUDENT_BASIC_DETAILS_UPDATED_SUCCESSFULLY,
  STUDENT_BASIC_DETAILS_UPDATE_FAILED,
  ERROR_OCCURRED_WHILE_UPDATING_STUDENT_BASIC_DETAILS, RESET_STUDENT_REGISTRATION
} from "./actionTypes";

export function registerAStudent(payload) {
  return async dispatch => {
    const apiRoute = "/students/create_student";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.successStatus) {
          dispatch({
            type: STUDENT_REGISTRATION_SUCCESSFUL,
            payload: {
              studentRegistrationEventMessage: result.data.responseMessage
            }
          });
        } else {
          dispatch({
            type: STUDENT_REGISTRATION_FAILED,
            payload: {
              studentRegistrationEventMessage: result.data.responseMessage
            }
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_WHILE_REGISTERING_STUDENT
        });
        console.log(err);
      }
    );
  };
}

export function resetSuccessfulStudentRegistration() {
  return async dispatch => {
    dispatch({
      type: RESET_STUDENT_REGISTRATION
    });
  };
}

export function payFee(payload) {
  return async dispatch => {
    const apiRoute = "/installments/add_installment";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        console.log(result);
        if (result.data.feeStatementProcessedSuccessfully) {
          dispatch({
            type: FEE_PAYMENT_SUCCESSFUL,
            payload: {
              currentStudentFeeStatement: result.data
            }
          });
        } else {
          dispatch({
            type: FEE_PAYMENT_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_PAYING_FEE
        });
        console.log(err);
      }
    );
  };
}

export function fetchAllStudents(payload) {
  return async dispatch => {
    const apiRoute = "/students/fetch_all_students";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data && result.data.length) {
          dispatch({
            type: STUDENTS_FETCHED_SUCCESSFULLY,
            payload: {
              studentsList: result.data
            }
          });
        } else if (result.data && !result.data.length) {
          dispatch({
            type: STUDENTS_FETCHED_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_FETCHING_STUDENTS
        });
        console.log(err);
      }
    );
  };
}

export function fetchAStudentFeeStatement(payload) {
  return async dispatch => {
    const apiRoute = "/students/get_a_student_fee_statement";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data) {
          dispatch({
            type: STUDENT_FEE_STATEMENT_FETCHED_SUCCESSFULLY,
            payload: {
              currentStudentFeeStatement: result.data
            }
          });
        } else if (!result.data) {
          dispatch({
            type: STUDENT_FEE_STATEMENT_FETCHED_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_FETCHING_STUDENT_FEE_STATEMENT
        });
        console.log(err);
      }
    );
  };
}

export function getAllStudentsWithAMinimumTermBalance(payload) {
  return async dispatch => {
    const apiRoute = "/statements/get_all_students_with_minimum_term_balance";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data) {
          dispatch({
            type: SCHOOL_FETCH_MINIMUM_FEE_BALANCE_SUCCESSFUL,
            payload: {
              feeBalanceList: result.data
            }
          });
        } else if (!result.data) {
          dispatch({
            type: SCHOOL_FETCH_MINIMUM_FEE_BALANCE_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_FETCHING_SCHOOL_MINIMUM_FEE_BALANCE
        });
        console.log(err);
      }
    );
  };
}

export function getPerClassStudentsWithAMinimumTermBalance(payload) {
  return async dispatch => {
    const apiRoute =
      "/statements/get_all_students_in_a_class_with_minimum_term_balance";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data) {
          dispatch({
            type: SCHOOL_FETCH_MINIMUM_FEE_BALANCE_SUCCESSFUL,
            payload: {
              feeBalanceList: result.data
            }
          });
        } else if (!result.data) {
          dispatch({
            type: SCHOOL_FETCH_MINIMUM_FEE_BALANCE_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_FETCHING_SCHOOL_MINIMUM_FEE_BALANCE
        });
        console.log(err);
      }
    );
  };
}

export function updateAStudentBasicDetails(payload) {
  return async dispatch => {
    const apiRoute = "/students/update_a_student_personal_details";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data) {
          dispatch({
            type: STUDENT_BASIC_DETAILS_UPDATED_SUCCESSFULLY,
            payload: {
              feeBalanceList: result.data
            }
          });
        } else if (!result.data) {
          dispatch({
            type: STUDENT_BASIC_DETAILS_UPDATE_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_UPDATING_STUDENT_BASIC_DETAILS
        });
        console.log(err);
      }
    );
  };
}

import {transactionsServicePost} from "../../../services/transactions_service_connector/TransactionsServiceConnector";
import {
    ERROR_OCCURRED_WHILE_PAYING_FEE,
    ERROR_WHILE_REGISTERING_STUDENT, FEE_PAYMENT_FAILED, FEE_PAYMENT_SUCCESSFUL,
    STUDENT_REGISTRATION_FAILED,
    STUDENT_REGISTRATION_SUCCESSFUL
} from "./actionTypes";


export function registerAStudent(payload) {
    return async dispatch => {
        const apiRoute = "/students/create_student";
        const returnedPromise = transactionsServicePost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.successStatus) {
                    dispatch({
                        type: STUDENT_REGISTRATION_SUCCESSFUL
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


export function payFee(payload) {
    return async dispatch => {
        const apiRoute = "/installments/add_installment";
        const returnedPromise = transactionsServicePost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.successStatus) {
                    dispatch({
                        type: FEE_PAYMENT_SUCCESSFUL
                    });

                } else {
                    dispatch({
                        type: FEE_PAYMENT_FAILED,
                        payload: {
                            studentRegistrationEventMessage: result.data.responseMessage
                        }
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

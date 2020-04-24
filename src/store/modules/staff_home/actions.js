import {transactionsServicePost} from "../../../services/transactions_service_connector/TransactionsServiceConnector";
import {
    ERROR_WHILE_REGISTERING_STUDENT,
    STUDENT_REGISTRATION_FAILED,
    STUDENT_REGISTRATION_SUCCESSFUL
} from "./actionTypes";


export function registerAUser(payload) {
    return async dispatch => {
        const apiRoute = "/users/create_student";
        const returnedPromise = transactionsServicePost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.userSuccessfullyCreated) {
                    dispatch({
                        type: STUDENT_REGISTRATION_SUCCESSFUL
                    });

                } else {
                    dispatch({
                        type: STUDENT_REGISTRATION_FAILED
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

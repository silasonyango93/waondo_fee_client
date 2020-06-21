import {
    ERROR_WHILE_REGISTERING_STUDENT,
    FEE_PAYMENT_SUCCESSFUL, STUDENT_FEE_STATEMENT_FETCHED_SUCCESSFULLY,
    STUDENT_REGISTRATION_FAILED,
    STUDENTS_FETCHED_SUCCESSFULLY,
    SCHOOL_FETCH_MINIMUM_FEE_BALANCE_SUCCESSFUL
} from "./actionTypes";


export const ACTION_HANDLERS = {
    [ERROR_WHILE_REGISTERING_STUDENT]: (state, action) =>
        Object.assign({}, state, {
            studentRegistration: { studentRegistrationEventMessage: action.payload.studentRegistrationEventMessage,
                                    isStudentSuccessfullyRegistered: false}
        }),
    [STUDENT_REGISTRATION_FAILED]: (state, action) =>
        Object.assign({}, state, {
            studentRegistration: { studentRegistrationEventMessage: action.payload.studentRegistrationEventMessage,
                isStudentSuccessfullyRegistered: false}
        }),

    [FEE_PAYMENT_SUCCESSFUL]: (state, action) =>
        Object.assign({}, state, {
            feeManagement: { currentStudentFeeStatement: action.payload.currentStudentFeeStatement}
        }),

    [STUDENTS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            students: { studentsList: action.payload.studentsList}
        }),
    [STUDENT_FEE_STATEMENT_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            feeManagement: { currentStudentFeeStatement: action.payload.currentStudentFeeStatement}
        }),
    [SCHOOL_FETCH_MINIMUM_FEE_BALANCE_SUCCESSFUL]: (state, action) =>
        Object.assign({}, state, {
            feeBalances: { feeBalanceList: action.payload.feeBalanceList}
        })
};

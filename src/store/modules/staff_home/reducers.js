import {
    ERROR_WHILE_REGISTERING_STUDENT,
    FEE_PAYMENT_SUCCESSFUL,
    STUDENT_REGISTRATION_FAILED,
    STUDENTS_FETCHED_SUCCESSFULLY
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
        })
};

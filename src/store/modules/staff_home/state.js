export const initialState = {
    studentRegistration: {
        studentRegistrationEventMessage: '',
        isStudentSuccessfullyRegistered: false
    },

    feeManagement: {
        currentStudentFeeStatement: {}
    },

    students: {
        studentsList: []
    },

    feeBalances: {
        feeBalanceList: [],
        sendStudentsHomePerActualClassQueryPayload: {}
    }
};

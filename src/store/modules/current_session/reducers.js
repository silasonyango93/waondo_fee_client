import {
    TERMINATE_CURRENT_SESSION,
    STORE_USER,
    SYSTEM_NOT_CONFIGURED,
    INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL,
    WRONG_LOGIN_CREDENTIALS,
    RESET_WRONG_CREDENTIALS,
    ROLE_ACCESS_DENIED,
    SUCCESSFULLY_FETCHED_ALL_USERS, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, RESET_FAILED_LOGIN
} from "./actionTypes";

export const ACTION_HANDLERS = {
  [USER_LOGIN_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      isLoginSuccessful: true,
        sessionDetails: action.payload.userDetails,
      RoleType: action.payload.RoleType,
      isSessionActive: action.payload.isSessionActive
    }),

    [USER_LOGIN_FAILED]: (state, action) =>
        Object.assign({}, state, {
            authenticationEventMessage: action.payload.authenticationEventMessage
    }),
  [TERMINATE_CURRENT_SESSION]: state =>
    Object.assign({}, state, {
      isSessionActive: false,
      isLoginSuccessful: false
    }),
    [WRONG_LOGIN_CREDENTIALS]: state =>
        Object.assign({}, state, {
            hasWrongLoginCredentials: true
        }),
    [ROLE_ACCESS_DENIED]: state =>
        Object.assign({}, state, {
            accessDenied: true
        }),
    [RESET_FAILED_LOGIN]: state =>
        Object.assign({}, state, {
            authenticationEventMessage: ""
        }),
  [SYSTEM_NOT_CONFIGURED]: (state, action) =>
    Object.assign({}, state, {
      isCompanyAlreadyConfigured: action.payload.isCompanyAlreadyConfigured,
      initialConfigurations: {
        isSystemOwnershipGroupConfigured: false,
        isSystemCompanyConfigured: false,
        isInitialEmploymentCategoryConfigured: false,
        isMaleGenderConfigured: false,
        isFemaleGenderConfigured: false,
        isInitialGenderConfigured: false
      }
    }),

    [INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL]: state =>
        Object.assign({}, state, {
            isCompanyAlreadyConfigured: true
        }),
    [SUCCESSFULLY_FETCHED_ALL_USERS]: (state, action) =>
        Object.assign({}, state, {
            allUsers: action.payload.allUsers
        })
};

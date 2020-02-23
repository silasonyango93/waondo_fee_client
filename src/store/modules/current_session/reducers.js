import {
    TERMINATE_CURRENT_SESSION,
    STORE_USER,
    SYSTEM_NOT_CONFIGURED,
    INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL, WRONG_LOGIN_CREDENTIALS, RESET_WRONG_CREDENTIALS, ROLE_ACCESS_DENIED
} from "./actionTypes";

export const ACTION_HANDLERS = {
  [STORE_USER]: (state, action) =>
    Object.assign({}, state, {
      isLoginSuccessful: true,
      session_details: action.payload.session_details,
      RoleType: action.payload.RoleType,
      isSessionActive: action.payload.isSessionActive
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
    [RESET_WRONG_CREDENTIALS]: state =>
        Object.assign({}, state, {
            hasWrongLoginCredentials: false,
            accessDenied: false
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
        })
};

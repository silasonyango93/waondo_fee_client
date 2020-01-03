import {
    TERMINATE_CURRENT_SESSION,
    STORE_USER,
    SYSTEM_NOT_CONFIGURED,
    INITIAL_SYSTEM_OWNERSHIP_GROUP_CONFIGURATION_SUCCESSFUL,
    INITIAL_SYSTEM_COMPANY_CONFIGURATION_SUCCESSFUL,
    INITIAL_EMPLOYMENT_CATEGORIES_CONFIGURATION_SUCCESSFUL,
    MALE_GENDER_CONFIGURATION_SUCCESSFUL,
    FEMALE_GENDER_CONFIGURATION_SUCCESSFUL, INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL
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
  [INITIAL_SYSTEM_OWNERSHIP_GROUP_CONFIGURATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      initialConfigurations: {
        isSystemOwnershipGroupConfigured: true,
        isSystemCompanyConfigured: false,
        isInitialEmploymentCategoryConfigured: false,
        isMaleGenderConfigured: false,
        isFemaleGenderConfigured: false,
        isInitialGenderConfigured: false
      }
    }),
  [INITIAL_SYSTEM_COMPANY_CONFIGURATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      initialConfigurations: {
        isSystemOwnershipGroupConfigured: true,
        isSystemCompanyConfigured: true,
        isInitialEmploymentCategoryConfigured: false,
        isMaleGenderConfigured: false,
        isFemaleGenderConfigured: false,
        isInitialGenderConfigured: false
      }
    }),
  [INITIAL_EMPLOYMENT_CATEGORIES_CONFIGURATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      initialConfigurations: {
        isSystemOwnershipGroupConfigured: true,
        isSystemCompanyConfigured: true,
        isInitialEmploymentCategoryConfigured: true,
        isMaleGenderConfigured: false,
        isFemaleGenderConfigured: false,
        isInitialGenderConfigured: false
      }
    }),
  [MALE_GENDER_CONFIGURATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      initialConfigurations: {
        isSystemOwnershipGroupConfigured: true,
        isSystemCompanyConfigured: true,
        isInitialEmploymentCategoryConfigured: true,
        isMaleGenderConfigured: true,
        isFemaleGenderConfigured: false,
        isInitialGenderConfigured: false
      }
    }),
  [FEMALE_GENDER_CONFIGURATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      initialConfigurations: {
        isSystemOwnershipGroupConfigured: true,
        isSystemCompanyConfigured: true,
        isInitialEmploymentCategoryConfigured: true,
        isMaleGenderConfigured: true,
        isFemaleGenderConfigured: true,
        isInitialGenderConfigured: true
      }
    }),
    [INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL]: state =>
        Object.assign({}, state, {
            isCompanyAlreadyConfigured: true
        })
};

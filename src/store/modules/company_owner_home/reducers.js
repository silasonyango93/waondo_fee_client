import {
  COMPANY_BRANCH_CREATED_SUCCESSFULLY,
  EMPLOYMENT_CATEGORIES_REGISTRATION_SUCCESSFUL,
  FETCHING_COMPANY_OWNERS_COMPANY_DETAILS_SUCCEEDED,
  FETCHING_THE_COMPANYS_BRANCHES_SUCCEEDED,
  FETCHING_THE_COMPANYS_EMPLOYMENT_CATEGORIES_SUCCEEDED,
  FETCHING_THE_COMPANYS_SYSTEM_USERS_SUCCEEDED,
  RESET_CURRENT_BRANCH_CREATED_SUCCESSFULLY,
  RESET_CURRENT_SYSTEM_USER_CREATED_SUCCESSFULLY,
  RESET_EMPLOYMENT_CATEGORY_CREATION_FLAG,
  SYSTEM_USER_REGISTRATION_SUCCESSFUL
} from "./actionTypes";

export const ACTION_HANDLERS = {
  [FETCHING_COMPANY_OWNERS_COMPANY_DETAILS_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      companyOwnersCompanyDetails: action.payload.companyOwnersCompanyDetails
    }),
  [FETCHING_THE_COMPANYS_BRANCHES_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      myCompanyBranches: action.payload.myCompanyBranches
    }),

  [COMPANY_BRANCH_CREATED_SUCCESSFULLY]: state =>
    Object.assign({}, state, {
      isCurrentBranchCreatedSuccessfully: true
    }),

  [RESET_CURRENT_BRANCH_CREATED_SUCCESSFULLY]: state =>
    Object.assign({}, state, {
      isCurrentBranchCreatedSuccessfully: false
    }),

  [SYSTEM_USER_REGISTRATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      isCurrentSystemUserCreatedSuccessfully: true
    }),

  [FETCHING_THE_COMPANYS_SYSTEM_USERS_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      myCompanySystemUsers: action.payload.myCompanySystemUsers
    }),

  [RESET_CURRENT_SYSTEM_USER_CREATED_SUCCESSFULLY]: state =>
    Object.assign({}, state, {
      isCurrentSystemUserCreatedSuccessfully: false
    }),

  [EMPLOYMENT_CATEGORIES_REGISTRATION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      isEmploymentCategorySuccessfullyRegistered: true
    }),
  [FETCHING_THE_COMPANYS_EMPLOYMENT_CATEGORIES_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      myCompanysEmploymentCategories:
        action.payload.myCompanysEmploymentCategories
    }),

  [RESET_EMPLOYMENT_CATEGORY_CREATION_FLAG]: state =>
    Object.assign({}, state, {
      isEmploymentCategorySuccessfullyRegistered: false
    })
};

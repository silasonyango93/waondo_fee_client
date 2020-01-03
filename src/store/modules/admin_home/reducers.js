import {
  COMPANY_OWNER_REGISTRATION_SUCCESSFUL,
  COMPANY_REGISTRATION_FORM_SUBMISSION_SUCCESSFUL,
  FETCHING_COMPANY_OWNERS_SUCCEEDED,
  FETCHING_REGISTERED_COMPANIES_SUCCEEDED,
  FETCHING_REGISTERED_COMPANY_CLIENTS_SUCCEEDED,
  RESET_COMPANY_OWNER_REGISTRATION,
  RESET_REGISTERED_COMPANY_CLIENTS_FLAG,
  SUBMIT_COMPANY_REGISTRATION_FORM
} from "./actionTypes";

export const ACTION_HANDLERS = {
  [SUBMIT_COMPANY_REGISTRATION_FORM]: (state, action) =>
    Object.assign({}, state, {
      isDataSubmissionSuccessful: true,
      data: action.payload.results
    }),
  [FETCHING_REGISTERED_COMPANIES_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      allRegisteredCompanies: action.payload.allRegisteredCompanies
    }),
  [COMPANY_OWNER_REGISTRATION_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      isCompanyOwnerSuccessfullyRegistered: true,
      currentCompanyOwnerDbRecordId: action.payload.recordId
    }),

  [RESET_COMPANY_OWNER_REGISTRATION]: state =>
    Object.assign({}, state, {
      isCompanyOwnerSuccessfullyRegistered: false
    }),
  [FETCHING_COMPANY_OWNERS_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      allCompanyOwners: action.payload.allCompanyOwners
    }),

  [COMPANY_REGISTRATION_FORM_SUBMISSION_SUCCESSFUL]: state =>
    Object.assign({}, state, {
      isCurrentCompanySuccessfullyRegistered: true
    }),

  [FETCHING_REGISTERED_COMPANY_CLIENTS_SUCCEEDED]: (state, action) =>
    Object.assign({}, state, {
      allRegisteredCompanyClients: action.payload.allRegisteredCompanyClients
    }),
  [RESET_REGISTERED_COMPANY_CLIENTS_FLAG]: state =>
    Object.assign({}, state, {
      isCurrentCompanySuccessfullyRegistered: false
    })
};

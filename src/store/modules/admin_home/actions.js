import {
  apiGetAll,
  apiPost
} from "../../../services/api_connector/ApiConnector";
import {
  COMPANY_OWNER_REGISTRATION_FAILED,
  COMPANY_OWNER_REGISTRATION_SUCCESSFUL,
  COMPANY_REGISTRATION_FORM_SUBMISSION_FAILED,
  COMPANY_REGISTRATION_FORM_SUBMISSION_SUCCESSFUL,
  FETCHING_COMPANY_OWNERS_EMPTY_RESULT_SET,
  FETCHING_COMPANY_OWNERS_FAILED,
  FETCHING_COMPANY_OWNERS_SUCCEEDED,
  FETCHING_REGISTERED_COMPANIES_EMPTY_RESULT_SET,
  FETCHING_REGISTERED_COMPANIES_FAILED,
  FETCHING_REGISTERED_COMPANIES_SUCCEEDED,
  FETCHING_REGISTERED_COMPANY_CLIENTS_EMPTY_RESULT_SET,
  FETCHING_REGISTERED_COMPANY_CLIENTS_FAILED,
  FETCHING_REGISTERED_COMPANY_CLIENTS_SUCCEEDED,
  OWNERSHIP_GROUP_CREATED,
  OWNERSHIP_GROUP_CREATION_FAILED,
  RESET_COMPANY_OWNER_REGISTRATION,
  RESET_REGISTERED_COMPANY_CLIENTS_FLAG,
  START_COMPANY_OWNER_REGISTRATION,
  START_COMPANY_REGISTRATION_FORM_SUBMISSION,
  START_FETCHING_COMPANY_OWNERS,
  START_FETCHING_REGISTERED_COMPANIES,
  START_FETCHING_REGISTERED_COMPANY_CLIENTS,
  START_OWNERSHIP_GROUP_CREATION,
  START_SUBMITING_OWNERS_GROUPS_RSHIP_FORM,
  SUBMITING_OWNERS_GROUPS_RSHIP_FORM_FAILED,
  SUBMITING_OWNERS_GROUPS_RSHIP_FORM_SUCCEEDED
} from "./actionTypes";
import { STORE_USER } from "../current_session/actionTypes";

export function createOwnershipGroup(payload) {
  return async dispatch => {
    dispatch({
      type: START_OWNERSHIP_GROUP_CREATION
    });
    const apiRoute = "/add_company_ownership_groups";
    const data = { OwnershipGroupName: payload.CompanyName };
    const returnedPromise = apiPost(data, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: OWNERSHIP_GROUP_CREATED
          });

          const formData = {
            CompanyOwnershipGroupId: result.data.results.recordId,
            CompanyName: payload.CompanyName
          };

          submitCompanyRegistrationForm(formData, dispatch);
        } else {
          dispatch({
            type: OWNERSHIP_GROUP_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: OWNERSHIP_GROUP_CREATION_FAILED
        });
        console.log(err);
      }
    );
  };
}

export function submitCompanyRegistrationForm(payload, dispatch) {
  dispatch({
    type: START_COMPANY_REGISTRATION_FORM_SUBMISSION
  });
  const apiRoute = "/add_companies";
  const returnedPromise = apiPost(payload, apiRoute);
  returnedPromise.then(
    function(result) {
      if (result.data.results.success) {
        dispatch({
          type: COMPANY_REGISTRATION_FORM_SUBMISSION_SUCCESSFUL
        });
      }
    },
    function(err) {
      dispatch({
        type: COMPANY_REGISTRATION_FORM_SUBMISSION_FAILED
      });
      console.log(err);
    }
  );
}

export function registerCompanyOwner(payload) {
  return async dispatch => {
    dispatch({
      type: START_COMPANY_OWNER_REGISTRATION
    });
    const apiRoute = "/company_owner_registration";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: COMPANY_OWNER_REGISTRATION_SUCCESSFUL,
            payload: {
              recordId: result.data.results.recordId
            }
          });
        } else {
          dispatch({
            type: COMPANY_OWNER_REGISTRATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: COMPANY_OWNER_REGISTRATION_FAILED
        });
        console.log(err);
      }
    );
  };
}

export function getAllCompanies() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_REGISTERED_COMPANIES
    });
    const apiRoute = "/get_all_company_ownership_groups";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_REGISTERED_COMPANIES_SUCCEEDED,
            payload: {
              allRegisteredCompanies: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_REGISTERED_COMPANIES_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: FETCHING_REGISTERED_COMPANIES_FAILED
        });
        console.log(err);
      }
    );
  };
}

export function getAllCompanyOwners() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_COMPANY_OWNERS
    });
    const apiRoute = "/get_all_company_owners_and_their_details";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_COMPANY_OWNERS_SUCCEEDED,
            payload: {
              allCompanyOwners: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_COMPANY_OWNERS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: FETCHING_COMPANY_OWNERS_FAILED
        });
        console.log(err);
      }
    );
  };
}

export function submitOwnersGroupsRshipForm(payload) {
  return async dispatch => {
    dispatch({
      type: START_SUBMITING_OWNERS_GROUPS_RSHIP_FORM
    });
    const apiRoute = "/add_ownership_groups_company_owners_rship";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: SUBMITING_OWNERS_GROUPS_RSHIP_FORM_SUCCEEDED
          });
        } else {
          dispatch({
            type: SUBMITING_OWNERS_GROUPS_RSHIP_FORM_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: SUBMITING_OWNERS_GROUPS_RSHIP_FORM_FAILED
        });
        console.log(err);
      }
    );
  };
}

export function resetCurrentCompanyOwnerRegistration() {
  return async dispatch => {
    dispatch({
      type: RESET_COMPANY_OWNER_REGISTRATION
    });
  };
}

export function getAllRegisteredCompanyClients() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_REGISTERED_COMPANY_CLIENTS
    });
    const apiRoute = "/get_all_companies";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_REGISTERED_COMPANY_CLIENTS_SUCCEEDED,
            payload: {
              allRegisteredCompanyClients: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_REGISTERED_COMPANY_CLIENTS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: FETCHING_REGISTERED_COMPANY_CLIENTS_FAILED
        });
        console.log(err);
      }
    );
  };
}

export function resetRegisteredCompanyClientsFlag() {
  return async dispatch => {
    dispatch({
      type: RESET_REGISTERED_COMPANY_CLIENTS_FLAG
    });
  };
}

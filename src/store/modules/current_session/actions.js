import {
  STORE_USER,
  BEGIN_USER_AUTHENTIFICATION,
  USER_LOGIN_SUCCESS,
  TERMINATE_CURRENT_SESSION,
  BEGIN_COMPANY_OWNER_AUTHENTICATION,
  COMPANY_OWNER_AUTHENTICATION_SUCCESSFUL,
  WRONG_LOGIN_CREDENTIALS,
  AN_ERROR_OCCURED_DURING_LOGIN,
  START_CHECKING_IF_SYSTEM_ALREADY_CONFIGURED,
  SYSTEM_NOT_CONFIGURED,
  SYSTEM_ALREADY_CONFIGURED,
  ERROR_OCCURED_DURING_SYSTEM_CONFIG_CHECK,
  START_INITIAL_SYSTEM_CONFIGURATION,
  INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL,
  INITIAL_SYSTEM_CONFIGURATION_FAILED,
  ERROR_OCCURED_DURING_SYSTEM_CONFIGURATION,
  START_INITIAL_EMPLOYMENT_CATEGORIES_CONFIGURATION,
  INITIAL_EMPLOYMENT_CATEGORIES_CONFIGURATION_SUCCESSFUL,
  INITIAL_EMPLOYMENT_CATEGORIES_CONFIGURATION_FAILED,
  ERROR_OCCURED_DURING_EMPLOYMENT_CATEGORIES_CONFIGURATION,
  START_INITIAL_SYSTEM_OWNERSHIP_GROUP_CONFIGURATION,
  INITIAL_SYSTEM_OWNERSHIP_GROUP_CONFIGURATION_SUCCESSFUL,
  INITIAL_SYSTEM_OWNERSHIP_GROUP_CONFIGURATION_FAILED,
  ERROR_OCCURED_DURING_SYSTEM_OWNERSHIP_GROUP_CONFIGURATION,
  START_INITIAL_SYSTEM_COMPANY_CONFIGURATION,
  INITIAL_SYSTEM_COMPANY_CONFIGURATION_SUCCESSFUL,
  INITIAL_SYSTEM_COMPANY_CONFIGURATION_FAILED,
  ERROR_OCCURED_DURING_SYSTEM_COMPANY_CONFIGURATION,
  START_INITIAL_GENDER_CONFIGURATION,
  INITIAL_GENDER_CONFIGURATION_FAILED,
  ERROR_OCCURED_DURING_GENDER_CONFIGURATION,
  MALE_GENDER_CONFIGURATION_SUCCESSFUL,
  FEMALE_GENDER_CONFIGURATION_SUCCESSFUL
} from "./actionTypes";
import {
  apiGetAll,
  apiPost
} from "../../../services/api_connector/ApiConnector";
import {
  COMPANY_OWNER, REGULAR_SYSTEM_USER,
  SYSTEM_ADMIN
} from "../../../config/constants/Constants";

export function terminateCurrentSession() {
  return async dispatch => {
    dispatch({
      type: TERMINATE_CURRENT_SESSION
    });
  };
}

export function authenticateSystemUser(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_USER_AUTHENTIFICATION
    });
    const apiRoute = "/System_user_login";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (!result.data.error) {
          dispatch({
            type: STORE_USER,
            payload: {
              session_details: result.data,
              RoleType: REGULAR_SYSTEM_USER,
              isSessionActive: true
            }
          });
          dispatch({
            type: USER_LOGIN_SUCCESS
          });
        } else {
          dispatch({
            type: WRONG_LOGIN_CREDENTIALS
          });
        }
      },
      function(err) {
        dispatch({
          type: AN_ERROR_OCCURED_DURING_LOGIN
        });
        console.log(err);
      }
    );
  };
}

export function authenticateSystemAdmin(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_USER_AUTHENTIFICATION
    });
    const apiRoute = "/system_admin_login";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (!result.data.error) {
          dispatch({
            type: STORE_USER,
            payload: {
              session_details: result.data,
              RoleType: SYSTEM_ADMIN,
              isSessionActive: true
            }
          });
          dispatch({
            type: USER_LOGIN_SUCCESS
          });
        } else {
          dispatch({
            type: WRONG_LOGIN_CREDENTIALS
          });
        }
      },
      function(err) {
        dispatch({
          type: AN_ERROR_OCCURED_DURING_LOGIN
        });
        console.log(err);
      }
    );
  };
}



export function checkIfSystemAlreadyConfigured() {
  return async dispatch => {
    dispatch({
      type: START_CHECKING_IF_SYSTEM_ALREADY_CONFIGURED
    });
    const apiRoute = "/get_all_configuration";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.length === 0) {
          dispatch({
            type: SYSTEM_NOT_CONFIGURED,
            payload: {
              isCompanyAlreadyConfigured: false
            }
          });
        } else if (result.data.results.length > 0) {
          dispatch({
            type: SYSTEM_ALREADY_CONFIGURED,
            payload: {
              isCompanyAlreadyConfigured: true
            }
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_DURING_SYSTEM_CONFIG_CHECK
        });
        console.log(err);
      }
    );
  };
}

export function runInitialSystemConfiguration(payload) {
  return async dispatch => {
    dispatch({
      type: START_INITIAL_SYSTEM_CONFIGURATION
    });
    const apiRoute = "/add_configuration";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: INITIAL_SYSTEM_CONFIGURATION_SUCCESSFUL
          });
        } else {
          dispatch({
            type: INITIAL_SYSTEM_CONFIGURATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_DURING_SYSTEM_CONFIGURATION
        });
        console.log(err);
      }
    );
  };
}





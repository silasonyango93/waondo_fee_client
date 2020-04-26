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
  FEMALE_GENDER_CONFIGURATION_SUCCESSFUL,
  ROLE_ACCESS_DENIED,
  SUCCESSFULLY_FETCHED_ALL_USERS,
  FETCHING_ALL_USERS_EMPTY_RESULT_SET,
  ERROR_OCCURED_WHILE_FETCHING_ALL_USERS,
  USER_ROLE_UPDATED_SUCCESSFULLY,
  USER_ROLE_UPDATE_FAILED,
  ERROR_OCCURRED_WHILE_UPDATING_USER_ROLE,
  USER_ACCESS_PRIVILEGE_UPDATED_SUCCESSFULLY,
  USER_ACCESS_PRIVILEGE_UPDATE_FAILED,
  ERROR_OCCURRED_WHILE_UPDATING_USER_ACCESS_PRIVILEGE, USER_LOGIN_FAILED, RESET_FAILED_LOGIN
} from "./actionTypes";
import {
  apiGetAll,
  apiPost,
  promiselessApiGetAll,
  promiselessApiPost
} from "../../../services/api_connector/ApiConnector";
import {
  BURSAR,
  COMPANY_OWNER,
  REGULAR_SYSTEM_USER,
  SYSTEM_ADMIN
} from "../../../config/constants/Constants";
import {
  ACTUAL_LOT_CREATED_SUCCESSFULLY,
  ACTUAL_LOT_CREATION_FAILED,
  BEGIN_ACTUAL_LOT_CREATION,
  ERROR_OCCURED_WHILE_FETCHING_ALL_ACTUAL_CLASSES,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_LOT,
  FETCHING_ALL_ACTUAL_CLASSES_EMPTY_RESULT_SET,
  FETCHING_ALL_ACTUAL_CLASSES_SUCCESSFUL,
  START_FETCHING_ALL_ACTUAL_CLASSES
} from "../admin_home/actionTypes";
import axios from "axios";
import ip from "../../../config/EndPoint";
import {
  promiselessTransactionsServiceGetAll,
  transactionsServicePost
} from "../../../services/transactions_service_connector/TransactionsServiceConnector";

export function terminateCurrentSession(payload) {
  return async dispatch => {
    dispatch({
      type: TERMINATE_CURRENT_SESSION
    });
    closeASessionLog(payload)
  };
}

export function resetFailedLogin() {
  return async dispatch => {
    dispatch({
      type: RESET_FAILED_LOGIN
    });
  };
}

export function authenticateSystemUser(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_USER_AUTHENTIFICATION
    });
    const apiRoute = "/users/authenticate";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
        function(result) {
          if (result.data.loginSuccessful) {
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: {
                userDetails: result.data,
                RoleType: BURSAR,
                isSessionActive: true
              }
            });
          } else if (!result.data.loginSuccessful) {
            dispatch({
              type: USER_LOGIN_FAILED,
              payload: {
                authenticationEventMessage: result.data.authenticationEventMessage,
                isLoginSuccessful: false
              }
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
    const apiRoute = "/users/authenticate";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.loginSuccessful) {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
              userDetails: result.data,
              RoleType: SYSTEM_ADMIN,
              isSessionActive: true
            }
          });
        } else if (!result.data.loginSuccessful) {
          dispatch({
            type: USER_LOGIN_FAILED,
            payload: {
              authenticationEventMessage: result.data.authenticationEventMessage,
              isLoginSuccessful: false
            }
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




export function getAllUsers() {
  return async dispatch => {

    try {
      const users = await promiselessTransactionsServiceGetAll("/users/get_users_roles_and_access_privileges");
      dispatch({
        type: SUCCESSFULLY_FETCHED_ALL_USERS,
        payload: {
          allUsers: users.data
        }
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ERROR_OCCURED_WHILE_FETCHING_ALL_USERS
      });
    }

  };

}


// export function getAllUsers() {
//   return async dispatch => {
//     try {
//       const users = await promiselessApiGetAll("/get_all_users");
//
//       let usersArray = [];
//       if (users.data.results && users.data.results.length) {
//         for (let i = 0; i < users.data.results.length; i++) {
//           //1111111111111111111111111111111111111111111111111111111111111111111111111
//
//           let payload = {
//             userId: users.data.results[i].UserId
//           };
//
//           const userRoles = await getAUsersRoles(payload);
//
//           // userRoles.forEach(element => {
//           //   apiUserRoles.push(element);
//           // });
//
//           //11111111111111111111111111111111111111111111111111111111111111111111111111
//
//           //2222222222222222222222222222222222222222222222222222222222222222222222222
//           let rolesArray = [];
//           if (userRoles.data.results && userRoles.data.results.length) {
//             for (let i = 0; i < userRoles.data.results.length; i++) {
//               // apiUserRoles.push(userRoles.data.results[i]);
//               let payload = {
//                 userRoleId: userRoles.data.results[i].UserRoleId
//               };
//
//               const userAccessPrivileges = await getARolesAccessPrivileges(
//                 payload
//               );
//
//               if (
//                 userAccessPrivileges.data.results &&
//                 userAccessPrivileges.data.results.length
//               ) {
//                 const roleObject = {
//                   userRoleId: userRoles.data.results[i].UserRoleId,
//                   roleDescription: userRoles.data.results[i].RoleDescription,
//                   roleCode: userRoles.data.results[i].RoleCode,
//                   confirmationStatus:
//                     userRoles.data.results[i].ConfirmationStatus,
//                   userAccessPrivileges: userAccessPrivileges.data.results
//                 };
//
//                 rolesArray.push(roleObject);
//               }
//             }
//           }
//
//           if (rolesArray && rolesArray.length) {
//             const userObject = {
//               userId: userRoles.data.results[i].UserId,
//               name: users.data.results[i].Name,
//               email: users.data.results[i].Email,
//               registeredDate: users.data.results[i].RegisteredDate,
//               rolesArray
//             };
//
//             usersArray.push(userObject);
//           }
//           //2222222222222222222222222222222222222222222222222222222222222222222222222
//         }
//
//         dispatch({
//           type: SUCCESSFULLY_FETCHED_ALL_USERS,
//           payload: {
//             allUsers: usersArray
//           }
//         });
//       }
//     } catch (e) {
//       console.log(e);
//       dispatch({
//         type: ERROR_OCCURED_WHILE_FETCHING_ALL_USERS
//       });
//     }
//   };
// }

export const getAUsersRoles = payload =>
  promiselessApiPost(payload, "/get_a_user_roles");

export const getARolesAccessPrivileges = payload =>
  promiselessApiPost(payload, "/get_a_user_access_privileges");

export function updateAUserRole(payload) {
  return async dispatch => {
    const apiRoute = "/update_individual_user_roles";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: USER_ROLE_UPDATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: USER_ROLE_UPDATE_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_UPDATING_USER_ROLE
        });
        console.log(err);
      }
    );
  };
}

export function updateAUserAccessPrivileges(payload) {
  return async dispatch => {
    const apiRoute = "/update_individual_user_access_privileges";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: USER_ACCESS_PRIVILEGE_UPDATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: USER_ACCESS_PRIVILEGE_UPDATE_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_WHILE_UPDATING_USER_ACCESS_PRIVILEGE
        });
        console.log(err);
      }
    );
  };
}

export function closeASessionLog(payload) {
  const apiRoute = "/update_individual_session_logs";
  apiPost(payload, apiRoute);
}
